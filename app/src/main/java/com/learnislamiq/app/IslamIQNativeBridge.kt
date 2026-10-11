package com.learnislamiq.app

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import androidx.activity.ComponentActivity
import androidx.core.content.ContextCompat
import org.json.JSONObject
import java.util.Locale

/**
 * Native Android JavaScript Interface Bridge for IslamIQ.
 *
 * Bridges WebView with native Android platform capabilities:
 * 1. Android TextToSpeech (TTS) for Quran Ayah translation, Kids Quiz reading, and spoken feedback.
 *    Provides authentic Arabic, Urdu (ur-PK), and English voice synthesis.
 * 2. Android SpeechRecognizer for Kids voice-based activity selection with runtime RECORD_AUDIO permission handling.
 */
class IslamIQNativeBridge(
  private val activity: ComponentActivity,
  private val webView: WebView,
  private val requestAudioPermission: () -> Unit
) {
  private val mainHandler = Handler(Looper.getMainLooper())

  // Text-To-Speech engine
  private var tts: TextToSpeech? = null
  private var isTtsReady = false

  // Speech Recognizer
  private var speechRecognizer: SpeechRecognizer? = null
  private var isListening = false
  private var pendingSpeechLang: String? = null

  init {
    initTextToSpeech()
  }

  private fun initTextToSpeech() {
    try {
      tts = TextToSpeech(activity.applicationContext) { status ->
        if (status == TextToSpeech.SUCCESS) {
          isTtsReady = true
          tts?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
            override fun onStart(utteranceId: String?) {
              val id = JSONObject.quote(utteranceId ?: "")
              postToWeb("window.onIslamIQTtsStart?.($id)")
            }

            override fun onDone(utteranceId: String?) {
              val id = JSONObject.quote(utteranceId ?: "")
              postToWeb("window.onIslamIQTtsDone?.($id)")
            }

            @Deprecated("Deprecated in Java")
            override fun onError(utteranceId: String?) {
              val id = JSONObject.quote(utteranceId ?: "")
              postToWeb("window.onIslamIQTtsError?.($id)")
            }

            override fun onError(utteranceId: String?, errorCode: Int) {
              val id = JSONObject.quote(utteranceId ?: "")
              postToWeb("window.onIslamIQTtsError?.($id)")
            }
          })
          Log.d("IslamIQBridge", "Android TextToSpeech initialized successfully")
        } else {
          Log.w("IslamIQBridge", "Android TextToSpeech init failed with status: $status")
        }
      }
    } catch (e: Exception) {
      Log.e("IslamIQBridge", "Exception initializing TextToSpeech", e)
    }
  }

  private fun postToWeb(script: String) {
    mainHandler.post {
      try {
        webView.evaluateJavascript(script, null)
      } catch (e: Exception) {
        Log.w("IslamIQBridge", "Error evaluating javascript in webview", e)
      }
    }
  }

  // ---------------------------------------------------------
  // TEXT-TO-SPEECH INTERFACE
  // ---------------------------------------------------------

  @JavascriptInterface
  fun isNativeBridgeAvailable(): Boolean = true

  @JavascriptInterface
  fun isTtsAvailable(): Boolean = isTtsReady

  @JavascriptInterface
  fun speak(text: String, lang: String, utteranceId: String): Boolean {
    val ttsEngine = tts ?: return false

    if (!isTtsReady) {
      // Re-try once initialized
      mainHandler.postDelayed({
        speak(text, lang, utteranceId)
      }, 250)
      return true
    }

    mainHandler.post {
      try {
        val locale = when (lang.lowercase()) {
          "arabic", "ar" -> Locale("ar", "SA")
          "urdu", "ur" -> Locale("ur", "PK")
          else -> Locale.US
        }

        val availability = ttsEngine.isLanguageAvailable(locale)
        if (availability == TextToSpeech.LANG_AVAILABLE ||
          availability == TextToSpeech.LANG_COUNTRY_AVAILABLE ||
          availability == TextToSpeech.LANG_COUNTRY_VAR_AVAILABLE
        ) {
          ttsEngine.language = locale
        } else {
          // Fallback to base language code
          val baseLocale = when (lang.lowercase()) {
            "arabic", "ar" -> Locale("ar")
            "urdu", "ur" -> Locale("ur")
            else -> Locale.ENGLISH
          }
          ttsEngine.language = baseLocale
        }

        when (lang.lowercase()) {
          "arabic", "ar" -> {
            ttsEngine.setSpeechRate(0.84f)
            ttsEngine.setPitch(1.05f)
          }
          "urdu", "ur" -> {
            ttsEngine.setSpeechRate(0.88f)
            ttsEngine.setPitch(1.05f)
          }
          else -> {
            ttsEngine.setSpeechRate(0.94f)
            ttsEngine.setPitch(1.02f)
          }
        }

        val params = Bundle().apply {
          putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, utteranceId)
        }
        ttsEngine.speak(text, TextToSpeech.QUEUE_FLUSH, params, utteranceId)
      } catch (e: Exception) {
        Log.e("IslamIQBridge", "TTS speak failed", e)
        val id = JSONObject.quote(utteranceId)
        postToWeb("window.onIslamIQTtsError?.($id)")
      }
    }
    return true
  }

  @JavascriptInterface
  fun stopTts(): Boolean {
    mainHandler.post {
      try {
        tts?.stop()
      } catch (e: Exception) {
        Log.w("IslamIQBridge", "Error stopping TTS", e)
      }
    }
    return true
  }

  // ---------------------------------------------------------
  // SPEECH RECOGNITION INTERFACE
  // ---------------------------------------------------------

  @JavascriptInterface
  fun isSpeechRecognitionAvailable(): Boolean {
    return SpeechRecognizer.isRecognitionAvailable(activity)
  }

  @JavascriptInterface
  fun hasRecordAudioPermission(): Boolean {
    return ContextCompat.checkSelfPermission(
      activity,
      Manifest.permission.RECORD_AUDIO
    ) == PackageManager.PERMISSION_GRANTED
  }

  @JavascriptInterface
  fun requestRecordAudioPermission() {
    mainHandler.post {
      requestAudioPermission()
    }
  }

  @JavascriptInterface
  fun startListening(lang: String): Boolean {
    if (!hasRecordAudioPermission()) {
      pendingSpeechLang = lang
      mainHandler.post {
        requestAudioPermission()
      }
      return false
    }

    mainHandler.post {
      startSpeechRecognizerInternal(lang)
    }
    return true
  }

  @JavascriptInterface
  fun stopListening(): Boolean {
    mainHandler.post {
      try {
        speechRecognizer?.stopListening()
      } catch (e: Exception) {
        Log.w("IslamIQBridge", "Error stopping speech recognition", e)
      }
    }
    return true
  }

  fun onRecordAudioPermissionGranted() {
    val lang = pendingSpeechLang ?: "urdu"
    pendingSpeechLang = null
    mainHandler.post {
      startSpeechRecognizerInternal(lang)
    }
  }

  fun onRecordAudioPermissionDenied() {
    pendingSpeechLang = null
    postToWeb("window.onIslamIQSpeechError?.('not-allowed')")
    postToWeb("window.onIslamIQSpeechStatus?.(false)")
  }

  private fun startSpeechRecognizerInternal(lang: String) {
    if (!SpeechRecognizer.isRecognitionAvailable(activity)) {
      postToWeb("window.onIslamIQSpeechError?.('not-supported')")
      postToWeb("window.onIslamIQSpeechStatus?.(false)")
      return
    }

    try {
      speechRecognizer?.destroy()
      speechRecognizer = SpeechRecognizer.createSpeechRecognizer(activity).apply {
        setRecognitionListener(object : RecognitionListener {
          override fun onReadyForSpeech(params: Bundle?) {
            isListening = true
            postToWeb("window.onIslamIQSpeechStatus?.(true)")
          }

          override fun onBeginningOfSpeech() {}
          override fun onRmsChanged(rmsdB: Float) {}
          override fun onBufferReceived(buffer: ByteArray?) {}

          override fun onEndOfSpeech() {
            isListening = false
            postToWeb("window.onIslamIQSpeechStatus?.(false)")
          }

          override fun onError(error: Int) {
            isListening = false
            postToWeb("window.onIslamIQSpeechStatus?.(false)")
            val errString = when (error) {
              SpeechRecognizer.ERROR_NO_MATCH,
              SpeechRecognizer.ERROR_SPEECH_TIMEOUT -> "no-speech"
              SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS -> "not-allowed"
              SpeechRecognizer.ERROR_AUDIO -> "audio-capture"
              SpeechRecognizer.ERROR_NETWORK,
              SpeechRecognizer.ERROR_NETWORK_TIMEOUT -> "network"
              else -> "error"
            }
            val quoted = JSONObject.quote(errString)
            postToWeb("window.onIslamIQSpeechError?.($quoted)")
          }

          override fun onResults(results: Bundle?) {
            isListening = false
            postToWeb("window.onIslamIQSpeechStatus?.(false)")
            val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
            val transcript = matches?.firstOrNull() ?: ""
            val scores = results?.getFloatArray(SpeechRecognizer.CONFIDENCE_SCORES)
            val confidence = scores?.firstOrNull() ?: 0.92f
            val quoted = JSONObject.quote(transcript)
            postToWeb("window.onIslamIQSpeechResult?.($quoted, true, $confidence)")
          }

          override fun onPartialResults(partialResults: Bundle?) {
            val matches = partialResults?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
            val transcript = matches?.firstOrNull() ?: ""
            if (transcript.isNotEmpty()) {
              val quoted = JSONObject.quote(transcript)
              postToWeb("window.onIslamIQSpeechResult?.($quoted, false, 0.5)")
            }
          }

          override fun onEvent(eventType: Int, params: Bundle?) {}
        })
      }

      val localeCode = if (lang.lowercase().contains("urdu") || lang.lowercase() == "ur") "ur-PK" else "en-US"
      val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
        putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
        putExtra(RecognizerIntent.EXTRA_LANGUAGE, localeCode)
        putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, localeCode)
        putExtra(RecognizerIntent.EXTRA_ONLY_RETURN_LANGUAGE_PREFERENCE, localeCode)
        putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
        putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 3)
        putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, activity.packageName)
      }
      speechRecognizer?.startListening(intent)
    } catch (e: Exception) {
      Log.e("IslamIQBridge", "Failed to start speech recognizer", e)
      isListening = false
      postToWeb("window.onIslamIQSpeechStatus?.(false)")
      postToWeb("window.onIslamIQSpeechError?.('start_failed')")
    }
  }

  fun destroy() {
    try {
      tts?.stop()
      tts?.shutdown()
      tts = null
    } catch (e: Exception) {
      Log.w("IslamIQBridge", "Error shutting down TTS", e)
    }

    try {
      speechRecognizer?.destroy()
      speechRecognizer = null
    } catch (e: Exception) {
      Log.w("IslamIQBridge", "Error destroying speech recognizer", e)
    }
  }
}

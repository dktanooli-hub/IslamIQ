package com.learnislamiq.app

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.ViewGroup
import android.webkit.GeolocationPermissions
import android.webkit.PermissionRequest
import android.webkit.RenderProcessGoneDetail
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.fragment.app.FragmentActivity
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import com.learnislamiq.app.ui.theme.MyApplicationTheme
import com.google.android.gms.ads.AdListener
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.RequestConfiguration

class MainActivity : FragmentActivity() {

  private var nativeBridge: IslamIQNativeBridge? = null
  private var pendingWebPermissionRequest: PermissionRequest? = null

  // Runtime RECORD_AUDIO permission launcher requested when child taps microphone
  private val recordAudioPermissionLauncher = registerForActivityResult(
    ActivityResultContracts.RequestPermission()
  ) { isGranted ->
    if (isGranted) {
      pendingWebPermissionRequest?.let {
        it.grant(it.resources)
        pendingWebPermissionRequest = null
      }
      nativeBridge?.onRecordAudioPermissionGranted()
    } else {
      pendingWebPermissionRequest?.let {
        it.deny()
        pendingWebPermissionRequest = null
      }
      nativeBridge?.onRecordAudioPermissionDenied()
    }
  }

  fun requestRecordAudioPermission() {
    recordAudioPermissionLauncher.launch(Manifest.permission.RECORD_AUDIO)
  }

  fun handleWebAudioPermissionRequest(request: PermissionRequest) {
    if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED) {
      request.grant(request.resources)
    } else {
      pendingWebPermissionRequest = request
      recordAudioPermissionLauncher.launch(Manifest.permission.RECORD_AUDIO)
    }
  }

  // Geolocation permission launcher for Qibla compass and Nearby Mosques
  private var pendingGeolocationOrigin: String? = null
  private var pendingGeolocationCallback: GeolocationPermissions.Callback? = null

  private val locationPermissionsLauncher = registerForActivityResult(
    ActivityResultContracts.RequestMultiplePermissions()
  ) { permissions ->
    val fineGranted = permissions[Manifest.permission.ACCESS_FINE_LOCATION] == true
    val coarseGranted = permissions[Manifest.permission.ACCESS_COARSE_LOCATION] == true
    val isGranted = fineGranted || coarseGranted
    pendingGeolocationCallback?.invoke(pendingGeolocationOrigin, isGranted, false)
    pendingGeolocationCallback = null
    pendingGeolocationOrigin = null
  }

  fun handleGeolocationPermissionPrompt(origin: String?, callback: GeolocationPermissions.Callback?) {
    val fineGranted = ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
    val coarseGranted = ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED
    if (fineGranted || coarseGranted) {
      callback?.invoke(origin, true, false)
    } else {
      pendingGeolocationOrigin = origin
      pendingGeolocationCallback = callback
      locationPermissionsLauncher.launch(
        arrayOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION)
      )
    }
  }

  override fun onDestroy() {
    nativeBridge?.destroy()
    super.onDestroy()
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()

    // Clean up empty or corrupted variations seed files if present in WebView data directory
    try {
      val webViewDir = java.io.File(applicationContext.dataDir, "app_webview")
      if (webViewDir.exists()) {
        val seed = java.io.File(webViewDir, "variations_seed")
        val seedNew = java.io.File(webViewDir, "variations_seed_new")
        if (seed.exists() && seed.length() == 0L) {
          seed.delete()
        }
        if (seedNew.exists() && seedNew.length() == 0L) {
          seedNew.delete()
        }
      }
    } catch (e: Exception) {
      Log.d("IslamIQ", "WebView seed cleanup notice: ${e.message}")
    }

    // Initialize Google Mobile Ads SDK on app start
    try {
      val requestConfig = MobileAds.getRequestConfiguration().toBuilder()
        .setMaxAdContentRating(RequestConfiguration.MAX_AD_CONTENT_RATING_G)
        .build()
      MobileAds.setRequestConfiguration(requestConfig)

      MobileAds.initialize(this) { initializationStatus ->
        Log.d("AdMob", "Google Mobile Ads initialized successfully: $initializationStatus")
      }
    } catch (e: Exception) {
      Log.e("AdMob", "Error initializing Google Mobile Ads: ${e.message}")
    }

    setContent {
      MyApplicationTheme {
        Scaffold(
          modifier = Modifier.fillMaxSize(),
          containerColor = MaterialTheme.colorScheme.background,
          contentWindowInsets = WindowInsets.safeDrawing
        ) { innerPadding ->
          IslamIQMainScreen(
            modifier = Modifier.padding(innerPadding),
            onRequestAudioPermission = { requestRecordAudioPermission() },
            onHandleWebPermission = { req -> handleWebAudioPermissionRequest(req) },
            onHandleGeolocationPermission = { origin, cb -> handleGeolocationPermissionPrompt(origin, cb) },
            onBridgeCreated = { bridge -> nativeBridge = bridge }
          )
        }
      }
    }
  }
}

/**
 * Main application interface for IslamIQ.
 * Seamlessly loads the complete, interactive IslamIQ portal (Quran, Hadith, Salah Tracker,
 * Qibla compass, Tasbih, Quizzes, Kids mode, and Guides) with hardware acceleration,
 * persistent DOM/local storage, deep linking, native share handling, and gesture navigation.
 */
@Composable
fun IslamIQMainScreen(
  modifier: Modifier = Modifier,
  onRequestAudioPermission: () -> Unit = {},
  onHandleWebPermission: (PermissionRequest) -> Unit = {},
  onHandleGeolocationPermission: (String?, GeolocationPermissions.Callback?) -> Unit = { _, _ -> },
  onBridgeCreated: (IslamIQNativeBridge) -> Unit = {}
) {
  var webViewInstance by remember { mutableStateOf<WebView?>(null) }
  var canGoBack by remember { mutableStateOf(false) }
  var isLoading by remember { mutableStateOf(true) }
  var progress by remember { mutableIntStateOf(0) }
  var hasError by remember { mutableStateOf(false) }

  // Hardware / gesture back navigation inside the web app
  BackHandler(enabled = canGoBack) {
    webViewInstance?.let { webView ->
      if (webView.canGoBack()) {
        webView.goBack()
      }
    }
  }

  Box(
    modifier = modifier
      .fillMaxSize()
      .background(MaterialTheme.colorScheme.background)
  ) {
    AndroidView(
      modifier = Modifier
        .fillMaxSize()
        .testTag("islamiq_web_view"),
      factory = { ctx ->
        WebView(ctx).apply {
          layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
          )

          settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            useWideViewPort = true
            loadWithOverviewMode = true
            setSupportZoom(false)
            builtInZoomControls = false
            displayZoomControls = false
            cacheMode = WebSettings.LOAD_DEFAULT
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            mediaPlaybackRequiresUserGesture = false
            allowFileAccess = false
            allowContentAccess = true
            setGeolocationEnabled(true)
            userAgentString = "${userAgentString} IslamIQ-Android-App/2.0"
          }

          val activity = ctx as? MainActivity
          val bridge = IslamIQNativeBridge(
            activity = activity ?: (ctx as ComponentActivity),
            webView = this,
            requestAudioPermission = onRequestAudioPermission
          )
          onBridgeCreated(bridge)
          addJavascriptInterface(bridge, "IslamIQBridge")

          webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
              super.onPageStarted(view, url, favicon)
              isLoading = true
              hasError = false
              canGoBack = view?.canGoBack() == true
            }

            override fun onPageFinished(view: WebView?, url: String?) {
              super.onPageFinished(view, url)
              isLoading = false
              canGoBack = view?.canGoBack() == true
            }

            override fun onReceivedError(
              view: WebView?,
              errorCode: Int,
              description: String?,
              failingUrl: String?
            ) {
              super.onReceivedError(view, errorCode, description, failingUrl)
              // Only trigger error screen if the primary host failed
              if (failingUrl?.contains("learnislamiq.com") == true) {
                hasError = true
              }
            }

            override fun onReceivedError(
              view: WebView?,
              request: WebResourceRequest?,
              error: WebResourceError?
            ) {
              super.onReceivedError(view, request, error)
              if (request?.isForMainFrame == true) {
                val url = request.url?.toString() ?: ""
                if (url.contains("learnislamiq.com")) {
                  hasError = true
                }
              }
            }

            override fun onReceivedHttpError(
              view: WebView?,
              request: WebResourceRequest?,
              errorResponse: WebResourceResponse?
            ) {
              super.onReceivedHttpError(view, request, errorResponse)
              if (request?.isForMainFrame == true && (errorResponse?.statusCode ?: 200) >= 500) {
                val url = request.url?.toString() ?: ""
                if (url.contains("learnislamiq.com")) {
                  hasError = true
                }
              }
            }

            override fun onRenderProcessGone(
              view: WebView?,
              detail: RenderProcessGoneDetail?
            ): Boolean {
              Log.w("IslamIQ", "WebView render process gone. Crashed: ${detail?.didCrash()}")
              // Handle renderer termination gracefully without terminating host process
              view?.let {
                (it.parent as? ViewGroup)?.removeView(it)
                it.destroy()
              }
              hasError = true
              return true
            }

            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
              val url = request?.url?.toString() ?: return false
              return handleUrl(ctx, url)
            }

            @Deprecated("Deprecated in Java")
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
              if (url == null) return false
              return handleUrl(ctx, url)
            }

            private fun handleUrl(context: Context, url: String): Boolean {
              val uri = try {
                Uri.parse(url)
              } catch (e: Exception) {
                null
              }
              val host = uri?.host?.lowercase() ?: ""
              val scheme = uri?.scheme?.lowercase() ?: ""

              // Internal navigation stays inside IslamIQ WebView (learnislamiq.com, www.learnislamiq.com, and subdomains)
              if ((scheme == "https" || scheme == "http") &&
                (host == "learnislamiq.com" || host.endsWith(".learnislamiq.com"))
              ) {
                return false
              }

              // Route external protocols (WhatsApp, email, telephone, Play Store, etc.) to native Android intents
              return try {
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                context.startActivity(intent)
                true
              } catch (e: Exception) {
                Log.w("IslamIQ", "Unable to route external URL: $url", e)
                true
              }
            }
          }

          webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
              super.onProgressChanged(view, newProgress)
              progress = newProgress
              if (newProgress >= 100) {
                isLoading = false
              }
            }

            override fun onPermissionRequest(request: PermissionRequest?) {
              if (request == null) return
              val resources = request.resources
              val hasAudio = resources.contains(PermissionRequest.RESOURCE_AUDIO_CAPTURE)
              if (hasAudio) {
                onHandleWebPermission(request)
              } else {
                request.deny()
              }
            }

            override fun onPermissionRequestCanceled(request: PermissionRequest?) {
              super.onPermissionRequestCanceled(request)
            }

            override fun onGeolocationPermissionsShowPrompt(
              origin: String?,
              callback: GeolocationPermissions.Callback?
            ) {
              onHandleGeolocationPermission(origin, callback)
            }
          }

          loadUrl("https://www.learnislamiq.com")
          webViewInstance = this
        }
      },
      update = { webView ->
        webViewInstance = webView
        canGoBack = webView.canGoBack()
      }
    )

    // Smooth top loading indicator
    if (isLoading && progress < 100) {
      LinearProgressIndicator(
        progress = { progress / 100f },
        modifier = Modifier
          .fillMaxWidth()
          .align(Alignment.TopCenter),
        color = MaterialTheme.colorScheme.primary,
        trackColor = MaterialTheme.colorScheme.surfaceVariant
      )
    }

    // Graceful offline fallback screen with retry
    if (hasError) {
      Column(
        modifier = Modifier
          .fillMaxSize()
          .background(MaterialTheme.colorScheme.surface)
          .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
      ) {
        Text(
          text = "IslamIQ • انٹرنیٹ کنکشن درکار ہے",
          fontSize = 18.sp,
          fontWeight = FontWeight.Bold,
          color = MaterialTheme.colorScheme.primary,
          textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
          text = "Please check your internet connection and tap retry to load the full IslamIQ app.",
          fontSize = 13.sp,
          color = MaterialTheme.colorScheme.onSurfaceVariant,
          textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(20.dp))
        Button(
          onClick = {
            hasError = false
            isLoading = true
            webViewInstance?.loadUrl("https://www.learnislamiq.com")
          },
          colors = ButtonDefaults.buttonColors(
            containerColor = MaterialTheme.colorScheme.primary
          )
        ) {
          Text(
            text = "دوبارہ کوشش کریں • Retry",
            fontWeight = FontWeight.Bold
          )
        }
      }
    }
  }
}

/**
 * Non-intrusive Google AdMob Banner Ad Composable.
 * Uses exact production Ad Unit ID: ca-app-pub-9108925465688012/4729630144
 * Adheres strictly to Google Play and AdMob accidental click prevention policies.
 */
@Composable
fun AdMobBannerBottomBar(
  adUnitId: String,
  modifier: Modifier = Modifier
) {
  Box(
    modifier = modifier
      .fillMaxWidth()
      .wrapContentHeight()
      .background(MaterialTheme.colorScheme.surface)
      .padding(vertical = 4.dp)
      .testTag("admob_banner_bottom_bar"),
    contentAlignment = Alignment.Center
  ) {
    AndroidView(
      modifier = Modifier.wrapContentSize(),
      factory = { context ->
        AdView(context).apply {
          setAdSize(AdSize.BANNER)
          this.adUnitId = adUnitId
          adListener = object : AdListener() {
            override fun onAdLoaded() {
              super.onAdLoaded()
              Log.d("AdMob", "Banner ad loaded successfully")
            }

            override fun onAdFailedToLoad(adError: LoadAdError) {
              super.onAdFailedToLoad(adError)
              Log.w("AdMob", "Banner ad failed to load: ${adError.message}")
            }
          }
          loadAd(AdRequest.Builder().build())
        }
      },
      onRelease = { adView ->
        adView.destroy()
      }
    )
  }
}

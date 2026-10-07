package com.example

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.example.ui.theme.MyApplicationTheme
import com.google.android.gms.ads.AdListener
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.MobileAds

class MainActivity : ComponentActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()

    // Initialize Google Mobile Ads SDK on app start
    try {
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
          bottomBar = {
            // Non-intrusive AdMob banner docked at the bottom of main screens
            // Complies with AdMob accidental click prevention guidelines
            AdMobBannerBottomBar(
              adUnitId = "ca-app-pub-9108925465688012/4729630144"
            )
          }
        ) { innerPadding ->
          IslamIQMainScreen(modifier = Modifier.padding(innerPadding))
        }
      }
    }
  }
}

@Composable
fun IslamIQMainScreen(modifier: Modifier = Modifier) {
  Column(
    modifier = modifier
      .fillMaxSize()
      .padding(horizontal = 24.dp, vertical = 16.dp),
    horizontalAlignment = Alignment.CenterHorizontally
  ) {
    Spacer(modifier = Modifier.height(24.dp))
    Text(
      text = "IslamIQ • Learn • Quiz • Grow",
      fontSize = 22.sp,
      fontWeight = FontWeight.Bold,
      color = MaterialTheme.colorScheme.primary
    )
    Spacer(modifier = Modifier.height(8.dp))
    Text(
      text = "Daily Quran, Authentic Hadith, Salah Tracker & Islamic Quizzes",
      fontSize = 14.sp,
      color = MaterialTheme.colorScheme.onSurfaceVariant
    )
    Spacer(modifier = Modifier.weight(1f))
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
      .padding(vertical = 4.dp),
    contentAlignment = Alignment.Center
  ) {
    AndroidView(
      modifier = Modifier
        .fillMaxWidth()
        .wrapContentHeight(),
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
      }
    )
  }
}

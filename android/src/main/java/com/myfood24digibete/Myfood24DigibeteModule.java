package com.myfood24digibete;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import android.app.Activity;
import android.content.Intent;

import net.coherent.myfood24sdklib.Myfood24_StartActivity;
@ReactModule(name = Myfood24DigibeteModule.NAME)
public class Myfood24DigibeteModule extends ReactContextBaseJavaModule {
  public static final String NAME = "Myfood24Digibete";
  ReactApplicationContext reactContext;
  public Myfood24DigibeteModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(a * b);
  }
  @ReactMethod
  public void divide(double a, double b, Promise promise) {
    promise.resolve(a / b);
  }
  @ReactMethod
  public void test() {
    Activity currentActivity = getCurrentActivity();
    Intent intent = new Intent(currentActivity, Myfood24_StartActivity.class);
    assert currentActivity != null;
    currentActivity.startActivity(intent);
  }

}

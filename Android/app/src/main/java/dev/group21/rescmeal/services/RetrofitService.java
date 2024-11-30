package dev.group21.rescmeal.services;

import android.webkit.CookieManager;

import com.google.gson.Gson;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitService {
    private Retrofit retrofit;

    public RetrofitService() {
        initializeRetrofit();
    }

    private void initializeRetrofit() {
//        CookieManager cookieManager = CookieManager.getInstance();
        RescMealJar rescMealJar = new RescMealJar();

        retrofit = new Retrofit.Builder()
                .client(new OkHttpClient().newBuilder()
                        .cookieJar(rescMealJar)
                        .addInterceptor(new CookiesInterceptor(rescMealJar))
                        .build())
                .baseUrl("http://192.168.100.8:8080")
                .addConverterFactory(GsonConverterFactory.create(new Gson()))
                .build();
    }

    public Retrofit getRetrofit() {
        return retrofit;
    }
}

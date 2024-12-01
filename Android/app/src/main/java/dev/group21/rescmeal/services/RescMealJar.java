package dev.group21.rescmeal.services;

import android.webkit.CookieManager;

import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.List;

import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;

public class RescMealJar implements CookieJar {
    private final CookieManager cookieManager;

    public RescMealJar(CookieManager cookieManager) {
        this.cookieManager = cookieManager;
    }

    @Override
    public void saveFromResponse(@NonNull HttpUrl url, @NonNull List<Cookie> cookies) {
        for (Cookie cookie : cookies) {
            cookieManager.setCookie(url.host(), cookie.toString());
        }
        cookieManager.flush();
    }

    @NonNull
    @Override
    public List<Cookie> loadForRequest(@NonNull HttpUrl url) {
        List<Cookie> cookies = new ArrayList<>();
        String cookieString = cookieManager.getCookie(url.host());
        if(cookieString != null) cookies.add(Cookie.parse(url, cookieString));
        return cookies;
    }
}

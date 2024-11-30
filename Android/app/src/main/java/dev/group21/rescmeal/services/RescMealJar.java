package dev.group21.rescmeal.services;

import android.webkit.CookieManager;

import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;

public class RescMealJar implements CookieJar {
    private CookieManager cookieManager = CookieManager.getInstance();
    private final Map<String, List<Cookie>> cookieStore = new HashMap<>();

    @Override
    public void saveFromResponse(@NonNull HttpUrl url, @NonNull List<Cookie> cookies) {
        cookieStore.put(url.host(), cookies);
//        for (Cookie cookie: cookies) {
//            cookieStore.put(url.uri(), new HttpCookie(cookie.name(), cookie.value()));
//        }
        System.out.print("Saved from request: ");
        System.out.println(cookieStore.values());
        System.out.print("End saved.");

        cookieManager.acceptCookie();

//        cookieStore.add(url, );
//        cookieStore.put(url.host(), List.of(cookies.toString()));
    }

    @NonNull
    @Override
    public List<Cookie> loadForRequest(@NonNull HttpUrl url) {
        System.out.println("Setting Cookies for request.");
//        List<Cookie> cookies = cookieStore.get(url.host());

//        System.out.print("Found cookies: ");
//        System.out.println(cookies);
        System.out.print("Looking for cookies, Inside Store: ");
        System.out.println(cookieStore.values()); // Empty array.

//        List<HttpCookie> cookies = cookieStore.getCookies();
//
//        System.out.println("Setting Cookies for request.");
//        if(cookies != null){
//            Iterator<HttpCookie> itCookie = cookies.iterator();
//
//            int i = 0;
//            while(itCookie.hasNext()) {
//                System.out.print("Cookie " + i + ":");
//                System.out.println(itCookie);
//                i++;
//            }
//        }

        System.out.println("End setting Cookies for request.");
//        return new ArrayList<>();
        return Objects.requireNonNull(cookieStore.getOrDefault(url.host(), new ArrayList<>()));
    }
}

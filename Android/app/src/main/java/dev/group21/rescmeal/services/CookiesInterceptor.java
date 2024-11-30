package dev.group21.rescmeal.services;

import androidx.annotation.NonNull;

import java.io.IOException;
import java.util.List;

import okhttp3.Cookie;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

public class CookiesInterceptor implements Interceptor{
    private final RescMealJar cookieJar;

    public CookiesInterceptor(RescMealJar cookieJar) {
        this.cookieJar = cookieJar;
    }

    @NonNull
    @Override
    public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        Response response = chain.proceed(request);

        System.out.println("Attempting cookies intercept.");
        List<Cookie> cookies = Cookie.parseAll(response.request().url(), response.headers());
        if (!cookies.isEmpty()) {
            System.out.print("Saving list cookies: ");
            System.out.println(cookies);
            System.out.print("From: ");
            System.out.println(response);
            cookieJar.saveFromResponse(response.request().url(), cookies);
        }
        System.out.println("End cookies intercept.");

        return response;
    }
}

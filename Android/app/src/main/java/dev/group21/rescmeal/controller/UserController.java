package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.LoginRequest;
import dev.group21.rescmeal.model.UserInfoResponse;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface UserController {
    @POST("/api/auth/signin")
    Call<UserInfoResponse> authenticateUser(@Body LoginRequest loginRequest);
}

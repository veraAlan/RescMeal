package dev.group21.rescmeal.controller;

import java.util.List;

import dev.group21.rescmeal.model.Food;
import retrofit2.Call;
import retrofit2.http.GET;

public interface FoodController {
    @GET("/api/food/list")
    Call<List<Food>> getAllFoods();
}

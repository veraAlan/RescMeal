package dev.group21.rescmeal.activity;

import android.os.Bundle;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import dev.group21.rescmeal.MainActivity;
import dev.group21.rescmeal.R;
import dev.group21.rescmeal.adapter.FoodAdapter;
import dev.group21.rescmeal.controller.FoodController;
import dev.group21.rescmeal.model.Food;
import dev.group21.rescmeal.services.RetrofitService;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FoodListActivity extends AppCompatActivity {

    private RecyclerView recyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_food_list);

        recyclerView = findViewById(R.id.foodList_recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        
        loadFoods();
    }

    private void loadFoods() {
        RetrofitService retrofitService = new RetrofitService();
        FoodController foodController = retrofitService.getRetrofit().create(FoodController.class);
        foodController.getAllFoods()
            .enqueue(new Callback<List<Food>>() {
                @Override
                public void onResponse(Call<List<Food>> call, Response<List<Food>> response) {
                    populateListView(response.body());
                }

                @Override
                public void onFailure(Call<List<Food>> call, Throwable throwable) {
                    Toast.makeText(FoodListActivity.this, "Error loading foods.", Toast.LENGTH_LONG).show();
                    Logger.getLogger(MainActivity.class.getName()).log(Level.SEVERE, "Error occurred: " + throwable.getMessage(), this);
                }
            });
    }

    private void populateListView(List<Food> foodList) {
        FoodAdapter foodAdapter = new FoodAdapter(foodList);
        recyclerView.setAdapter(foodAdapter);
    }
}
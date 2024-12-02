package dev.group21.rescmeal.activity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import org.w3c.dom.Text;

import java.util.logging.Level;
import java.util.logging.Logger;

import dev.group21.rescmeal.R;
import dev.group21.rescmeal.adapter.FoodHolder;
import dev.group21.rescmeal.adapter.ProfileHolder;
import dev.group21.rescmeal.controller.UserController;
import dev.group21.rescmeal.model.User;
import dev.group21.rescmeal.services.RetrofitService;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfileActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_login);
        loadProfile();
    }

    private void loadProfile() {
        RetrofitService retrofitService = new RetrofitService();
        UserController userController = retrofitService.getRetrofit().create(UserController.class);

        userController.authenticateUser()
            .enqueue(new Callback<User>() {
                @Override
                public void onResponse(Call<User> call, Response<User> response) {
                    assert response.body() != null;
                    System.out.println(response.body().getClient());
                }

                @Override
                public void onFailure(Call<User> call, Throwable t) {
                    Logger.getLogger(UserLoginActivity.class.getName()).log(Level.SEVERE, "Error occurred: " + t.getMessage(), t);
                }
            });
    }
}

package dev.group21.rescmeal.activity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import java.util.logging.Level;
import java.util.logging.Logger;

import dev.group21.rescmeal.R;
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
        setContentView(R.layout.activity_profile);
        loadProfile();
    }

    private void loadProfile() {
        // Footer buttons
        findViewById(R.id.mainPageButton).setOnClickListener(v -> {
            Intent intent = new Intent(ProfileActivity.this, FoodListActivity.class);
            startActivity(intent);
            finish();
        });
        findViewById(R.id.deliveriesButton).setOnClickListener(v -> {
            Intent intent = new Intent(ProfileActivity.this, CartDetailActivity.class); // Create List
            startActivity(intent);
            finish();
        });

        RetrofitService retrofitService = new RetrofitService();
        UserController userController = retrofitService.getRetrofit().create(UserController.class);

        userController.authenticateUser()
            .enqueue(new Callback<User>() {
                @Override
                public void onResponse(Call<User> call, Response<User> response) {
                    if(response.body() != null && response.body().getClient() != null) {
                        loadProfileInfo(response.body());
                    }
                }

                @Override
                public void onFailure(Call<User> call, Throwable t) {
                    Logger.getLogger(UserLoginActivity.class.getName()).log(Level.SEVERE, "Error occurred: " + t.getMessage(), t);
                }
            });
    }

    private void loadProfileInfo(User user) {
        TextView username = findViewById(R.id.profile_username);
        TextView email = findViewById(R.id.profile_email);
        TextView name = findViewById(R.id.profile_name);
        TextView lastname = findViewById(R.id.profile_lastname);
        TextView balance = findViewById(R.id.profile_balance);
        TextView phone = findViewById(R.id.profile_phone);

        username.setText(String.format("Nombre de usuario:\n%s", user.getUsername()));
        email.setText(String.format("Email:\n%s", user.getEmail()));
        name.setText(String.format("Nombre: %s", user.getClient().getName()));
        lastname.setText(String.format("Apellido: %s", user.getClient().getLastName()));
        balance.setText(String.format("Balance: $ %s pesos", user.getClient().getBalance()));
        phone.setText(String.format("Celular: %s", user.getClient().getPhone()));
    }
}

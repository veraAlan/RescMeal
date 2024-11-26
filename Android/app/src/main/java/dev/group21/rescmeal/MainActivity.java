package dev.group21.rescmeal;

import android.os.Bundle;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;

import java.util.logging.Level;
import java.util.logging.Logger;

import dev.group21.rescmeal.controller.UserController;
import dev.group21.rescmeal.model.LoginRequest;
import dev.group21.rescmeal.model.UserInfoResponse;
import dev.group21.rescmeal.services.RetrofitService;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        initializeComponents();
    }

    private void initializeComponents() {
        TextInputEditText inputIdentifier = findViewById(R.id.form_identifierInput);
        TextInputEditText inputPassword = findViewById(R.id.form_passwordInput);
        MaterialButton buttonLogin = findViewById(R.id.form_buttonLogin);

        RetrofitService retrofitService = new RetrofitService();
        UserController userController = retrofitService.getRetrofit().create(UserController.class);

        buttonLogin.setOnClickListener(view -> {
            String identifier = String.valueOf(inputIdentifier.getText());
            String password = String.valueOf(inputPassword.getText());

            LoginRequest loginRequest = new LoginRequest();
            loginRequest.setIdentifier(identifier);
            loginRequest.setPassword(password);

            userController.authenticateUser(loginRequest)
                .enqueue(new Callback<UserInfoResponse>() {
                    @Override
                    public void onResponse(Call<UserInfoResponse> call, Response<UserInfoResponse> response) {
                        Toast.makeText(MainActivity.this, "Sesion iniciada!", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onFailure(Call<UserInfoResponse> call, Throwable throwable) {
                        Toast.makeText(MainActivity.this, "No se pudo iniciar sesion.", Toast.LENGTH_SHORT).show();
                        Logger.getLogger(MainActivity.class.getName()).log(Level.SEVERE, "Ocurrio un error.", throwable);
                    }
                });
        });
    }
}
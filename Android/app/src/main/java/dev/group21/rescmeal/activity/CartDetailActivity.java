package dev.group21.rescmeal.activity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import dev.group21.rescmeal.R;

public class CartDetailActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cart_details);
        loadCart();
    }

    private void loadCart() {
        // Footer buttons
        findViewById(R.id.mainPageButton).setOnClickListener(v -> {
            Intent intent = new Intent(CartDetailActivity.this, FoodListActivity.class);
            startActivity(intent);
            finish();
        });
        findViewById(R.id.profileButton).setOnClickListener(v -> {
            Intent intent = new Intent(CartDetailActivity.this, ProfileActivity.class); // Create Profile
            startActivity(intent);
            finish();
        });

        TextView name = findViewById(R.id.cart_food_name);
        TextView business = findViewById(R.id.cart_food_business);
        TextView price = findViewById(R.id.cart_food_price);
        TextView description = findViewById(R.id.cart_food_description);
        TextView production = findViewById(R.id.cart_food_prod);
        TextView expiration = findViewById(R.id.cart_food_exp);
        TextView category = findViewById(R.id.cart_food_category);
        Intent intent = getIntent();
        name.setText(intent.getStringExtra("cart_food_name"));
        business.setText(String.format("Local: %s", intent.getStringExtra("cart_food_business")));
        price.setText(String.format("$ %s", intent.getStringExtra("cart_food_price")));
        description.setText(intent.getStringExtra("cart_food_description"));
        production.setText(String.format("Fecha de produccion: %s", intent.getStringExtra("cart_food_prod").split("T")[0]));
        expiration.setText(String.format("Fecha de vencimiento: %s", intent.getStringExtra("cart_food_exp").split("T")[0]));
        category.setText(String.format("Categoria: %s", intent.getStringExtra("cart_food_category")));
    }
}

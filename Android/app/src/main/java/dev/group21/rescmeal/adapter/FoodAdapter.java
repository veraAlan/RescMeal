package dev.group21.rescmeal.adapter;

import static android.content.Context.MODE_PRIVATE;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Environment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import dev.group21.rescmeal.R;
import dev.group21.rescmeal.activity.CartDetailActivity;
import dev.group21.rescmeal.model.Food;

public class FoodAdapter extends RecyclerView.Adapter<FoodHolder> {
    private final List<Food> foodList;

    public FoodAdapter(List<Food> foodList) {
        this.foodList = foodList;
    }

    @NonNull
    @Override
    public FoodHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.list_food_item, parent, false);
        return new FoodHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull FoodHolder holder, int position) {
        Food food = foodList.get(position);
        holder.name.setText(food.getName());
        holder.businessName.setText(food.getBusiness().getName());
        holder.price.setText(String.format("$ %s", food.getPrice()));
        holder.description.setText(food.getDescription());
        holder.button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = holder.getAdapterPosition();
                Food foodItem = foodList.get(position);
                Intent intent = new Intent(v.getContext(), CartDetailActivity.class);
                intent.putExtra("cart_food_prod", foodItem.getProductionDate());
                intent.putExtra("cart_food_exp", foodItem.getExpirationDate());
                intent.putExtra("cart_food_category", foodItem.getCategory());
                intent.putExtra("cart_food_name", foodItem.getName());
                intent.putExtra("cart_food_business", foodItem.getBusiness().getName());
                intent.putExtra("cart_food_price", foodItem.getPrice().toString());
                intent.putExtra("cart_food_description", foodItem.getDescription());
                v.getContext().startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        if(foodList == null) return 0;
        return foodList.size();
    }
}

package dev.group21.rescmeal.adapter;

import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;
import java.util.Locale;

import dev.group21.rescmeal.R;
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
        holder.price.setText(String.format("AR$ %s", food.getPrice()));
        holder.description.setText(food.getDescription());
        holder.image.setImageURI(Uri.parse("E:/Coding/Workspaces/JetBrains/rescMeal/Frontend/public/Food/" + food.getImage()));
    }

    @Override
    public int getItemCount() {
        if(foodList == null) return 0;
        return foodList.size();
    }
}

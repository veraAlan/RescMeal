package dev.group21.rescmeal.adapter;

import android.view.View;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import org.jetbrains.annotations.NotNull;

import dev.group21.rescmeal.R;

public class FoodHolder extends RecyclerView.ViewHolder {
    TextView name, businessName, price, description;

    public FoodHolder(@NotNull View itemView) {
        super(itemView);
        name = itemView.findViewById(R.id.foodListItem_name);
        businessName = itemView.findViewById(R.id.foodListItem_businessName);
        price = itemView.findViewById(R.id.foodListItem_price);
        description = itemView.findViewById(R.id.foodListItem_description);
    }
}

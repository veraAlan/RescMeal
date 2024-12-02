package dev.group21.rescmeal.adapter;

import android.view.View;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import org.jetbrains.annotations.NotNull;

import dev.group21.rescmeal.R;

public class ProfileHolder extends RecyclerView.ViewHolder {
    TextView name, lastname, balance, phone;

    public ProfileHolder(@NotNull View itemView) {
        super(itemView);
        name = itemView.findViewById(R.id.foodListItem_name);
        lastname = itemView.findViewById(R.id.profile_lastname);
        balance = itemView.findViewById(R.id.profile_balance);
        phone = itemView.findViewById(R.id.profile_phone);
    }
}

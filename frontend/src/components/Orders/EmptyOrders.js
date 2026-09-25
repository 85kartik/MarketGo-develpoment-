import React from "react";
import EmptyState from "../Common/EmptyState";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function EmptyOrders({ navigation }) {
  return (
    <EmptyState
      icon="bag-outline"
      title="No orders yet"
      subtitle="When you place an order, it'll show up here."
    >
      <PrimaryButton
        title="Start Shopping"
        onPress={() => navigation.navigate("Home")}
        style={{ marginTop: 24, width: "80%" }}
      />
    </EmptyState>
  );
}

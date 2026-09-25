import React, { useState } from "react";
import {
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";

import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";

import InputField from "../../components/Forms/InputField";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import colors from "../../constants/colors";

export default function EditProfileScreen({ navigation }) {
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Please enter your name.");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending:", {
        name,
        phone,
      });

      const res = await authService.updateProfile({
        name,
        phone,
      });

      console.log("Response:", res.data);

      if (res.data.success) {
        setUser(res.data.user);

        Alert.alert(
          "Success",
          "Profile updated successfully.",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert(
          "Error",
          res.data.message
        );
      }
    } catch (err) {
      console.log("UPDATE PROFILE ERROR");
      console.log(err.response?.data);
      console.log(err.message);

      Alert.alert(
        "Error",
        err.response?.data?.message ||
          err.message ||
          "Couldn't update your profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <InputField
        label="Full Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <InputField
        label="Email"
        value={user?.email}
        editable={false}
      />

      <InputField
        label="Phone"
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <PrimaryButton
        title="Save Changes"
        loading={loading}
        onPress={save}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
  },
});
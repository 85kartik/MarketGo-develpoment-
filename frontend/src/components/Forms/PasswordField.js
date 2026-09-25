import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

const PasswordField = ({
  label,
  value,
  onChangeText,
}) => {
  const [hide, setHide] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={hide}
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter password"
          placeholderTextColor="#9CA3AF"
        />

        <TouchableOpacity onPress={() => setHide(!hide)}>
          <Ionicons
            name={hide ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontWeight: "600",
    color: colors.text,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },
});
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import aiService from "../../services/aiService";
import colors from "../../constants/colors";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm the MarketGo assistant. Ask me about products, orders, shipping, or returns.",
};

export default function AIChatScreen() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const userMessage = { id: `u-${Date.now()}`, role: "user", content: text };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);

    try {
      const res = await aiService.chat(text);
      const reply = { id: `a-${Date.now()}`, role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      const errorMessage = {
        id: `e-${Date.now()}`,
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setSending(false);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.role === "user" ? styles.userBubble : styles.assistantBubble,
              item.isError && styles.errorBubble,
            ]}
          >
            <Text style={[styles.bubbleText, item.role === "user" && styles.userBubbleText]}>
              {item.content}
            </Text>
          </View>
        )}
      />

      {sending && (
        <View style={styles.typingRow}>
          <ActivityIndicator size="small" color={colors.textLight} />
          <Text style={styles.typingText}>MarketGo AI is typing...</Text>
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask about products, orders..."
          placeholderTextColor="#9CA3AF"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={send}
          returnKeyType="send"
          editable={!sending}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!input.trim() || sending) && styles.sendButtonDisabled]}
          onPress={send}
          disabled={!input.trim() || sending}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  bubble: { maxWidth: "80%", borderRadius: 16, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 10 },
  assistantBubble: { backgroundColor: "#fff", alignSelf: "flex-start", borderBottomLeftRadius: 4 },
  userBubble: { backgroundColor: colors.primary, alignSelf: "flex-end", borderBottomRightRadius: 4 },
  errorBubble: { backgroundColor: "#FEF2F2" },
  bubbleText: { color: colors.text, fontSize: 15, lineHeight: 21 },
  userBubbleText: { color: "#fff" },
  typingRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 8 },
  typingText: { marginLeft: 8, fontSize: 12, color: colors.textLight },
  inputRow: { flexDirection: "row", alignItems: "center", padding: 12, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: colors.border },
  input: { flex: 1, height: 46, borderWidth: 1, borderColor: colors.border, borderRadius: 23, paddingHorizontal: 18, marginRight: 10, backgroundColor: colors.background },
  sendButton: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  sendButtonDisabled: { opacity: 0.5 },
});
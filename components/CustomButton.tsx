import React, { useRef, useCallback } from "react";
import {
  TouchableOpacity, Text, StyleSheet,
  Animated, GestureResponderEvent,
} from "react-native";

type ButtonVariant = "punch" | "jab" | "reset";

interface CustomButtonProps {
  label: string;
  onPress?: () => void;
  onHoldTick?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
}

const VARIANTS = {
  punch: { bg: "#E8193C", border: "#FF4560", text: "#fff" },
  jab:   { bg: "#1A3A6B", border: "#2E6DB4", text: "#fff" },
  reset: { bg: "#5A5A5A", border: "#888",    text: "#ddd" },
};

export default function CustomButton({
  label, onPress, onHoldTick, variant = "punch", disabled = false,
}: CustomButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repeatTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHolding = useRef(false);

  const v = VARIANTS[variant];

  const animPress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.94, duration: 60, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  const startHold = useCallback(() => {
    if (!onHoldTick || disabled) return;
    isHolding.current = true;
    holdTimer.current = setTimeout(() => {
      if (!isHolding.current) return;
      repeatTimer.current = setInterval(() => {
        if (isHolding.current) onHoldTick();
      }, 80);
    }, 400);
  }, [onHoldTick, disabled]);

  const stopHold = useCallback(() => {
    isHolding.current = false;
    if (holdTimer.current) { clearTimeout(holdTimer.current); holdTimer.current = null; }
    if (repeatTimer.current) { clearInterval(repeatTimer.current); repeatTimer.current = null; }
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPressIn={() => { if (!disabled) { animPress(); startHold(); } }}
        onPressOut={stopHold}
        onPress={() => { if (!disabled && onPress) onPress(); }}
        disabled={disabled}
        style={[
          styles.button,
          { backgroundColor: disabled ? "#444" : v.bg, borderColor: disabled ? "#555" : v.border },
        ]}
      >
        <Text style={[styles.label, { color: disabled ? "#777" : v.text }]}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 4,
    alignItems: "center",
  },
  label: { fontSize: 14, fontWeight: "900", letterSpacing: 1 },
});
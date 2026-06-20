import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import CustomButton from "./CustomButton";

interface CounterDisplayProps {
  count: number;
  onAddCount: () => void;
  onMinusCount: () => void;
  onHoldAdd: () => void;
  onHoldMinus: () => void;
  onResetCount: () => void;
}

export default function CounterDisplay({
  count, onAddCount, onMinusCount,
  onHoldAdd, onHoldMinus, onResetCount,
}: CounterDisplayProps) {
  const countScale = useRef(new Animated.Value(1)).current;
  const prevCount = useRef(count);

  useEffect(() => {
    const increased = count > prevCount.current;
    prevCount.current = count;
    Animated.sequence([
      Animated.timing(countScale, { toValue: increased ? 1.2 : 0.85, duration: 80, useNativeDriver: true }),
      Animated.timing(countScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  }, [count]);

  const isAtMin = count <= 0;

  return (
    <View style={styles.childCard}>

      {/* CHILD LABEL */}
      <View style={styles.childBadge}>
        <Text style={styles.childBadgeText}>ITO ANG CHILD COMPONENT (CounterDisplay)</Text>
      </View>

      <Text style={styles.childTitle}>Ako ang Child Component</Text>

      {/* PROPS DATA */}
      <Text style={styles.propsTag}>⬇ PROPS DATA (Galing sa Parent State)</Text>
      <View style={styles.divider} />

      {/* COUNT DISPLAY */}
      <Animated.Text
        style={[styles.countNumber, { transform: [{ scale: countScale }] }, isAtMin && { color: "#E8193C" }]}
      >
        {count}
      </Animated.Text>

      <View style={styles.divider} />
      {/* PROPS FUNCTION */}
      <Text style={styles.propsTag}>⬆ PROPS FUNCTION (Triggers Parent State)</Text>

      {/* BUTTONS */}
      <View style={styles.buttons}>
        <CustomButton label="🥊 Add Count" variant="punch" onPress={onAddCount} onHoldTick={onHoldAdd} />
        <CustomButton label="🛡 Minus Count" variant="jab" onPress={onMinusCount} onHoldTick={onHoldMinus} disabled={isAtMin} />
        <CustomButton label="🔔 Reset Count" variant="reset" onPress={onResetCount} />
      </View>

      <Text style={styles.hint}>Hold buttons for rapid fire</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  childCard: {
    backgroundColor: "#F0DDB0",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#1A3A6B",
    padding: 12,
    paddingTop: 20,
  },
  childBadge: {
    position: "absolute", top: -12, alignSelf: "center",
    backgroundColor: "#1A3A6B", borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4, zIndex: 10,
  },
  childBadgeText: { color: "#fff", fontWeight: "900", fontSize: 9 },

  childTitle: {
    color: "#5A3A1A", textAlign: "center", fontSize: 12,
    fontStyle: "italic", marginBottom: 6,
  },
  propsTag: {
    color: "#1A3A6B", fontSize: 9, fontWeight: "700",
    textAlign: "center", textTransform: "uppercase",
  },
  divider: {
    width: 2, height: 14, backgroundColor: "#1A3A6B",
    alignSelf: "center", opacity: 0.4, marginVertical: 2,
  },
  countNumber: {
    fontSize: 64, fontWeight: "900", color: "#1C1C1C",
    textAlign: "center", marginVertical: 2,
  },
  buttons: { gap: 8, marginTop: 8 },
  hint: {
    textAlign: "center", color: "#8B6914",
    fontSize: 9, marginTop: 8, fontStyle: "italic",
  },
});
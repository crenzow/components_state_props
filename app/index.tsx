import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
} from "react-native";
import CounterDisplay from "../components/CounterDisplay";

export default function ParentScreen() {
  const [count, setCount] = useState(100);
  const beltShake = useRef(new Animated.Value(0)).current;

  const shakeBelt = () => {
    Animated.sequence([
      Animated.timing(beltShake, { toValue: 5, duration: 50, useNativeDriver: true }),
      Animated.timing(beltShake, { toValue: -5, duration: 50, useNativeDriver: true }),
      Animated.timing(beltShake, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleAddCount = () => { setCount((p) => p + 1); shakeBelt(); };
 const handleMinusCount = () => { setCount((p) => (p > 0 ? p - 1 : 0)); };
  const handleHoldAdd = () => { setCount((p) => p + 1); };
  const handleHoldMinus = () => { setCount((p) => (p > 0 ? p - 1 : 0)); };
  const handleResetCount = () => { setCount(100); };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* PARENT LABEL */}
        <View style={styles.parentBadge}>
          <Text style={styles.parentBadgeText}>PARENT COMPONENT (index.tsx)</Text>
        </View>

        <View style={styles.parentCard}>
          <Text style={styles.parentTitle}>Ako ang Parent Screen</Text>

          {/* STATE LOCKER */}
          <View style={styles.stateLocker}>
            <Text style={styles.stateLockerLabel}>STATE LOCKER</Text>
            <Animated.Text
              style={[styles.stateLockerCount, { transform: [{ translateX: beltShake }] }]}
            >
              count: {count}
            </Animated.Text>
          </View>

          {/* CHILD COMPONENT */}
          <CounterDisplay
            count={count}
            onAddCount={handleAddCount}
            onMinusCount={handleMinusCount}
            onHoldAdd={handleHoldAdd}
            onHoldMinus={handleHoldMinus}
            onResetCount={handleResetCount}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#1C1C1C" },
  container: { flex: 1, padding: 12, justifyContent: "center" },

  parentBadge: {
    backgroundColor: "#E8193C",
    alignSelf: "center",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: -12,
    zIndex: 10,
  },
  parentBadgeText: {
    color: "#fff", fontWeight: "900", fontSize: 10, letterSpacing: 0.5,
  },

  parentCard: {
    backgroundColor: "#2A1A0E",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#8B6914",
    padding: 14,
    paddingTop: 22,
  },

  parentTitle: {
    color: "#C8B88A", textAlign: "center", fontSize: 13,
    fontStyle: "italic", marginBottom: 10,
  },

  stateLocker: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  stateLockerLabel: {
    color: "#fff", fontSize: 10, fontWeight: "700", letterSpacing: 1,
  },
  stateLockerCount: {
    color: "#fff", fontSize: 18, fontWeight: "900",
  },
});
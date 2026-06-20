import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#1C1C1C" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1C1C1C" },
          headerTintColor: "#D4AF37",
          headerTitleStyle: { fontWeight: "900", fontSize: 15 },
          headerTitle: "🥊 BOXING COUNTER",
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#1C1C1C" },
        }}
      />
    </>
  );
}
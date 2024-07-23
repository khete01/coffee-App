import { AuthProvider } from "@/contexts/AuthProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // <AuthProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
    // </AuthProvider>
  );
}

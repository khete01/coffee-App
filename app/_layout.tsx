import { AuthProvider } from "@/contexts/AuthProvider";
import { DataProvider } from "@/contexts/DataProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <DataProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </DataProvider>
    </AuthProvider>
  );
}

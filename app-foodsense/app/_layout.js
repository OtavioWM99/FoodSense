import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../src/providers/AuthProvider";
import { useEffect } from "react";
import { View } from "react-native";

const InitialLayout = () => {
  const { session, loading, profile } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    // If the user is not signed in and not in the auth group, redirect to the auth group.
    if (!session && !inAuthGroup) {
      router.replace("/(auth)");
    }
    // If the user is signed in and in the auth group, redirect to the main app.
    else if (session && inAuthGroup) {
        // But first, check if their profile is complete.
        if (profile && profile.idade !== null) {
            router.replace("/home");
        } else {
            // If profile is not complete, send them to finish it.
            router.replace("/(auth)/infoCadastro");
        }
    }
  }, [session, profile, loading, segments, router]);

  // Show a blank screen while loading
  if (loading) {
    return <View />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="perfil" />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;

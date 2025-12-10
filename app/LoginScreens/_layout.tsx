import { Stack } from 'expo-router';
import React from 'react';

export default function LoginLayout() {
  return (
    <Stack>
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="List" options={{ title: 'My Todos' }} />
      <Stack.Screen name="Details" options={{ title: 'Details' }} />
    </Stack>
  );
}

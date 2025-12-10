import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';

const [origin, setOrigin] = React.useState({
    latitude: 37.25,
    longitude: -12.44,

      });
export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/ismael.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">PEDIDOS</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Tardanza del pedido</ThemedText>
      </ThemedView>
    


    </ParallaxScrollView>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

    container: {
    height: 400,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
    map: {
    ...StyleSheet.absoluteFillObject,
    },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

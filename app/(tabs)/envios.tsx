import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../../components/themed-text";

export default function TabTwoScreen() {
  const params = useLocalSearchParams();

  const progress = useRef(new Animated.Value(0)).current;
  const [internalProgress, setInternalProgress] = useState(0);
  const [message, setMessage] = useState("Su pedido está en camino");
  const [rating, setRating] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [countdown, setCountdown] = useState(0); // Contador regresivo en segundos
  const time = params.time ? Number(params.time) : 30; // Recibe time y convierte a número
  const deliveryTimeMs = time * 1000; // Convierte segundos a milisegundos
  const name = params.name;
  useEffect(() => {
    // Reiniciar el progreso a 0
    progress.setValue(0);
    setInternalProgress(0);
    setMessage("Su pedido está en camino "+name);
    setShowRating(false);
    setCountdown(time); // Iniciar el contador regresivo

    // Animar la barra de progreso de 0 a 1 en el tiempo especificado
    Animated.timing(progress, {
      toValue: 1,
      duration: deliveryTimeMs,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setInternalProgress(1);
        setCountdown(0);
        setMessage("Su pedido ha sido entregado, Gracias por confiar En Rocket Delivery ! 🚀");
        setShowRating(true);
      }
    });
  }, [deliveryTimeMs]);

  // Contador regresivo
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, deliveryTimeMs]);



  const widthAnim = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.screen}>
      <Image source={require("../../assets/images/rocketlogo.png")} style={styles.logo} />
      <ThemedText type="subtitle" style={styles.text}>{message}</ThemedText>
      {countdown > 0 && (
        <Text style={styles.countdown}>
          Tiempo restante: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
        </Text>
      )}
      <View style={styles.container}>
        <Animated.View style={[styles.progressBar, { width: widthAnim }]} />
      </View>
      {showRating && (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>¡Califícanos!</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text style={[styles.star, rating >= star && styles.starSelected]}>⭐</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffecb9', //usar este color para todos los fondos 
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30, // Añadido espaciado debajo del logo
  },
  text: {
    marginBottom: 50,
    textAlign: 'center',
  },
  countdown: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b5998',
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    height: 30,
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20, // Añadido espaciado debajo de la barra de progreso
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b5998',
  },
  ratingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20, // Añadido espaciado debajo de las estrellas
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
    color: '#ccc', // Color por defecto
  },
  starSelected: {
    color: '#FFD700', // Color de estrella seleccionada
  },
});
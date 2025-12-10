import { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../../components/themed-text";


export default function TabTwoScreen() {                              
const progress = useRef(new Animated.Value(0)).current;
const [internalProgress, setInternalProgress] = useState(0);
const [message, setMessage] = useState("Su pedido está en camino");
const [rating, setRating] = useState(0);
const [showRating, setShowRating] = useState(false); 

useEffect(() => {
  const interval = setInterval(() => {
    setInternalProgress((prev) => {
      if (prev >= 1) return 1;
      return prev + Math.random() * 0.05;
  });
}, 400);

return () => clearInterval(interval);
}, []);

useEffect(() => {
  Animated.timing(progress, {
    toValue: internalProgress,
    duration: 5000,
    useNativeDriver: false,
  }).start(({ finished }) => {
    if (finished && internalProgress >= 1) {
      setMessage("Su pedido ha sido entregado, Gracias por confiar En Rocket Delivery ! 🚀");
      setShowRating(true); 
    }
  });
}, [internalProgress]);

const widthAnim = progress.interpolate({
inputRange: [0, 1],
    outputRange: ["0%", "100%"],
});


  return (
    <View style={styles.screen}> {}
      <Image source={require("../../assets/images/rocketlogo.png")} style={styles.logo} /> {}
      <ThemedText type="subtitle" style={styles.text}>{message}</ThemedText> {}
      <View style={styles.container}>
        <Animated.View style={[styles.progressBar, { width: widthAnim }]} />
      </View>
      {showRating && ( 
        <View style={styles.ratingContainer}> {/* Contenedor de calificación */}
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
  logo: {
    width: 250, 
    height: 250,
    marginBottom: 30, // Añadido espaciado debajo del logo
  },
  text: {
    marginBottom: 50,
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
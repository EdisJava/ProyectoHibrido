import { router } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FIRESTORE_DB } from '../../FIrebaseConf';

interface Restaurant {
  label: string;
  value: string;
  id: string;
  time: number;
}

interface Dish {
  label: string;
  value: string;
}

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);


  useEffect(() => {
    const fetchRestaurants = async () => {
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'Restaurant'));
      const fetchedRestaurants: Restaurant[] = querySnapshot.docs.map(doc => ({
        label: doc.data().Nombre, // Cambiado a 'Nombre'
        value: doc.id,
        id: doc.data().Id_restaurante || doc.data().Id_restaurante, // ID numérico del restaurante
        time: doc.data().tiempo, // Tiempo asociado al restaurante
      }));
      setRestaurants(fetchedRestaurants);
    };
    fetchRestaurants();
  }, []);


  useEffect(() => {
    if (selectedRestaurant) {
      const fetchDishes = async () => {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'Platos'));

        // Obtener el ID numérico del restaurante seleccionado
        const selectedRestaurantData = restaurants.find(r => r.value === selectedRestaurant);
        const restaurantId = selectedRestaurantData?.id;

        const fetchedDishes: Dish[] = querySnapshot.docs
          .filter(doc => {
            const data = doc.data();
            // Handle both capitalization variants in Firestore
            const idRestaurante = data.id_restaurante || data.Id_restaurante;
            return idRestaurante === restaurantId;
          })
          .map(doc => ({
            label: doc.data().Nombre || doc.data().nombre,
            value: doc.id,
          }));

        setDishes(fetchedDishes);
      };
      fetchDishes();
    } else {
      setDishes([]);
    }
  }, [selectedRestaurant]);

  const handleOrder = () => {
    if (!name || !selectedRestaurant || !selectedDish) {
      alert('Por favor, rellena todos los campos antes de continuar.');
      return;
    }

    const restaurant = restaurants.find(r => r.value === selectedRestaurant);
    if (restaurant) {
      router.push({
        pathname: '/envios',
        params: { time: restaurant.time.toString(), name },
      });
    }
  };

  

  return (
    <View style={styles.screen}> {/* Usando el estilo de fondo */}
      <Image source={require('../../assets/images/rocketlogo.png')} style={styles.logo} /> {/* Añadido el logo */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Restaurante:</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedRestaurant(value)}
          items={restaurants}
          style={pickerStyles}
        />

        <Text style={styles.label}>Plato:</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedDish(value)}
          items={dishes}
          style={pickerStyles}
        />

        <View style={styles.buttonContainer}>
          <Button title="Comprar" onPress={handleOrder} />
        </View>
      </View>
    </View>
  );
}

const pickerStyles = {
  inputIOS: {
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 30,
    color: '#333',
    fontSize: 10,
  },
  inputAndroid: {
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 30,
    color: '#333',
    fontSize: 10,
  },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffecb9',
    paddingVertical: 40,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '90%',
  },
  picker: {
    marginBottom: 20,
    width: '90%',
  },
  buttonContainer: {
    marginTop: 20,
    width: '90%',
  },
});

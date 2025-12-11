import { usePurchase } from '@/context/ContextoCompra';
import { router } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FIRESTORE_DB } from '../../FirebaseConf';

interface Restaurant {
  label: string;
  value: string;
  id: string;
  time: number;
  phone: string;
  style: string;
}

interface Dish {
  label: string;
  value: string;
  price: number;
}

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const { setPurchased } = usePurchase();

  const [restaurantInfo, setRestaurantInfo] = useState<{ phone: string; style: string } | null>(null);
  const [dishPrice, setDishPrice] = useState<number | null>(null);


  useEffect(() => {
    const fetchRestaurants = async () => {
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'Restaurant'));
      const fetchedRestaurants: Restaurant[] = querySnapshot.docs.map(doc => ({
        label: doc.data().Nombre,
        value: doc.id,
        id: doc.data().Id_restaurante || doc.data().Id_restaurante,
        time: doc.data().tiempo,
        phone: doc.data().telefono || doc.data().Telefono || '',
        style: doc.data().estilo || doc.data().Estilo || '',
      }));
      setRestaurants(fetchedRestaurants);
    };
    fetchRestaurants();
  }, []);


  useEffect(() => {
    if (selectedRestaurant) {
      const fetchDishes = async () => {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'Platos'));

        const selectedRestaurantData = restaurants.find(r => r.value === selectedRestaurant);
        const restaurantId = selectedRestaurantData?.id;

        const fetchedDishes: Dish[] = querySnapshot.docs
          .filter(doc => {
            const data = doc.data();
            const idRestaurante = data.id_restaurante || data.Id_restaurante;
            return idRestaurante === restaurantId;
          })
          .map(doc => {
            const data = doc.data();
            const priceValue = data.precio || data.Precio || 0;
            const price = typeof priceValue === 'string' ? parseFloat(priceValue) : priceValue;

            return {
              label: data.Nombre || data.nombre,
              value: doc.id,
              price: isNaN(price) ? 0 : price,
            };
          });

        setDishes(fetchedDishes);
      };
      fetchDishes();
    } else {
      setDishes([]);
    }
  }, [selectedRestaurant]);

  const handleRestaurantChange = (value: string | null) => {
    setSelectedRestaurant(value);
    setSelectedDish(null);
    setDishPrice(null);

    if (value) {
      const restaurant = restaurants.find(r => r.value === value);
      if (restaurant) {
        setRestaurantInfo({ phone: restaurant.phone, style: restaurant.style });
      }
    } else {
      setRestaurantInfo(null);
    }
  };

  const handleDishChange = (value: string | null) => {
    setSelectedDish(value);

    if (value) {
      const dish = dishes.find(d => d.value === value);
      if (dish) {
        const price = typeof dish.price === 'string' ? parseFloat(dish.price) : dish.price;
        setDishPrice(isNaN(price) ? 0 : price);
      }
    } else {
      setDishPrice(null);
    }
  };

  const handleOrder = () => {
    if (!name || !selectedRestaurant || !selectedDish) {
      alert('Por favor, rellena todos los campos antes de continuar.');
      return;
    }

    const restaurant = restaurants.find(r => r.value === selectedRestaurant);
    if (restaurant) {
      setPurchased(true);
      router.push({
        pathname: '/envios',
        params: { time: restaurant.time.toString(), name }
      });
    }
  };

  return (
    <View style={styles.screen}>
      <Image source={require('../../assets/images/rocketlogo.png')} style={styles.logo} />
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
          onValueChange={handleRestaurantChange}
          items={restaurants}
          style={pickerStyles}
        />

        {restaurantInfo && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>📞 Teléfono: {restaurantInfo.phone}</Text>
            <Text style={styles.infoText}>🍽️ Estilo: {restaurantInfo.style}</Text>
          </View>
        )}

        <Text style={styles.label}>Plato:</Text>
        <RNPickerSelect
          onValueChange={handleDishChange}
          items={dishes}
          style={pickerStyles}
        />

        {dishPrice !== null && (
          <View style={styles.infoContainer}>
            <Text style={styles.priceText}>Precio: {dishPrice.toFixed(2)}€</Text>
          </View>
        )}

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
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  priceText: {
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
});

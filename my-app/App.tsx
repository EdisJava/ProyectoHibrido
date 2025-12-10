
//import { HelloWave } from '@/components/hello-wave';
//import ParallaxScrollView from '@/components/parallax-scroll-view';
//import { ThemedText } from '@/components/themed-text';
//import { ThemedView } from '@/components/themed-view';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from '../app/LoginScreens/Details';
import List from '../app/LoginScreens/List';
import Login from '../app/LoginScreens/Login';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator initialRouteName="Login">
      <InsideStack.Screen name="My todos" component={List} />
      <InsideStack.Screen name="details" component={Details} />

    </InsideStack.Navigator>
  );
}

export default function HomeScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


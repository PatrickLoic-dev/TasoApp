import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { textSecondaryColor } from "./utils/constant";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'; 
import LoginScreen from './screens/login/login';
import HomeScreen from './screens/home/home';
import { Provider } from 'react-redux';
import BottomNavigation from './routes/bottomNavigation';
import CreateOrderScreen from './screens/invoice/createOrder';
import { store } from './redux/store';
import OrderStack from './routes/orders/orderStack';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store = {store}>
      <Stack.Navigator
        initialRouteName = "Login">

        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerTitle: '',headerTransparent: true,}} 
          />
        <Stack.Screen 
          name="Dashboard" 
          component={BottomNavigation} 
          options={{ headerTitle: '',headerTransparent: true,}} 
          />

        <Stack.Screen         
          name="OrderScreen" 
          component={OrderStack} 
          options={{ headerTitle: '',headerTransparent: true,}} 
          />

      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}



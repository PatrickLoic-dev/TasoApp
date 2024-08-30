import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import CartScreen from '../../screens/invoice/cart';
import CreateOrderScreen from '../../screens/invoice/createOrder';

const Stack = createStackNavigator();

const OrderStack= () => {
    return (
        <Stack.Navigator 
        screenOptions={{headerShown : false}}
        initialRouteName = "CreateOrder">
            <Stack.Screen 
                name="CreateOrder" 
                component={CreateOrderScreen}/>

            <Stack.Screen 
                name="Cart" 
                component={CartScreen}/>

        </Stack.Navigator>
    )
}

export default OrderStack;
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import ProductListScreen from '../../screens/products/productList';
import AddProductScreen from '../../screens/products/addProduct';
import ProductDetailScreen from '../../screens/products/productDetail';

const Stack = createStackNavigator();

const ProductStack= () => {
    return (
        <Stack.Navigator 
        screenOptions={{headerShown : false}}
        initialRouteName = "ProductList">
            <Stack.Screen 
                name="ProductList" 
                component={ProductListScreen}/>

            <Stack.Screen 
                name="AddProduct" 
                component={AddProductScreen}/>

            <Stack.Screen
                name="ProductDetails"
                component={ProductDetailScreen}/>
        </Stack.Navigator>
    )
}

export default ProductStack;
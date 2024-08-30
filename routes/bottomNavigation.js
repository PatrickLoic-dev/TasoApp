import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/home/home';

import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CategoryListScreen from '../screens/categories/categoriesList';
import SupplierListScreen from '../screens/supplier/supplierList';
import OrderListingScreen from '../screens/invoice/ordersListing';
import ProductStack from './products/productStack';
import CategoryStack from './categories/categoryStack';
import SupplierStack from './supplier/supplierStack';

export default function BottomNavigation() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
            tabBarActiveTintColor: '#009090',
            tabBarStyle : {
                height : 80,
                paddingVertical : 8,
            }
        }}
        >
            <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
                tabBarLabel: 'Dashboard',
                tabBarIcon: ({ color, size, borderColor }) => (
                    <MaterialCommunityIcons name="home" color={color} size={52} borderColor ="#000" />
                ),
                tabBarLabelPosition : 'below-icon',
                tabBarLabelStyle : {
                    fontSize : 16,
                    fontWeight : 'bold'
                },
                headerShown : false
            }}
            />
            <Tab.Screen
            name='Products'
            component={ProductStack}
            options={{
                tabBarLabel: 'Products',
                tabBarIcon: ({ color, size, borderColor }) => (
                    <Feather name="box" color={color} size={52} borderColor ="#000" />
                ),
                tabBarLabelPosition : 'below-icon',
                tabBarLabelStyle : {
                    fontSize : 16,
                    fontWeight : 'bold'
                },
                headerShown : false,
            }}
            />
            <Tab.Screen
            name='Categories'
            component={CategoryStack}
            options={{
                tabBarLabel: 'Category',
                tabBarIcon: ({ color, size, borderColor }) => (
                    <MaterialIcons name="category" size={52} color={color} borderColor ="#000" />
                ),
                tabBarLabelPosition : 'below-icon',
                tabBarLabelStyle : {
                    fontSize : 16,
                    fontWeight : 'bold'
                },
                headerShown : false,
            }}
            />
            <Tab.Screen
            name='Supplier'
            component={SupplierStack}
            options={{
                tabBarLabel: 'Supplier',
                tabBarIcon: ({ color, size, borderColor }) => (
                    <Feather name="users" color={color} size={52} borderColor ="#000" />
                ),
                tabBarLabelPosition : 'below-icon',
                tabBarLabelStyle : {
                    fontSize : 16,
                    fontWeight : 'bold'
                },
                headerShown : false,
            }}
            />
            <Tab.Screen
            name='Orders'
            component={OrderListingScreen}
            options={{
                tabBarLabel: 'Orders',
                tabBarIcon: ({ color, size, borderColor }) => (
                    <Feather name="clipboard" color={color} size={52} borderColor ="#000" />
                ),
                tabBarLabelPosition : 'below-icon',
                tabBarLabelStyle : {
                    fontSize : 16,
                    fontWeight : 'bold'
                },
                headerShown : false,
            }}
            />
        </Tab.Navigator>
    );
}
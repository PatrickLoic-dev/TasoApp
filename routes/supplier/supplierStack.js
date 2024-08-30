import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import SupplierListScreen from '../../screens/supplier/supplierList';
import AddSupplierScreen from '../../screens/supplier/addSupplier';
import SupplierDetailScreen from '../../screens/supplier/suppierDetail';

const Stack = createStackNavigator();

const SupplierStack= () => {
    return (
        <Stack.Navigator 
        screenOptions={{headerShown : false}}
        initialRouteName = "SupplierList">
            <Stack.Screen 
                name="SupplierList" 
                component={SupplierListScreen}/>

            <Stack.Screen 
                name="AddSupplier" 
                component={AddSupplierScreen}/>

            <Stack.Screen 
                name="SupplierDetails" 
                component={SupplierDetailScreen}/>

        </Stack.Navigator>
    )
}

export default SupplierStack;
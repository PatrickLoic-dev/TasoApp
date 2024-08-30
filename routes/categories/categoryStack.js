import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CategoryListScreen from '../../screens/categories/categoriesList';
import AddCategoryScreen from '../../screens/categories/addCategory';

const Stack = createStackNavigator();

const CategoryStack= () => {
    return (
        <Stack.Navigator 
        screenOptions={{headerShown : false}}
        initialRouteName = "CategoryList">
            <Stack.Screen 
                name="CategoryList" 
                component={CategoryListScreen}/>

            <Stack.Screen 
                name="AddCategory" 
                component={AddCategoryScreen}/>

        </Stack.Navigator>
    )
}

export default CategoryStack;
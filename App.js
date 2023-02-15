import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeList from './Screens/RecipeList';
import RecipeDetails from './Screens/RecipeDetail';
import AddRecipe from './Screens/AddRecipe';
import Home from './Screens/Home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RecipeList" component={RecipeList} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
        <Stack.Screen name="AddRecipe" component={AddRecipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

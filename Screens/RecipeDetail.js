import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import axios from 'axios';

export default function RecipeDetail({ route }) {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`http://192.168.18.2/recipes/${route.params.id}`)
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [route.params.id]);

    if (!recipe) {
        return <View><Text>Loading...</Text></View>
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
            <View style={styles.recipeDetails}>
                <Text style={styles.recipeTitle}>{recipe.name}</Text>
                <Text style={styles.recipeInfo}>{recipe.time} minutos | {recipe.portions} porções | {recipe.author}</Text>
                <Text style={styles.recipeIngredientsTitle}>Ingredientes</Text>
                {recipe.ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.recipeIngredients}>{ingredient}</Text>
                ))}
                <Text style={styles.recipeInstructionsTitle}>Modo de preparo</Text>
                {recipe.instructions.map((instruction, index) => (
                    <Text key={index} style={styles.recipeInstructions}>{instruction}</Text>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    recipeImage: {
        height: 250,
        width: '100%',
    },
    recipeDetails: {
        padding: 20,
    },
    recipeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    recipeInfo: {
        color: '#808080',
        marginBottom: 10,
    },
    recipeIngredientsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    recipeIngredients: {
        marginBottom: 5,
    },
    recipeInstructionsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    recipeInstructions: {
        marginBottom: 5,
    },
});

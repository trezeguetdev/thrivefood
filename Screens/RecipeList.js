import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

export default function RecipeList({ navigation }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.18.2:3000/receitas')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function renderItem({ item }) {
        return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardInfo}>{item.time} minutos | {item.portions} porções</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardImage: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    cardText: {
        flex: 1,
        padding: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardInfo: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
});



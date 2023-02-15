import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function AddRecipe({ navigation }) {
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [portions, setPortions] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState(['']);

    function handleSubmit() {
        axios.post('http://192.168.18.2:3000/recipes', {
            name,
            time,
            portions,
            author,
            image,
            ingredients,
            instructions,
        })
            .then(response => {
                navigation.navigate('RecipeList');
            })
            .catch(error => {
                console.log(error);
            });
    }
    function handleAddIngredient() {
        setIngredients([...ingredients, '']);
    }

    function handleRemoveIngredient(index) {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    }

    function handleAddInstruction() {
        setInstructions([...instructions, '']);
    }

    function handleRemoveInstruction(index) {
        const newInstructions = [...instructions];
        newInstructions.splice(index, 1);
        setInstructions(newInstructions);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Nome:</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Tempo:</Text>
                <TextInput style={styles.input} value={time} onChangeText={setTime} />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Porções:</Text>
                <TextInput style={styles.input} value={portions} onChangeText={setPortions} />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Autor:</Text>
                <TextInput style={styles.input} value={author} onChangeText={setAuthor} />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Imagem:</Text>
                <TextInput style={styles.input} value={image} onChangeText={setImage} />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Ingredientes:</Text>
                {ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.listItem}>
                        <TextInput
                            style={styles.listItemText}
                            value={ingredient}
                            onChangeText={text => {
                                const newIngredients = [...ingredients];
                                newIngredients[index] = text;
                                setIngredients(newIngredients);
                            }}
                        />
                        <TouchableOpacity style={styles.listItemButton} onPress={() => handleRemoveIngredient(index)}>
                            <Text style={styles.listItemButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.button} onPress={handleAddIngredient}>
                    <Text style={styles.buttonText}>Adicionar Ingrediente</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Instruções:</Text>
                {instructions.map((instruction, index) => (
                    <View key={index} style={styles.listItem}>
                        <TextInput
                            style={styles.listItemText}
                            value={instruction}
                            onChangeText={text => {
                                const newInstructions = [...instructions];
                                newInstructions[index] = text;
                                setInstructions(newInstructions);
                            }}
                        />
                        <TouchableOpacity style={styles.listItemButton} onPress={() => handleRemoveInstruction(index)}>
                            <Text style={styles.listItemButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.button} onPress={handleAddInstruction}>
                    <Text style={styles.buttonText}>Adicionar Instrução</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        fontSize: 18,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    listItemText: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        fontSize: 18,
        flex: 1,
    },
    listItemButton: {
        backgroundColor: '#f00',
        padding: 10,
        borderRadius: 4,
        marginLeft: 10,
    },
    listItemButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#00f',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});



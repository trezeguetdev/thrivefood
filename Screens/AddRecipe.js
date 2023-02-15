import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function AddRecipe({ navigation }) {
    const [nome, setNome] = useState('');
    const [tempodepreparo, setTempodePreparo] = useState('');
    const [modo_preparo, setModo_preparo] = useState('');
    const [facilidade, setFacilidade] = useState('');
    const [image, setImage] = useState('');
    const [tempo_preparo, setTempo_preparo] = useState(['']);
    const [autor, setAutor] = useState(['']);
    const [rendimento, setRendimento] = useState(['']);

    function handleSubmit() {
        axios.post('https://api-receitas-production.up.railway.app/receitas/vegano', {
            nome,
            ingredientes,
            modo_preparo,
            facilidade,
            tempo_preparo,
            autor,
            rendimento
        })
            .then(response => {
                navigation.navigate('RecipeList');
            })
            .catch(error => {
                console.log(error);
            });
    }
    function handleAddIngredientes() {
        setIngredientes([...ingredientes, '']);
    }

    function handleRemoveIngredientes(index) {
        const newIngredientes = [...ingredientes];
        newIngredientes.splice(index, 1);
        setIngredientes(newIngredientes);
    }

    function handleAddInstruction() {
        setMododePreparo([...mododepreparo, '']);
    }

    function handleRemoveInstruction(index) {
        const newMododePreparo = [...mododepreparo];
        newMododePreparo.splice(index, 1);
        setMododePreparo(newMododePreparo);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Nome:</Text>
                <TextInput style={styles.input} value={nome} onChangeText={setNome} />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Tempo:</Text>
                <TextInput style={styles.input} value={tempodepreparo} onChangeText={setTempodePreparo} />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>rendimento; :</Text>
                <TextInput style={styles.input} value={rendimento} onChangeText={setRendimento} />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Autor:</Text>
                <TextInput style={styles.input} value={autordareceita} onChangeText={setAutordaReceita} />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Imagem:</Text>
                <TextInput style={styles.input} value={image} onChangeText={setImage} />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Ingredientes:</Text>
                {ingredientes.map((ingredientes, index) => (
                    <View key={index} style={styles.listItem}>
                        <TextInput
                            style={styles.listItemText}
                            value={ingredientes}
                            onChangeText={text => {
                                const newIngredientes = [...ingredientes];
                                newIngredientes[index] = text;
                                setIngredientes(newIngredientes);
                            }}
                        />
                        <TouchableOpacity style={styles.listItemButton} onPress={() => handleRemoveIngredientes(index)}>
                            <Text style={styles.listItemButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.button} onPress={handleAddIngredientes}>
                    <Text style={styles.buttonText}>Adicionar Ingrediente</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Instruções:</Text>
                {mododepreparo.map((instruction, index) => (
                    <View key={index} style={styles.listItem}>
                        <TextInput
                            style={styles.listItemText}
                            value={instruction}
                            onChangeText={text => {
                                const newMododePreparo = [...mododepreparo];
                                newMododePreparo[index] = text;
                                setMododePreparo(newMododePreparo);
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



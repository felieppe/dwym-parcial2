import React, { useEffect, useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import { Button, TextInput, Text, Portal, Dialog, Paragraph, Provider as PaperProvider, Menu, Divider } from 'react-native-paper';
import DropDownPicker from "react-native-dropdown-picker";

function AddDestinationModal({ visible, onClose, onAdd, onEdit, editingDestination }) {
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ difficulty, setDifficulty ] = useState('Fácil')
    const [ dropdownOpen, setDropdownOpen ] = useState(false)
    const difficultyOptions = ['Fácil', 'Moderada', 'Difícil']

    useEffect(() => {
        if (editingDestination) {
            setName(editingDestination.name)
            setDescription(editingDestination.description)
            setDifficulty(editingDestination.difficulty)
        } else {
            setName('')
            setDescription('')
            setDifficulty('Fácil')
        }
    }, [editingDestination, visible])

    const handleSubmit = () => {
        const newDestination = { name, description, difficulty }
        
        if (name === '' || description === '' || difficulty === '') {  return alert('Por favor, llena todos los campos') }

        if (editingDestination) {
            onEdit({ ...newDestination, id: editingDestination.id })
        } else { onAdd({ ...newDestination, favorites: 0 }) }
    }

    const openDifficultyMenu = () => { setDifficultyMenuVisible(true) }
    const closeDifficultyMenu = () => { setDifficultyMenuVisible(false) }

    return (
        <PaperProvider>
            <Portal>
                <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
                    <View style={styles.modalContainer}>
                    <Text variant="headlineSmall" style={styles.modalTitle}>
                        {editingDestination ? 'Editar Destino' : 'Agregar Destino'}
                    </Text>
                    <TextInput
                        label="Nombre"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <TextInput
                        label="Descripción"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                    />

                    <DropDownPicker 
                        open={dropdownOpen}
                        value={difficulty}
                        items={difficultyOptions.map(option => ({ label: option, value: option }))}
                        setOpen={() => setDropdownOpen(!dropdownOpen)}
                        setValue={setDifficulty}
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />

                    <View style={styles.buttonsContainer}>
                        <Button style={styles.button} onPress={onClose}>Cancelar</Button>
                        <Button style={styles.button} onPress={handleSubmit}>Guardar</Button>
                    </View>
                    </View>
                </Modal>
            </Portal>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    modalTitle: {
      marginBottom: 20,
    },
    input: {
      marginBottom: 10,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
      marginTop: 20,
    },
    button: {
        backgroundColor: '#DAD4EB',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    dropdown: {
        backgroundColor: '#DAD4EB',
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        borderColor: 'white'
    },
    dropdownContainer: {
        backgroundColor: '#DAD4EB',
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'white'
    }
  });

export default AddDestinationModal
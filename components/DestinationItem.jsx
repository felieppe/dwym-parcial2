import React from 'react';
import { Card, Button, Text, FAB } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const DestinationItem = ({ destination, favorites, onEdit, onDelete, onFavorite }) => {
    const { id, name, description, difficulty } = destination;
    const favorited = favorites.includes(id);

    const handleEdit = () => { onEdit(destination); }
    const handleDelete = () => { onDelete(destination); }
    const handleFavorite = () => { onFavorite(destination); }

    return (
        <Card style={styles.card}>
             <Card.Content>
                <Text variant="titleLarge">{name}</Text>
                <View style={[styles.difficultyTag, { backgroundColor: difficulty == "Fácil" ? "green" : difficulty == "Moderada" ? "yellow" : difficulty == "Difícil" ? "purple" : "lightgray" }]}>
                <Text style={styles.difficultyText}>{difficulty}</Text>
                </View>
                <Text variant="bodyMedium">{description}</Text>
            </Card.Content>
            <Card.Actions>
                <FAB style={{borderRadius: 50}} size='small' color={favorited ? "yellow" : "white"} icon="star" onPress={handleFavorite}/>
                <Button onPress={handleEdit}>Edit</Button>
                <Button onPress={handleDelete}>Delete</Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
    },
    difficultyTag: {
        padding: 5,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    difficultyText: {
        fontSize: 12,
    },
});

export default DestinationItem;
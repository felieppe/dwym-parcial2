import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native';
import { FAB } from 'react-native-paper';
import { getAllDestinations, updateDestination, deleteDestination, createDestination } from './utils/api';
import DestinationItem from './components/DestinationItem';
import AddDestinationModal from './modals/AddDestinationModal';

export default function App() {
  const [destinations, setDestinations] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => { fetchDestinations(); }, [])

  const fetchDestinations = async () => {
    getAllDestinations().then((dsts) => { setDestinations(dsts.sort((a, b) => b.favorites - a.favorites)) }).catch((err) => { console.error(err) })
  }

  const handleAddDestination = (destination) => {
    createDestination(destination.name, destination.description, destination.difficulty, destination.favorites).then(() => { fetchDestinations(); setAddModalVisible(false) }).catch((err) => { console.error(err) })
  }

  const handleEditDestination = (destination) => {
    updateDestination(destination.id, destination.name, destination.description, destination.difficulty, destination.favorites).then(() => { fetchDestinations(); setAddModalVisible(false); setEditingDestination(null) }).catch((err) => { console.error(err) })
  }

  const handleDeleteDestination = (destination) => {
    deleteDestination(destination.id).then(() => { fetchDestinations() }).catch((err) => { console.error(err) })
  }

  const handleFavoriteDestination = (destination) => {
    if (favorites.includes(destination.id)) {
      setFavorites(favorites.filter((fav) => fav !== destination.id))
      updateDestination(destination.id, destination.name, destination.description, destination.difficulty, destination.favorites - 1).then(() => { fetchDestinations() }).catch((err) => { console.error(err) })
    } else {
      setFavorites([...favorites, destination.id])
      updateDestination(destination.id, destination.name, destination.description, destination.difficulty, destination.favorites + 1).then(() => { fetchDestinations() }).catch((err) => { console.error(err) })
    }
  }

  const renderItem = ({ item }) => {
    if (!item.name || !item.description || !item.difficulty) { return; }
    return ( <DestinationItem destination={item} favorites={favorites} onEdit={() => { setEditingDestination(item); setAddModalVisible(true) }} onDelete={handleDeleteDestination} onFavorite={handleFavoriteDestination}/> )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Destinos de Aventura</Text>

      <FlatList
        data={destinations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ width: '85%' }}
      />

      { destinations.length === 0 && <Text>¡Lo sentimos! No hay destinos registrados</Text> }

      { Platform.OS === 'android' ? (
        <FAB style={[styles.addButton, { backgroundColor: 'blue', alignSelf: 'flex-start' }]} color="black" icon="plus" label="Agregar Destino"/>
      ) : (
        <FAB style={[styles.addButton, { backgroundColor: 'green', alignSelf: 'flex-end' }]} color="white" icon="plus" onPress={() => { setAddModalVisible(true) }} label="Crear Planeta"/>
      ) }

      <AddDestinationModal visible={addModalVisible} onClose={() => setAddModalVisible(false)} onAdd={handleAddDestination} onEdit={handleEditDestination} editingDestination={editingDestination}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  },

  title: {
    marginBottom: 20,
    fontSize: 30
  },

  addButton: {
    margin: 10
  }
});

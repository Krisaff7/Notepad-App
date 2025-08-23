import { View, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Text, Button, IconButton, Card, TextInput } from 'react-native-paper';
import { Note } from '@/types';
import React, { useState, useMemo } from 'react';

interface NotesScreenProps {
  onNavigateToHome: () => void;
  onNavigateToAddNote: () => void;
  onEditNote: (note: Note) => void;
  notes: Note[];
  onDeleteNote: (id: string) => void;
}

const NotesScreen: React.FC<NotesScreenProps> = ({ 
  onNavigateToHome, 
  onNavigateToAddNote,
  onEditNote,
  notes,
  onDeleteNote
}) => {
  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      'Delete Note',
      `Are you sure you want to delete "${title || 'this note'}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDeleteNote(id),
        },
      ]
    );
  };

  const [searchQuery, setSearchQuery] = useState('');

    // Filtrer les notes basées sur la recherche
  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    
    const query = searchQuery.toLowerCase();
    return notes.filter(note => 
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  }, [notes, searchQuery]);

  const handleEdit = (note: Note) => {
    onEditNote(note);
  };

  const renderNoteItem = ({ item }: { item: Note }) => (
    <TouchableOpacity onPress={() => handleEdit(item)}>
      <Card style={styles.noteCard}>
        <Card.Content>
          {item.title ? (
            <Text variant="titleMedium" style={styles.noteTitle}>
              {item.title}
            </Text>
          ) : null}
          <Text variant="bodyMedium" numberOfLines={3} style={styles.noteContent}>
            {item.content}
          </Text>
          <View style={styles.noteFooter}>
            <Text variant="bodySmall" style={styles.noteDate}>
              {item.updatedAt.toLocaleDateString()} at{' '}
              {item.updatedAt.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
            <View style={styles.noteActions}>
              <IconButton
                icon="pencil"
                size={18}
                onPress={() => handleEdit(item)}
                style={styles.editButton}
              />
              <IconButton
                icon="delete"
                size={18}
                onPress={() => handleDelete(item.id, item.title)}
                style={styles.deleteButton}
              />
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={onNavigateToHome}
        />
        <Text variant="titleLarge" style={styles.title}>
          My Notes ({notes.length})
        </Text>
        <IconButton
          icon="plus"
          size={24}
          onPress={onNavigateToAddNote}
        />
      </View>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search notes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          mode="outlined"
          textColor="#000000"
          left={<TextInput.Icon icon="magnify" />}
          right={
            searchQuery ? (
              <TextInput.Icon 
                icon="close" 
                onPress={() => setSearchQuery('')} 
              />
            ) : null
          }
        />
      </View>

      {filteredNotes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text variant="titleMedium" style={styles.emptyText}>
            {searchQuery ? 'No notes found' : 'No notes yet'}
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubtext}>
            {searchQuery 
              ? 'Try a different search term'
              : 'Tap the + button to create your first note'
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={renderNoteItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <Button 
        mode="contained" 
        onPress={onNavigateToAddNote}
        style={styles.fab}
        icon="plus"
      >
        Add Note
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    backgroundColor: '#fff',
  },
  title: {
    color: '#18191aff',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#2b4055ff',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    color: '#212c35ff',
    textAlign: 'center',
  },
    noteCard: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4e2828ff',
  },
  noteTitle: {
    color: '#000000ff', // Noir pour le titre
    marginBottom: 8,
    fontWeight: '600',
  },
  noteContent: {
    color: '#232020ff', // Noir pour le contenu
    marginBottom: 12,
    lineHeight: 20,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteDate: {
    color: '#000000ff', // Gris foncé pour la date
    fontStyle: 'italic',
    flex: 1,
  },
  noteActions: {
    flexDirection: 'row',
  },
  editButton: {
    margin: 0,
  },
  deleteButton: {
    margin: 0,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#3179c2ff',
  },
  searchInput: {
    backgroundColor: '#ffffffff',
  },
});

export default NotesScreen;
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import HomeScreen from '@/screens/HomeScreen';
import NotesScreen from '@/screens/NotesScreen';
import AddNoteScreen from '@/screens/AddNoteScreen';
import EditNoteScreen from '@/screens/EditNoteScreen';
import { storageService } from '@/services/storsgeService';
import { Note, Screen } from '@/types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Charger les notes au démarrage
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      const loadedNotes = await storageService.loadNotes();
      setNotes(loadedNotes);
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async (title: string, content: string) => {
    try {
      const newNote: Note = {
        id: Date.now().toString(),
        title: title,
        content: content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await storageService.addNote(newNote);
      setNotes(prevNotes => [newNote, ...prevNotes]);
      setCurrentScreen('notes');
    } catch (error) {
      console.error('Failed to add note:', error);
      alert('Failed to save note. Please try again.');
    }
  };

  const handleUpdateNote = async (id: string, title: string, content: string) => {
    try {
      const updatedNote: Note = {
        id,
        title,
        content,
        createdAt: notes.find(note => note.id === id)!.createdAt,
        updatedAt: new Date(),
      };
      
      await storageService.updateNote(updatedNote);
      setNotes(prevNotes => 
        prevNotes.map(note => note.id === id ? updatedNote : note)
      );
      setCurrentScreen('notes');
      setSelectedNote(null);
    } catch (error) {
      console.error('Failed to update note:', error);
      alert('Failed to update note. Please try again.');
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await storageService.deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Failed to delete note:', error);
      alert('Failed to delete note. Please try again.');
    }
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setCurrentScreen('edit-note');
  };

  const renderScreen = () => {
    if (isLoading && currentScreen === 'home') {
      return (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      );
    }

    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onNavigateToNotes={() => setCurrentScreen('notes')} 
          />
        );
      case 'notes':
        return (
          <NotesScreen 
            onNavigateToHome={() => setCurrentScreen('home')}
            onNavigateToAddNote={() => setCurrentScreen('add-note')}
            onEditNote={handleEditNote}
            notes={notes}
            onDeleteNote={handleDeleteNote}
          />
        );
      case 'add-note':
        return (
          <AddNoteScreen 
            onNavigateBack={() => setCurrentScreen('notes')}
            onAddNote={handleAddNote}
          />
        );
      case 'edit-note':
        return selectedNote ? (
          <EditNoteScreen 
            onNavigateBack={() => {
              setCurrentScreen('notes');
              setSelectedNote(null);
            }}
            onUpdateNote={handleUpdateNote}
            note={selectedNote}
          />
        ) : (
          <HomeScreen 
            onNavigateToNotes={() => setCurrentScreen('notes')} 
          />
        );
      default:
        return (
          <HomeScreen 
            onNavigateToNotes={() => setCurrentScreen('notes')} 
          />
        );
    }

// Modifier la navigation pour inclure les titres

  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        {renderScreen()}
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
  },
});


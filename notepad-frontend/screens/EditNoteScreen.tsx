import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import { Note } from '@/types';

interface EditNoteScreenProps {
  onNavigateBack: () => void;
  onUpdateNote: (id: string, title: string, content: string) => void;
  note: Note;
}

const EditNoteScreen: React.FC<EditNoteScreenProps> = ({ 
  onNavigateBack, 
  onUpdateNote,
  note
}) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const handleUpdateNote = () => {
    if (content.trim()) {
      onUpdateNote(note.id, title.trim(), content.trim());
      onNavigateBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={onNavigateBack}
        />
        <Text variant="titleLarge" style={styles.title}>
          Edit Note
        </Text>
        <View style={{ width: 48 }} /> {/* Spacer for alignment */}
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          label="Title (optional)"
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
          mode="outlined"
          placeholder="Enter note title..."
        />
        
        <TextInput
          label="Content"
          value={content}
          onChangeText={setContent}
          style={styles.contentInput}
          mode="outlined"
          multiline
          numberOfLines={10}
          placeholder="Write your note here..."
          textAlignVertical="top"
        />

        <View style={styles.buttonContainer}>
          <Button 
            mode="outlined" 
            onPress={onNavigateBack}
            style={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button 
            mode="contained" 
            onPress={handleUpdateNote}
            style={styles.saveButton}
            disabled={!content.trim()}
            icon="content-save"
          >
            Update Note
          </Button>
        </View>
      </ScrollView>
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
  title: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  contentInput: {
    minHeight: 200,
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderColor: '#1976d2',
  },
  saveButton: {
    flex: 2,
    backgroundColor: '#1976d2',
  },
});

export default EditNoteScreen;
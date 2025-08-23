import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';

interface AddNoteScreenProps {
  onNavigateBack: () => void;
  onAddNote: (title: string, content: string) => void;
}

const AddNoteScreen: React.FC<AddNoteScreenProps> = ({ 
  onNavigateBack, 
  onAddNote 
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddNote = () => {
    if (content.trim()) {
      onAddNote(title.trim(), content.trim());
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
          New Note
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
          textColor="#000000"
          placeholder="Enter note title..."
        />
        
        <TextInput
          label="Content"
          value={content}
          onChangeText={setContent}
          style={styles.contentInput}
          mode="outlined"
          textColor="#000000"
          multiline
          numberOfLines={10}
          placeholder="Write your note here..."
          textAlignVertical="top"
        />

        <Button 
          mode="contained" 
          onPress={handleAddNote}
          style={styles.saveButton}
          disabled={!content.trim()}
          icon="content-save"
        >
          Save Note
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(208, 225, 242, 1)ff',
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
    backgroundColor: '#ffffffff',
  },
  saveButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 6,
  },
});

export default AddNoteScreen;
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
          size={25}
          onPress={onNavigateBack}
        />
        <Text variant="titleLarge" style={styles.title}>
          Nouveau Note
        </Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          label="Titre (optionel)"
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
          mode="outlined"
          textColor="#000000"
          placeholder="Entrez le titre..."
        />
        
        <TextInput
          label="Contenu"
          value={content}
          onChangeText={setContent}
          style={styles.contentInput}
          mode="outlined"
          textColor="#000000"
          multiline
          numberOfLines={10}
          placeholder="Ecrivez vos notes ici..."
          textAlignVertical="top"
        />

        <Button 
          mode="contained" 
          onPress={handleAddNote}
          style={styles.saveButton}
          disabled={!content.trim()}
          icon="content-save"
        >
          <Text>Sauvegarder</Text>
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
    color: '#2374c4ff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
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
    backgroundColor: '#8b62d3ff',
    paddingVertical: 7,
  },
});

export default AddNoteScreen;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '@/types';

const NOTES_KEY = '@notepad_notes';

export const storageService = {
  // Sauvegarder toutes les notes
  async saveNotes(notes: Note[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(notes);
      await AsyncStorage.setItem(NOTES_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving notes:', error);
      throw new Error('Failed to save notes');
    }
  },

  // Charger toutes les notes
  async loadNotes(): Promise<Note[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
      if (jsonValue != null) {
        const notes = JSON.parse(jsonValue);
        // Convertir les dates string en objets Date
        return notes.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading notes:', error);
      throw new Error('Failed to load notes');
    }
  },

  // Ajouter une note
  async addNote(note: Note): Promise<void> {
    try {
      const existingNotes = await this.loadNotes();
      const updatedNotes = [note, ...existingNotes];
      await this.saveNotes(updatedNotes);
    } catch (error) {
      console.error('Error adding note:', error);
      throw new Error('Failed to add note');
    }
  },

  // Supprimer une note
  async deleteNote(id: string): Promise<void> {
    try {
      const existingNotes = await this.loadNotes();
      const updatedNotes = existingNotes.filter(note => note.id !== id);
      await this.saveNotes(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw new Error('Failed to delete note');
    }
  },

  // Mettre à jour une note
  async updateNote(updatedNote: Note): Promise<void> {
    try {
      const existingNotes = await this.loadNotes();
      const updatedNotes = existingNotes.map(note =>
        note.id === updatedNote.id ? updatedNote : note
      );
      await this.saveNotes(updatedNotes);
    } catch (error) {
      console.error('Error updating note:', error);
      throw new Error('Failed to update note');
    }
  }
};
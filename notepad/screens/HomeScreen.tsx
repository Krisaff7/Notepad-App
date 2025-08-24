import React, { useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HomeScreenProps {
  onNavigateToNotes: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToNotes }) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Notepad App',
      headerShown: true,
      headerStyle: {
        backgroundColor: '#8b62d3',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Icône vectorielle à la place de l'image problématique */}
      <Icon 
        name="notebook" 
        size={100} 
        color="#8b62d3" 
        style={styles.icon}
      />
      
      <Text variant="headlineMedium" style={styles.title}>
        Bienvenue sur Notepad
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Capturez vos idées partout et tout le temps.
      </Text>
      <Button 
        mode="contained" 
        onPress={onNavigateToNotes}
        style={styles.button}
        icon="note-plus"
      >
        Allons-y
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    color: '#000000',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    opacity: 0.8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8b62d3',
    borderRadius: 8,
  },
});

export default HomeScreen;
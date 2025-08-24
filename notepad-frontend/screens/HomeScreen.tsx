import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from "react-native";
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

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
      backgroundColor: '#8b62d3ff',
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    derTitleAlign: 'center', // Utilisez cette propriété pour centrer le titre
  });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Image avec fond transparent */}
      <Image 
        source={require('@/assets/images/th.png')} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text variant="headlineMedium" style={styles.title}>
        Bienvenue sur Notepad
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Capturez vos idees partout et tout le temps.
      </Text>
      <Button 
        mode="contained" 
        onPress={onNavigateToNotes}
        style={styles.button}
        icon="note-plus"
        contentStyle={styles.buttonContent}
      >
        <Text>Allons-y</Text>
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
    backgroundColor: '#ffffffff', // Fond bleu clair
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
    // Aucun background, l'image PNG est transparente
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
    fontSize: 20,
  },
  button: {
    backgroundColor: '#8b62d3ff',
    borderRadius: 8,
  },
  buttonContent: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});

export default HomeScreen;
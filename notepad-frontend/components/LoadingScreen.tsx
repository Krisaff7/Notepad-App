import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.text}>
          📝 Notepad
        </Text>
        <ActivityIndicator 
          size="large" 
          color="#1976d2" 
          style={styles.spinner}
        />
        <Text variant="bodyMedium" style={styles.subtext}>
          Loading your notes...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  text: {
    color: '#000000ff',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  spinner: {
    marginBottom: 20,
  },
  subtext: {
    color: '#395b77ff',
  },
});

export default LoadingScreen;
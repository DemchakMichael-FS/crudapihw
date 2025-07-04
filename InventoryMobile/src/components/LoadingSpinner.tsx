import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2c5282" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
  },
});

export default LoadingSpinner;

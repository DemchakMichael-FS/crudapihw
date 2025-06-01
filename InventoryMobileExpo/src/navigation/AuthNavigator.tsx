import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

interface AuthNavigatorProps {
  onAuthSuccess: () => void;
}

const AuthNavigator: React.FC<AuthNavigatorProps> = ({ onAuthSuccess }) => {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register'>('login');

  const handleLoginSuccess = () => {
    onAuthSuccess();
  };

  const handleRegisterSuccess = () => {
    onAuthSuccess();
  };

  const navigateToRegister = () => {
    setCurrentScreen('register');
  };

  const navigateToLogin = () => {
    setCurrentScreen('login');
  };

  if (currentScreen === 'login') {
    return (
      <LoginScreen
        onLoginSuccess={handleLoginSuccess}
        onNavigateToRegister={navigateToRegister}
      />
    );
  }

  return (
    <RegisterScreen
      onRegisterSuccess={handleRegisterSuccess}
      onNavigateToLogin={navigateToLogin}
    />
  );
};

export default AuthNavigator;

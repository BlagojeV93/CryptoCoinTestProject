import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CryptoList from './src/components/CryptoList';

const App: React.FC = () => {

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CryptoList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
});

export default App;

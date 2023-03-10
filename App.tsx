import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CryptoList from './src/components/Crypto/CryptoList';
import COLORS from './src/helpers/styles/Colors';

const App: React.FC = () => {

	return (
		<SafeAreaView style={styles.mainContainer}>
			<CryptoList />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: COLORS.primaryBg
	}
});

export default App;

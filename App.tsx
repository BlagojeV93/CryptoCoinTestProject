import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CryptoList from './src/components/CryptoList';
import COLORS from './src/helpers/colors';

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
		backgroundColor: COLORS.primary
	}
});

export default App;

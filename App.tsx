// App.tsx
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { StatusBar, useColorScheme, View, StyleSheet } from 'react-native';
import {
	SafeAreaProvider,
	// useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<SafeAreaProvider>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
			/>
			<AppContent />
		</SafeAreaProvider>
	);
}

function AppContent() {
	// const safeAreaInsets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			<HomeScreen />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});

export default App;

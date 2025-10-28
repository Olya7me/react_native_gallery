// App.tsx
import React from 'react';
import { StatusBar, useColorScheme, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import PinScreen from './src/screens/PinScreen';
import { PinType } from './src/stores/PinStore';

export type RootStackParamList = {
	Home: undefined;
	PinScreen: { pin: PinType };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<SafeAreaProvider>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
			/>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="PinScreen" component={PinScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default App;

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Pin from '../components/Pin';

const HomeScreen = () => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View>
				<Pin
					title={'Tiile'}
					image={
						'https://fototips.ru/wp-content/uploads/2012/03/00_Autumn_Photo.jpg'
					}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
});

export default HomeScreen;

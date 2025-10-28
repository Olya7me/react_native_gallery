import React, { useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { pinStore } from '../stores/PinStore';
import MasonryList from '../components/MasonryList';

const HomeScreen = observer(() => {
	useEffect(() => {
		pinStore.fetchPins();
	}, []);

	const loadMore = useCallback(() => {
		pinStore.fetchPins();
	}, []);

	return (
		<SafeAreaView style={styles.safeArea}>
			{pinStore.pins.length === 0 && pinStore.loading ? (
				<View style={styles.indicator}>
					<ActivityIndicator size="large" color="blue" />
				</View>
			) : (
				<MasonryList pins={pinStore.pins} onEndReached={loadMore} />
			)}
		</SafeAreaView>
	);
});

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	indicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default HomeScreen;

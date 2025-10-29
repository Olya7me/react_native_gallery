import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { pinStore } from '../stores/PinStore';
import { COLORS } from '../consts';
import { MasonryList, ErrorView, Loader } from '../components';

const HomeScreen = observer(() => {
	useEffect(() => {
		pinStore.fetchPins();
		return () => pinStore.controller?.abort();
	}, []);

	const loadMore = () => pinStore.fetchPins();
	const retry = () => pinStore.fetchPins();

	if (pinStore.error) {
		return (
			<SafeAreaView style={styles.safeArea}>
				<ErrorView message={pinStore.error} onRetry={retry} />
			</SafeAreaView>
		);
	}

	if (pinStore.pins.length === 0 && pinStore.loading) {
		return (
			<SafeAreaView style={styles.safeArea}>
				<Loader size="large" fullScreen />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<MasonryList
				pins={pinStore.pins}
				onEndReached={loadMore}
				loading={pinStore.loading}
			/>
		</SafeAreaView>
	);
});

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
});

export default HomeScreen;

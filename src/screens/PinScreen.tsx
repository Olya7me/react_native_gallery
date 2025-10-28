import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Pressable,
	ScrollView,
} from 'react-native';
import {
	SafeAreaView,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons'; // иконка "назад"
import { useNavigation, useRoute } from '@react-navigation/native';
import { PinType } from '../stores/PinStore';

interface RouteParams {
	pin: PinType;
}

const PinScreen: React.FC = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const insets = useSafeAreaInsets();

	const { pin } = route.params as RouteParams;

	const goBack = () => navigation.goBack();

	return (
		<SafeAreaView style={styles.safe}>
			<ScrollView contentContainerStyle={styles.root}>
				<Image source={{ uri: pin.url }} style={styles.image} />
				<Text style={styles.title}>{pin.title}</Text>
				<Text style={styles.description}>{pin.description}</Text>
			</ScrollView>

			<Pressable
				onPress={goBack}
				style={[styles.backBtn, { top: insets.top + 10 }]}
			>
				<Icon name="arrow-back" size={30} color="black" />
			</Pressable>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: 'white' },
	root: { paddingBottom: 20, paddingHorizontal: 10 },
	image: {
		width: '100%',
		aspectRatio: 1,
		borderRadius: 15,
	},
	title: {
		marginTop: 15,
		fontSize: 24,
		fontWeight: '600',
		textAlign: 'center',
	},
	description: {
		marginTop: 10,
		fontSize: 16,
		lineHeight: 22,
		textAlign: 'center',
	},
	backBtn: {
		position: 'absolute',
		left: 10,
	},
});

export default PinScreen;

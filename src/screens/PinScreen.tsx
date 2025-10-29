import React, { useState } from 'react';
import {
	Text,
	Image,
	StyleSheet,
	Pressable,
	ScrollView,
	View,
} from 'react-native';
import {
	SafeAreaView,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PinType } from '../stores/types';
import { IconButton, PinModal, SceletonImage } from '../components';
import { IMAGE_COMMON, COLORS } from '../consts';

interface RouteParams {
	pin: PinType;
}

const PinScreen: React.FC = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const insets = useSafeAreaInsets();

	const { pin } = route.params as RouteParams;
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(true);

	const goBack = () => navigation.goBack();

	return (
		<SafeAreaView style={styles.safe}>
			<ScrollView contentContainerStyle={styles.root}>
				<Pressable onPress={() => setVisible(true)}>
					<View style={styles.imageWrapper}>
						{loading && <SceletonImage ratio={pin.ratio} />}
						<Image
							source={{ uri: pin.url }}
							style={[
								IMAGE_COMMON,
								{ aspectRatio: pin.ratio },
								loading ? styles.hiddenImage : {},
							]}
							onLoadEnd={() => setLoading(false)}
							resizeMode="cover"
						/>
					</View>
				</Pressable>

				<Text style={styles.title}>{pin.title}</Text>
				<Text style={styles.description}>{pin.description}</Text>
			</ScrollView>

			<IconButton
				iconName="arrow-back"
				onPress={goBack}
				style={{ top: insets.top + 10 }}
			/>

			<PinModal
				visible={visible}
				imageUri={pin.url}
				onClose={() => setVisible(false)}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: COLORS.background },
	root: { paddingBottom: 20, paddingHorizontal: 10 },
	imageWrapper: { position: 'relative', width: '100%' },
	hiddenImage: { position: 'absolute', opacity: 0 },
	title: {
		marginTop: 15,
		fontSize: 24,
		fontWeight: '600',
		textAlign: 'center',
		color: COLORS.buttonText,
	},
	description: {
		marginTop: 10,
		fontSize: 16,
		lineHeight: 22,
		textAlign: 'center',
		color: COLORS.buttonText,
	},
});

export default PinScreen;

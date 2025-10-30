import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import { IconButton } from '../components';

interface PinModalProps {
	visible: boolean;
	imageUri: string;
	onClose: () => void;
}

const PinModal: React.FC<PinModalProps> = ({ visible, imageUri, onClose }) => {
	if (!visible) return null;
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.overlay}>
			<ImageViewer
				imageUrls={[{ url: imageUri }]}
				enableSwipeDown
				onSwipeDown={onClose}
				renderIndicator={() => <View />}
				renderHeader={() => (
					<IconButton
						iconName="close"
						onPress={onClose}
						style={{ top: insets.top + 10 }}
					/>
				)}
				enablePreload
				saveToLocalByLongPress={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'black',
		zIndex: 999,
	},
});

export default PinModal;

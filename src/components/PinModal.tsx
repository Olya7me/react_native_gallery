import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageViewing from 'react-native-image-viewing';
import { IconButton } from '../components';

interface PinModalProps {
	visible: boolean;
	imageUri: string;
	onClose: () => void;
}

const PinModal: React.FC<PinModalProps> = ({ visible, imageUri, onClose }) => {
	const insets = useSafeAreaInsets();

	return (
		<ImageViewing
			images={[{ uri: imageUri }]}
			imageIndex={0}
			visible={visible}
			onRequestClose={onClose}
			HeaderComponent={() => (
				<IconButton
					iconName="close"
					onPress={onClose}
					style={{ top: insets.top + 10 }}
				/>
			)}
			animationType="fade"
		/>
	);
};

export default PinModal;

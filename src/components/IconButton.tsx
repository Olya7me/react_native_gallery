import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BUTTON_COMMON } from '../consts';

interface IconButtonProps {
	iconName: string;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
	iconSize?: number;
	iconColor?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
	iconName,
	onPress,
	style,
	iconSize = 30,
	iconColor = 'grey',
}) => {
	return (
		<Pressable onPress={onPress} style={[BUTTON_COMMON, style]}>
			<Icon name={iconName} size={iconSize} color={iconColor} />
		</Pressable>
	);
};

export default IconButton;

import { ViewStyle, ImageStyle } from 'react-native';

export const COLORS = {
	primaryButton: 'rgba(255,255,255,0.6)',
	errorText: '#e74c3c',
	background: '#fff',
	buttonText: '#2c3e50',
	buttonDefault: '#979797ff',
};

export const PADDING = {
	standard: 10,
};

export const FONT = {
	title: {
		fontSize: 16,
		lineHeight: 22,
		fontWeight: '600' as const,
	},
};

export const BUTTON_COMMON: ViewStyle = {
	position: 'absolute',
	left: 20,
	width: 40,
	height: 40,
	backgroundColor: COLORS.primaryButton,
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 10,
	zIndex: 100,
};

export const IMAGE_COMMON: ImageStyle = {
	width: '100%',
	borderRadius: 15,
};

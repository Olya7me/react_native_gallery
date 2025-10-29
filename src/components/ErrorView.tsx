import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../consts';

interface ErrorViewProps {
	message: string;
	onRetry: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
	return (
		<View style={styles.center}>
			<Icon
				name="sentiment-dissatisfied"
				size={60}
				color={COLORS.errorText}
			/>
			<Text style={styles.errorText}>{message}</Text>
			<TouchableOpacity onPress={onRetry} style={styles.retryButton}>
				<Text style={styles.retryText}>Повторить</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorText: {
		color: COLORS.errorText,
		fontSize: 16,
		marginBottom: 12,
		textAlign: 'center',
		paddingHorizontal: 20,
	},
	retryButton: {
		backgroundColor: COLORS.primaryButton,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 15,
	},
	retryText: {
		color: COLORS.buttonDefault,
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default ErrorView;

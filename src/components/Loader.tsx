import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoaderProps {
	size?: 'small' | 'large';
	color?: string;
	fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
	size = 'small',
	color = 'grey',
	fullScreen = false,
}) => {
	return (
		<View style={[styles.container, fullScreen && styles.fullScreen]}>
			<ActivityIndicator size={size} color={color} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	fullScreen: {
		flex: 1,
	},
});

export default Loader;

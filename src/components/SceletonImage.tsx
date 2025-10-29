import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { IMAGE_COMMON } from '../consts';

interface SkeletonImageProps {
	ratio?: number;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({ ratio }) => {
	const skeletonStyles: ViewStyle[] = [
		IMAGE_COMMON,
		{ aspectRatio: ratio },
		styles.skeleton,
	];

	return <View style={skeletonStyles} />;
};

const styles = StyleSheet.create({
	skeleton: {
		borderRadius: 8,
		backgroundColor: '#e0e0e0',
	},
});

export default SkeletonImage;

import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ImageStyle } from 'react-native';
import { IMAGE_COMMON, FONT } from '../consts';
import { SceletonImage } from '../components';

interface PinProps {
	title: string;
	image: string;
	ratio?: number;
	onRatioCalculated?: (ratio: number) => void;
}

const Pin: React.FC<PinProps> = ({ title, image, ratio }) => {
	const [loading, setLoading] = useState(true);

	const imageStyles: ImageStyle[] = [
		IMAGE_COMMON,
		{ aspectRatio: ratio, position: loading ? 'absolute' : 'relative' },
	];

	return (
		<View style={styles.pin}>
			<View>
				{loading && <SceletonImage ratio={ratio} />}
				<Image
					source={{ uri: image }}
					style={imageStyles}
					onLoadEnd={() => setLoading(false)}
				/>
			</View>
			<Text style={FONT.title} numberOfLines={1} ellipsizeMode="tail">
				{title}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	pin: { flex: 1, padding: 4, gap: 5 },
});

export default Pin;

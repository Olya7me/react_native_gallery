import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';

interface PinProps {
	title: string;
	image: string;
	ratio?: number;
	onRatioCalculated?: (ratio: number) => void;
}

const Pin: React.FC<PinProps> = ({
	title,
	image,
	ratio: propRatio,
	onRatioCalculated,
}) => {
	const [ratio, setRatio] = useState(propRatio || 1);

	useEffect(() => {
		if (!propRatio && image) {
			Image.getSize(image, (width, height) => {
				const r = width / height;
				setRatio(r);
				onRatioCalculated?.(r);
			});
		}
	}, [image]);

	const onLike = () => {};

	return (
		<View style={styles.pin}>
			<View>
				<Image
					source={{ uri: image }}
					style={[styles.image, { aspectRatio: ratio }]}
				/>
				<Pressable onPress={onLike} style={styles.heartBtn}>
					<Icon name="favorite" size={16} color="black" />
				</Pressable>
			</View>
			<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
				{title}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	pin: { flex: 1, padding: 4 },
	title: {
		fontSize: 16,
		lineHeight: 22,
		fontWeight: '600',
		margin: 5,
		color: '#181818',
	},
	heartBtn: {
		backgroundColor: '#D3CFD4',
		position: 'absolute',
		bottom: 10,
		right: 10,
		padding: 5,
		borderRadius: 50,
	},
	image: { width: '100%', borderRadius: 15 },
});

export default Pin;

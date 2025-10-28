import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';

interface PinProps {
	title: string;
	image: string;
}

const Pin: React.FC<PinProps> = props => {
	const { title, image } = props;

	const [ratio, setRatio] = useState(1);

	const onLike = () => {};

	useEffect(() => {
		if (image) {
			Image.getSize(image, (width, height) => {
				setRatio(width / height);
			});
		}
	}, [image]);

	return (
		<View style={styles.pin}>
			<View>
				<Image
					source={{
						uri: image,
					}}
					style={[styles.image, { aspectRatio: ratio }]}
				/>
				<Pressable onPress={onLike} style={styles.heartBtn}>
					<Icon name="favorite" size={16} color="black" />
				</Pressable>
			</View>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	pin: {
		width: '100%',
		padding: 4,
	},
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
	image: {
		width: '100%',
		borderRadius: 25,
	},
});

export default Pin;

import React, { useCallback } from 'react';
import {
	FlatList,
	StyleSheet,
	ListRenderItem,
	Pressable,
	Dimensions,
} from 'react-native';
import Pin from './Pin';
import { PinType } from '../stores/PinStore';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface MasonryListProps {
	pins: PinType[];
	onEndReached?: () => void;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const spacing = 10;
const columnWidth = (screenWidth - spacing * (numColumns + 1)) / numColumns;

const MasonryList: React.FC<MasonryListProps> = ({ pins, onEndReached }) => {
	const navigation = useNavigation<NavigationProp>();

	const renderPin: ListRenderItem<PinType> = useCallback(
		({ item }) => (
			<Pressable
				onPress={() => navigation.navigate('PinScreen', { pin: item })}
				style={{ width: columnWidth, margin: spacing / 2 }}
			>
				<Pin title={item.title} image={item.url} />
			</Pressable>
		),
		[navigation],
	);

	return (
		<FlatList
			data={pins}
			keyExtractor={item => item.id.toString()}
			renderItem={renderPin}
			numColumns={numColumns}
			contentContainerStyle={styles.container}
			onEndReached={onEndReached}
			onEndReachedThreshold={0.5}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: spacing / 2,
	},
});

export default MasonryList;

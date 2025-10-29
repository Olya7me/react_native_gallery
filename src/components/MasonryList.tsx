import React, { useCallback, useState } from 'react';
import {
	FlatList,
	StyleSheet,
	ListRenderItem,
	Pressable,
	View,
	Button,
} from 'react-native';
import Pin from './Pin';
import { PinType } from '../stores/types';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PADDING, COLORS } from '../consts';
import { Loader } from '../components';

interface MasonryListProps {
	pins: PinType[];
	onEndReached?: () => void;
	loading?: boolean;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const MasonryList: React.FC<MasonryListProps> = ({
	pins,
	onEndReached,
	loading,
}) => {
	const navigation = useNavigation<NavigationProp>();

	const [numColumns, setNumColumns] = useState(1);

	const toggleColumns = () => setNumColumns(prev => (prev === 1 ? 2 : 1));

	const renderPin: ListRenderItem<PinType> = useCallback(
		({ item }) => (
			<Pressable
				onPress={() => navigation.navigate('PinScreen', { pin: item })}
				style={{ flex: 1 }}
			>
				<Pin title={item.title} image={item.url} ratio={item.ratio} />
			</Pressable>
		),
		[navigation],
	);

	return (
		<View style={{ flex: 1 }}>
			<Pressable onPress={toggleColumns} style={styles.columnsSwitch}>
				<Icon
					name={numColumns === 1 ? 'view-day' : 'apps'}
					size={24}
					color={COLORS.buttonDefault}
				/>
			</Pressable>

			<FlatList
				data={pins}
				keyExtractor={item => item.id.toString()}
				renderItem={renderPin}
				numColumns={numColumns}
				key={numColumns}
				contentContainerStyle={styles.container}
				onEndReached={onEndReached}
				onEndReachedThreshold={0.5}
				ListFooterComponent={loading ? <Loader /> : null}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: PADDING.standard,
	},
	columnsSwitch: {
		padding: PADDING.standard,
	},
});

export default MasonryList;

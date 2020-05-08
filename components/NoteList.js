import format from 'date-fns/format';
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { Touchable, Text } from '../components/base';
import { Colors, Sizes } from '../constants';

function Item({ item, onPress }) {
  return (
    <Touchable>
      <View style={styles.item}>
        <Text style={styles.createdAt}>{format(item.createdAt, 'PP')}</Text>
        <Text>{item.content}</Text>
      </View>
    </Touchable>
  );
}

export default function NoteList({ onPress, notes }) {
  return (
    <FlatList
      data={notes}
      renderItem={({ item }) => <Item item={item} onPress={onPress} />}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  createdAt: {
    fontWeight: 'bold',
    marginBottom: Sizes.unit * 2,
  },
  item: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderRadius: Sizes.radius,
    borderWidth: 1,
    margin: Sizes.edge,
    padding: Sizes.content,
  },
});

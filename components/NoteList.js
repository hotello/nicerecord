import format from 'date-fns/format';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, FlatList, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { Touchable, Text } from '../components/base';
import { Colors, Sizes } from '../constants';

function Item({ item, onPress }) {
  return (
    <Touchable onPress={() => onPress(item)}>
      <View style={styles.item}>
        <Text style={styles.createdAt}>
          {format(new Date(item.createdAt), 'PP')}
        </Text>
        <Text>{item.content}</Text>
      </View>
    </Touchable>
  );
}

function ListEmptyComponent() {
  const { t } = useTranslation();

  return (
    <View style={styles.empty}>
      <Text muted>{t('noNotes')}</Text>
    </View>
  );
}

export default function NoteList({ onPress, notes }) {
  return (
    <FlatList
      data={notes}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({ item }) => <Item item={item} onPress={onPress} />}
      keyExtractor={(item) => item._id}
    />
  );
}

const styles = StyleSheet.create({
  createdAt: {
    fontWeight: 'bold',
    marginBottom: Sizes.unit * 2,
  },
  empty: {
    alignItems: 'center',
    padding: Sizes.content,
    justifyContent: 'center',
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

import format from 'date-fns/format';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, FlatList, StyleSheet } from 'react-native';

import { ListItem, Text } from '../components/base';
import { Colors, Sizes } from '../constants';

function Item({ item, onPress, selected }) {
  return (
    <ListItem onPress={() => onPress(item)}>
      <View style={[styles.item, selected && styles.selected]}>
        <Text style={styles.date}>{format(new Date(item.date), 'PP')}</Text>
        <Text>{item.summary}</Text>
      </View>
    </ListItem>
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

export default function NoteList({ onPress, notes, selected }) {
  return (
    <FlatList
      data={notes}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({ item }) =>
        <Item item={item} onPress={onPress} selected={item._id === selected} />
      }
      keyExtractor={(item) => item._id}
    />
  );
}

const styles = StyleSheet.create({
  date: {
    fontWeight: 'bold',
    marginBottom: Sizes.unit * 2,
  },
  empty: {
    alignItems: 'center',
    padding: Sizes.content,
    justifyContent: 'center',
  },
  item: {
    padding: Sizes.content,
  },
  selected: {
    backgroundColor: { windowsbrush: 'SystemControlHighlightAltListAccentLowBrush' }
  },
});

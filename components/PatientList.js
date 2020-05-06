import dayjs from 'dayjs';
import * as React from 'react';
import { Image, SectionList, StyleSheet, View } from 'react-native';

import { Text, Touchable } from './base';
import { Sizes } from '../constants';
import * as ArrayUtils from '../lib/ArrayUtils';

function Item({ onPress, item }) {
  return (
    <Touchable onPress={() => onPress(item)}>
      <View style={styles.item}>
        <Image source={{ uri: item.picture }} style={styles.picture} />
        <View style={styles.center}>
          <Text>{item.name}</Text>
          <Text muted>{dayjs(item.birthDate).format('LL')}</Text>
        </View>
      </View>
    </Touchable>
  );
}

export default function PatientList({ onPress, patients }) {
  const sections = ArrayUtils.alphabetizeForSections(patients, 'name');
  return (
    <SectionList
      initialNumToRender={20}
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Item onPress={onPress} item={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    paddingHorizontal: Sizes.content,
    paddingVertical: Sizes.unit * 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Sizes.unit * 2,
  },
  picture: {
    borderRadius: (Sizes.unit * 12) / 2,
    height: Sizes.unit * 12,
    marginHorizontal: Sizes.content,
    width: Sizes.unit * 12,
  },
});

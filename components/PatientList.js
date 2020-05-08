import format from 'date-fns/format';
import * as React from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

import { Avatar, Text, Touchable } from './base';
import { Sizes } from '../constants';
import * as ArrayUtils from '../lib/ArrayUtils';

function Item({ onPress, item }) {
  return (
    <Touchable onPress={() => onPress(item)}>
      <View style={styles.item}>
        <Avatar rounded title={item.name} style={styles.picture} />
        <View style={styles.center}>
          <Text>{item.name}</Text>
          <Text muted>{format(new Date(item.birthDate), 'PP')}</Text>
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
    marginHorizontal: Sizes.content,
  },
});

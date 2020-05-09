import format from 'date-fns/format';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
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

function ListEmptyComponent() {
  const { t } = useTranslation();

  return (
    <View style={styles.empty}>
      <Text muted>{t('noPatients')}</Text>
    </View>
  );
}

export default function PatientList({ onPress, patients }) {
  const sections = ArrayUtils.alphabetizeForSections(patients, 'name');
  return (
    <SectionList
      initialNumToRender={20}
      sections={sections}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({ item }) => <Item onPress={onPress} item={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    padding: Sizes.content,
    justifyContent: 'center',
  },
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

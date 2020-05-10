import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionList, StyleSheet, View } from 'react-native';

import { Avatar, Text, Touchable } from './base';
import { Sizes } from '../constants';

const alphabetize = (rawData) => {
  // Since data at this point is an object, to get array of values
  // we use Object.values method
  if (rawData.length < 1) {
    return [];
  }

  return Object.values(
    rawData
      // Order by provided key all objects in the array
      .sort(function (a, b) {
        // Ensure function is not case sensitive
        const keyA = a.name.text.toUpperCase();
        const keyB = b.name.text.toUpperCase();
        // Order by provided key
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      })
      // Group by first letter
      .reduce((r, e) => {
        // Get first letter of name of current element
        let title = e.name.text[0];
        // If there is no property in accumulator with this letter create it
        if (!r[title]) r[title] = { title, data: [e] };
        // If there is push current element to data array for that letter
        else r[title].data.push(e);
        // Return accumulator
        return r;
      }, {})
  );
};

function Item({ onPress, item }) {
  return (
    <Touchable onPress={() => onPress(item)}>
      <View style={styles.item}>
        <Avatar rounded title={item.name.text} style={styles.picture} />
        <View style={styles.center}>
          <Text>{item.name.text}</Text>
          <Text muted>{format(parseISO(item.birthDate), 'PP')}</Text>
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
  const sections = alphabetize(patients);

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

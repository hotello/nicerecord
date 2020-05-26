import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionList, StyleSheet, View } from 'react-native';

import { Avatar, Button, Icon, ListItem, Text } from './base';
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

function Item({ onPress, item, selected }) {
  return (
    <ListItem onPress={() => onPress(item)}>
      <View style={styles.item}>
        {selected && (
          <View
            style={{
              backgroundColor: { windowsbrush: 'SystemAccentColor' },
              height: Sizes.unit * 6,
              width: Sizes.unit,
            }}
          />
        )}
        <Avatar rounded title={item.name.text} style={styles.picture} size={28} />
        <View style={styles.details}>
          <Text>{item.name.text}</Text>
          {/*<Text muted>{format(parseISO(item.birthDate), 'PP')}</Text>*/}
        </View>
      </View>
    </ListItem>
  );
}

function ListEmptyComponent() {
  const { t } = useTranslation();

  return (
    <View style={styles.empty}>
      <Text>{t('noPatients')}</Text>
    </View>
  );
}

export default function PatientList({ onPress, patients, selected }) {
  const sections = alphabetize(patients);

  return (
    <SectionList
      initialNumToRender={20}
      sections={sections}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({ item }) =>
        <Item onPress={onPress} item={item} selected={selected === item._id} />
      }
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  details: {
    alignItems: 'center',
  },
  empty: {
    padding: Sizes.content,
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

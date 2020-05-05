import * as React from 'react';
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';

import * as ArrayUtils from '../lib/ArrayUtils';

function Item({ birthDate, name, picture }) {
  return (
    <View style={styles.item}>
      <Image source={{ uri: picture }} style={styles.picture} />
      <View style={styles.center}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{birthDate.toLocaleDateString()}</Text>
      </View>
    </View>
  );
}

export default function PatientList({ patients }) {
  const sections = ArrayUtils.alphabetizeForSections(patients, 'name');
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Item {...item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  description: {
    color: 'gray',
  },
  header: {
    fontWeight: 'bold',
    padding: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picture: {
    borderRadius: 32 / 2,
    height: 32,
    margin: 8,
    width: 32,
  },
  title: {},
});

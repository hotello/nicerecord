import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { Colors } from './constants';
import MyPatientsScreen from './screens/MyPatientsScreen';
import PatientScreen from './screens/PatientScreen';
import NoteScreen from './screens/NoteScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.content}>
        <View style={styles.left}>
          <MyPatientsScreen />
        </View>
        <View style={styles.middle}>
          <PatientScreen />
        </View>
        <View style={styles.right}>
          <NoteScreen />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.background,
    maxHeight: Dimensions.get('window').height - 50,
    flexDirection: 'row',
  },
  header: {
    backgroundColor: Colors.englishViolet,
    height: 50,
  },
  left: {
    backgroundColor: Colors.beige,
    flex: 0.2,
  },
  middle: {
    flex: 0.35,
  },
  right: {
    backgroundColor: Colors.white,
    flex: 0.45,
  },
});

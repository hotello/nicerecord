import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from './constants';
import MyPatientsScreen from './screens/MyPatientsScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <MyPatientsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});

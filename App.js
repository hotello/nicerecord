import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    flex: 1,
  },
});

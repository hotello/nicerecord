import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Colors } from './constants';
import MyPatientsScreen from './screens/MyPatientsScreen';
import PatientScreen from './screens/PatientScreen';
import NoteScreen from './screens/NoteScreen';

const LeftStack = createStackNavigator();
const MiddleStack = createStackNavigator();
const RightStack = createStackNavigator();

const NavigationTheme = {
  dark: false,
  colors: {
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.text,
    border: Colors.border,
  },
};

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <NavigationContainer theme={NavigationTheme}>
          <LeftStack.Navigator>
            <LeftStack.Screen
              name="MyPatients"
              component={MyPatientsScreen}
              options={{ title: 'My patients' }}
            />
          </LeftStack.Navigator>
        </NavigationContainer>
      </View>

      <View style={styles.middle}>
        <NavigationContainer theme={NavigationTheme}>
          <MiddleStack.Navigator>
            <MiddleStack.Screen
              name="Patient"
              component={PatientScreen}
              options={{ title: 'Patient' }}
            />
          </MiddleStack.Navigator>
        </NavigationContainer>
      </View>

      <View style={styles.right}>
        <NavigationContainer theme={NavigationTheme}>
          <RightStack.Navigator>
            <RightStack.Screen
              name="Note"
              component={NoteScreen}
              options={{ title: 'Note' }}
            />
          </RightStack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 0.2,
  },
  middle: {
    flex: 0.35,
  },
  right: {
    flex: 0.45,
  },
});

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Colors } from './constants';
import i18n from './i18n';
import MyPatientsScreen from './screens/MyPatientsScreen';
import NoteScreen from './screens/NoteScreen';
import PatientScreen from './screens/PatientScreen';
import ProfileScreen from './screens/ProfileScreen';

const LeftStack = createStackNavigator();
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
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <NavigationContainer theme={NavigationTheme}>
          <LeftStack.Navigator>
            <LeftStack.Screen
              name="MyPatients"
              component={MyPatientsScreen}
              options={{ title: t('myPatients') }}
            />
            <LeftStack.Screen
              name="Patient"
              component={PatientScreen}
              options={{ title: t('patient') }}
            />
            <LeftStack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: t('profile') }}
            />
          </LeftStack.Navigator>
        </NavigationContainer>
      </View>

      <View style={styles.right}>
        <NavigationContainer theme={NavigationTheme}>
          <RightStack.Navigator>
            <RightStack.Screen
              name="Note"
              component={NoteScreen}
              options={{ title: t('note') }}
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
    flex: 1 / 3,
    borderColor: Colors.border,
    borderWidth: StyleSheet.hairlineWidth,
  },
  right: {
    flex: 2 / 3,
  },
});

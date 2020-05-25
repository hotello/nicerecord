import React from 'react';

import NoteTaker from './NoteTaker';
import MyPatientsScreen from '../screens/MyPatientsScreen';

export default function RootNavigator() {
  const [route, setRoute] = React.useState({ name: 'MyPatients' });
  const navigation = {
    navigate: (name, params) => setRoute({ name, params })
  };
  return {
    'MyPatients': <MyPatientsScreen navigation={navigation} route={route} />,
    'NoteTaker': <NoteTaker navigation={navigation} route={route} />
  }[route.name];
}

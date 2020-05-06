import * as faker from 'faker';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';

import { Colors, Sizes } from '../constants';
import { IconButton } from '../components/base';

export default function NoteScreen({ navigation }) {
  const { t } = useTranslation();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconButton icon="trash" style={styles.icon} />,
    });
  }, []);

  return (
    <View style={styles.screen}>
      <TextInput multiline placeholder={t('writeHere')} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: Sizes.edge,
  },
  input: {
    alignItems: 'flex-start',
    flex: 1,
    fontSize: Sizes.text,
  },
  screen: {
    backgroundColor: Colors.surface,
    flex: 1,
    padding: Sizes.content,
  },
});

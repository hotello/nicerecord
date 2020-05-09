import * as React from 'react';

const NoteContext = React.createContext({
  note: null,
  patient: null,
  setNote: () => {},
  setPatient: () => {},
});

export default NoteContext;

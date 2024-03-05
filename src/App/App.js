import './App.css';
import React from 'react';

import { AppUI } from './AppUI';
import { Provider } from '../Context/Context';

function App() {
  return (
    <Provider>
      <AppUI />
    </Provider>

  );
}

export default App;

import {createContext} from 'react';
const ThemeContext = createContext({
  state: {},
  dispatch: (aciton: any) => {},
});
export default ThemeContext;

import {createContext} from 'react';
const GlobalContext = createContext({
  state: {},
  dispatch: (aciton: any) => {},
});
export default GlobalContext;

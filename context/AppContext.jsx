import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from "react";
import { initialState, rootReducer } from "./reducers";

const AppContext = createContext();

function IsJsonString(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    let cartItems = localStorage.getItem("canlisu-cart");
    if (cartItems) {
      const items = IsJsonString(cartItems);
      if (items) {
        dispatch({ type: "cart:set_items", payload: items });
      } else {
        localStorage.removeItem("canlisu-cart");
      }
    }
  }, []);

  const store = useMemo(() => {
    return [state, dispatch];
  }, [state, dispatch]);

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}
export function useStore() {
  return useContext(AppContext);
}

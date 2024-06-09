import { Provider } from "react-redux";
import { store } from "./store";
import React, { ReactNode } from "react";

const Providers: React.FC<{children: ReactNode}> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers

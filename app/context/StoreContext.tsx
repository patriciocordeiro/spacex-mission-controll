'use client';
import { createContext } from 'react';
import SpaceXStore from '../stores/launch.store';

export interface Store {
  launchStore: SpaceXStore;
}

export const initialStoreValue = {
  launchStore: new SpaceXStore(),
};

const StoreContext = createContext<Store>(initialStoreValue);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreContext.Provider value={initialStoreValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;

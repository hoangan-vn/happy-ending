'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { BaseStore } from './BaseStore';

interface BaseProviderProps {
  children: ReactNode;
  store: BaseStore;
}

const BaseContext = createContext<BaseStore | null>(null);

export const BaseProvider: React.FC<BaseProviderProps> = ({ children, store }) => {
  return <BaseContext.Provider value={store}>{children}</BaseContext.Provider>;
};

export const useBaseStore = () => {
  const context = useContext(BaseContext);
  if (!context) {
    throw new Error('useBaseStore must be used within a BaseProvider');
  }
  return context;
};

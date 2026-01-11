
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Product, PurchaseOrder, Transaction, AppSettings, AppView } from './types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  view: AppView;
  setView: (view: AppView) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  purchaseOrders: PurchaseOrder[];
  setPurchaseOrders: (pos: PurchaseOrder[]) => void;
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
  clearTransactions: () => void;
  settings: AppSettings;
  updateSettings: (s: AppSettings) => void;
}

const defaultSettings: AppSettings = {
  serverAddress: 'http://192.168.1.100/warehouse',
  deviceName: 'Scanner-01',
  outputFormat: 'REC_{Date}_{Device}.csv'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<AppView>('LOGIN');
  const [products, setProducts] = useState<Product[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('wh_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('wh_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const savedTrans = localStorage.getItem('wh_transactions');
    if (savedTrans) setTransactions(JSON.parse(savedTrans));
  }, []);

  useEffect(() => {
    localStorage.setItem('wh_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t: Transaction) => setTransactions(prev => [...prev, t]);
  const clearTransactions = () => setTransactions([]);
  const updateSettings = (s: AppSettings) => setSettings(s);

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      view, setView,
      products, setProducts,
      purchaseOrders, setPurchaseOrders,
      transactions, addTransaction, clearTransactions,
      settings, updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};


export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export interface Product {
  sku: string;
  description: string;
}

export interface PurchaseOrder {
  poNumber: string;
  sku: string;
  expectedQty: number;
}

export interface Transaction {
  id: string;
  timestamp: string;
  type: 'PO' | 'AD_HOC';
  reference: string; // PO Number or DO Reference
  sku: string;
  qty: number;
  device: string;
  user: string;
}

export interface AppSettings {
  serverAddress: string;
  deviceName: string;
  outputFormat: string;
}

export type AppView = 'LOGIN' | 'DASHBOARD' | 'RECEIVING_PO' | 'RECEIVING_AD_HOC' | 'SYNC' | 'SETTINGS';

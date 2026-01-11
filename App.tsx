
import React from 'react';
import { AppProvider, useApp } from './store';
import { Login } from './views/Login';
import { Dashboard } from './views/Dashboard';
import { ReceivingPO } from './views/ReceivingPO';
import { ReceivingAdHoc } from './views/ReceivingAdHoc';
import { Sync } from './views/Sync';
import { Settings } from './views/Settings';

const AppContent: React.FC = () => {
  const { view, currentUser } = useApp();

  if (!currentUser) {
    return <Login />;
  }

  switch (view) {
    case 'DASHBOARD': return <Dashboard />;
    case 'RECEIVING_PO': return <ReceivingPO />;
    case 'RECEIVING_AD_HOC': return <ReceivingAdHoc />;
    case 'SYNC': return <Sync />;
    case 'SETTINGS': return <Settings />;
    default: return <Dashboard />;
  }
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-zinc-950 selection:bg-yellow-400 selection:text-zinc-950 flex flex-col">
        <AppContent />
      </div>
    </AppProvider>
  );
};

export default App;

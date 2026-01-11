
import React from 'react';
import { useApp } from '../store';
import { Button, Badge } from '../components/UI';
import { UserRole } from '../types';

export const Dashboard: React.FC = () => {
  const { currentUser, setView, setCurrentUser, transactions } = useApp();

  const handleLogout = () => {
    setCurrentUser(null);
    setView('LOGIN');
  };

  const navItems = [
    { 
      label: 'PO Receiving', 
      view: 'RECEIVING_PO', 
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      color: 'bg-yellow-400'
    },
    { 
      label: 'Ad-Hoc', 
      view: 'RECEIVING_AD_HOC', 
      icon: 'M12 4v16m8-8H4',
      color: 'bg-emerald-400'
    },
    { 
      label: 'Sync Data', 
      view: 'SYNC', 
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      color: 'bg-blue-400'
    },
    { 
      label: 'Settings', 
      view: 'SETTINGS', 
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      color: 'bg-zinc-500',
      adminOnly: true
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-zinc-500 font-black uppercase text-xs tracking-widest">Active Operator</p>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-white uppercase italic">{currentUser?.username}</h2>
            <Badge color={currentUser?.role === UserRole.ADMIN ? 'red' : 'green'}>
                {currentUser?.role}
            </Badge>
          </div>
        </div>
        <button onClick={handleLogout} className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors border border-zinc-800">
           <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1h-3v-1m3-4H7" />
           </svg>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {navItems.map((item) => {
          if (item.adminOnly && currentUser?.role !== UserRole.ADMIN) return null;
          return (
            <button
              key={item.view}
              onClick={() => setView(item.view as any)}
              className="relative group h-48 bg-zinc-900 rounded-3xl border-2 border-zinc-800 p-8 text-left hover:border-yellow-400 transition-all active:scale-[0.97] overflow-hidden"
            >
              <div className="relative z-10 flex flex-col justify-between h-full">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} text-zinc-950`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon} />
                    </svg>
                 </div>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tight">{item.label}</h3>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 bg-white/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-colors" />
            </button>
          );
        })}
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
        <div className="flex justify-between items-center mb-6">
            <h4 className="text-zinc-500 font-black uppercase text-xs tracking-[0.2em]">Live Session Data</h4>
            <span className="text-zinc-300 font-bold text-sm">{transactions.length} Transactions</span>
        </div>
        {transactions.length === 0 ? (
            <div className="py-12 text-center border-2 border-dashed border-zinc-800 rounded-2xl">
                <p className="text-zinc-600 font-bold uppercase text-xs tracking-widest italic">No transactions recorded in current session</p>
            </div>
        ) : (
            <div className="space-y-4">
                {transactions.slice(-3).reverse().map(t => (
                    <div key={t.id} className="flex justify-between items-center p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                        <div>
                            <p className="text-white font-bold">{t.sku}</p>
                            <p className="text-zinc-500 text-xs uppercase font-black">{t.reference} • {new Date(t.timestamp).toLocaleTimeString()}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-yellow-400 font-black text-xl">+{t.qty}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

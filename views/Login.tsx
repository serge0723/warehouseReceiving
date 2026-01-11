
import React, { useState } from 'react';
import { useApp } from '../store';
import { Button, Input } from '../components/UI';
import { UserRole } from '../types';

export const Login: React.FC = () => {
  const { setCurrentUser, setView } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'admin') {
      setCurrentUser({ id: '1', username: 'admin', role: UserRole.ADMIN });
      setView('DASHBOARD');
    } else if (username === 'user' && password === 'user') {
      setCurrentUser({ id: '2', username: 'user', role: UserRole.USER });
      setView('DASHBOARD');
    } else {
      setError('Invalid credentials. Use admin/admin or user/user.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-950">
      <div className="max-w-md w-full space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-yellow-400 rounded-2xl industrial-shadow mb-4">
            <svg className="w-12 h-12 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic">
            Receiving<span className="text-yellow-400">Pro</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-sm">Industrial Logistics Terminal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 bg-zinc-900 p-8 rounded-3xl border border-zinc-800 industrial-shadow">
          <Input 
            label="Operator ID" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <Input 
            label="Passcode" 
            type="password" 
            placeholder="••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          {error && <p className="text-orange-500 font-bold text-center uppercase text-xs tracking-wider">{error}</p>}
          
          <Button type="submit" fullWidth>
            Access System
          </Button>
        </form>

        <div className="text-center">
            <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest">v2.4.0-STABLE | DEVICE-OFFLINE</p>
        </div>
      </div>
    </div>
  );
};

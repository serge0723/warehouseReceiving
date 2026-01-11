
import React, { useState } from 'react';
import { useApp } from '../store';
import { Button, Input, Card } from '../components/UI';

export const Settings: React.FC = () => {
  const { settings, updateSettings, setView } = useApp();
  
  const [formData, setFormData] = useState(settings);

  const handleSave = () => {
    updateSettings(formData);
    setView('DASHBOARD');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('DASHBOARD')} className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 text-zinc-400">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
           </svg>
        </button>
        <h2 className="text-3xl font-black uppercase italic text-white tracking-tight">Terminal Settings</h2>
      </header>

      <Card className="space-y-6">
        <Input 
            label="Server Address (URL/PATH)" 
            value={formData.serverAddress} 
            onChange={e => setFormData({ ...formData, serverAddress: e.target.value })}
        />
        <Input 
            label="Device Unique ID" 
            value={formData.deviceName} 
            onChange={e => setFormData({ ...formData, deviceName: e.target.value })}
        />
        <Input 
            label="Output Filename Pattern" 
            value={formData.outputFormat} 
            onChange={e => setFormData({ ...formData, outputFormat: e.target.value })}
        />
        
        <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
            <p className="text-zinc-500 font-black text-[10px] uppercase tracking-widest mb-2">Variables available:</p>
            <div className="flex gap-2">
                <code className="text-yellow-400 text-xs font-mono bg-zinc-900 px-2 py-1 rounded">{"{Date}"}</code>
                <code className="text-yellow-400 text-xs font-mono bg-zinc-900 px-2 py-1 rounded">{"{Device}"}</code>
            </div>
        </div>

        <div className="pt-4 flex gap-4">
            <Button onClick={handleSave} fullWidth>Save Changes</Button>
            <Button onClick={() => setView('DASHBOARD')} variant="ghost">Cancel</Button>
        </div>
      </Card>
    </div>
  );
};

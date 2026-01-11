
import React, { useState } from 'react';
import { useApp } from '../store';
import { Button, Input, Card } from '../components/UI';

export const ReceivingAdHoc: React.FC = () => {
  const { products, addTransaction, setView, settings, currentUser } = useApp();
  
  const [ref, setRef] = useState('');
  const [sku, setSku] = useState('');
  const [qty, setQty] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = () => {
    setError('');
    setSuccess('');

    if (!ref || !sku || !qty) {
      setError('ALL FIELDS REQUIRED');
      return;
    }

    const quantity = parseInt(qty);
    if (isNaN(quantity) || quantity <= 0) {
      setError('INVALID QUANTITY');
      return;
    }

    // Validation: Product exists in Master
    const product = products.find(p => p.sku === sku);
    if (!product && products.length > 0) {
      setError(`SKU ${sku} NOT IN MASTER DATA`);
      return;
    }

    addTransaction({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: 'AD_HOC',
      reference: ref,
      sku: sku,
      qty: quantity,
      device: settings.deviceName,
      user: currentUser?.username || 'unknown'
    });

    setSuccess(`AD-HOC: RECEIVED ${quantity} OF ${sku}`);
    setSku('');
    setQty('');
    
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('DASHBOARD')} className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 text-zinc-400">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
           </svg>
        </button>
        <h2 className="text-3xl font-black uppercase italic text-white tracking-tight">Ad-Hoc Receiving</h2>
      </header>

      <Card className="space-y-6">
        <Input 
            label="Document Reference" 
            placeholder="DO-12345 / BOL-..." 
            value={ref} 
            onChange={e => setRef(e.target.value.toUpperCase())}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
                label="SKU / Barcode" 
                placeholder="Scan Item..." 
                value={sku} 
                onChange={e => setSku(e.target.value.toUpperCase())}
            />
            <Input 
                label="Quantity" 
                type="number" 
                inputMode="numeric"
                placeholder="0" 
                value={qty} 
                onChange={e => setQty(e.target.value)}
            />
        </div>

        {error && (
            <div className="bg-orange-500/10 border-2 border-orange-500 p-4 rounded-xl flex items-center gap-3">
                <span className="text-orange-500 font-black uppercase text-sm tracking-wider">{error}</span>
            </div>
        )}

        {success && (
            <div className="bg-emerald-500/10 border-2 border-emerald-500 p-4 rounded-xl flex items-center gap-3">
                <span className="text-emerald-500 font-black uppercase text-sm tracking-wider">{success}</span>
            </div>
        )}

        <Button fullWidth onClick={handleSave} variant="secondary">
            Log Transaction
        </Button>
      </Card>
    </div>
  );
};

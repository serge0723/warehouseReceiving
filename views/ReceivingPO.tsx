
import React, { useState, useMemo } from 'react';
import { useApp } from '../store';
import { Button, Input, Card, Badge } from '../components/UI';

export const ReceivingPO: React.FC = () => {
  const { purchaseOrders, products, addTransaction, setView, settings, currentUser } = useApp();
  
  const [selectedPo, setSelectedPo] = useState('');
  const [sku, setSku] = useState('');
  const [qty, setQty] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const poList = useMemo(() => Array.from(new Set(purchaseOrders.map(po => po.poNumber))), [purchaseOrders]);
  
  const currentPoItems = useMemo(() => 
    purchaseOrders.filter(po => po.poNumber === selectedPo), 
    [purchaseOrders, selectedPo]
  );

  const handleSave = () => {
    setError('');
    setSuccess('');

    if (!selectedPo || !sku || !qty) {
      setError('ALL FIELDS REQUIRED');
      return;
    }

    const quantity = parseInt(qty);
    if (isNaN(quantity) || quantity <= 0) {
      setError('INVALID QUANTITY');
      return;
    }

    // Validation: Product belongs to PO
    const poItem = currentPoItems.find(item => item.sku === sku);
    if (!poItem) {
      setError(`SKU ${sku} NOT FOUND IN PO ${selectedPo}`);
      return;
    }

    // Validation: Quantity check
    if (quantity > poItem.expectedQty) {
      setError(`OVER-RECEIPT WARNING: Expected ${poItem.expectedQty}`);
      // In a real app, maybe allow with confirmation. For this demo, let's block or just warn.
    }

    addTransaction({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: 'PO',
      reference: selectedPo,
      sku: sku,
      qty: quantity,
      device: settings.deviceName,
      user: currentUser?.username || 'unknown'
    });

    setSuccess(`RECEIVED ${quantity} OF ${sku}`);
    setSku('');
    setQty('');
    
    // Auto clear success after 3s
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
        <h2 className="text-3xl font-black uppercase italic text-white tracking-tight">PO Receiving</h2>
      </header>

      <Card className="space-y-6">
        <div className="space-y-2">
            <label className="text-zinc-500 font-black uppercase text-xs tracking-widest">Select Purchase Order</label>
            <select 
                value={selectedPo}
                onChange={(e) => setSelectedPo(e.target.value)}
                className="w-full bg-zinc-950 border-2 border-zinc-800 text-white p-5 rounded-xl text-xl font-bold focus:border-yellow-400 appearance-none"
            >
                <option value="">-- SELECT PO --</option>
                {poList.map(po => <option key={po} value={po}>{po}</option>)}
            </select>
        </div>

        {selectedPo && (
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
                 <p className="text-zinc-500 font-black text-[10px] uppercase tracking-widest">Expected Items ({currentPoItems.length})</p>
                 <div className="flex flex-wrap gap-2">
                    {currentPoItems.map(item => (
                        <button 
                            key={item.sku} 
                            onClick={() => setSku(item.sku)}
                            className={`px-3 py-2 rounded-lg text-sm font-bold border transition-colors ${sku === item.sku ? 'bg-yellow-400 text-zinc-950 border-yellow-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800'}`}
                        >
                            {item.sku} ({item.expectedQty})
                        </button>
                    ))}
                 </div>
            </div>
        )}

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
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-orange-500 font-black uppercase text-sm tracking-wider">{error}</span>
            </div>
        )}

        {success && (
            <div className="bg-emerald-500/10 border-2 border-emerald-500 p-4 rounded-xl flex items-center gap-3">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-500 font-black uppercase text-sm tracking-wider">{success}</span>
            </div>
        )}

        <Button fullWidth onClick={handleSave} disabled={!selectedPo}>
            Confirm Receipt
        </Button>
      </Card>

      <div className="text-center">
        <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.3em]">Validation Mode: STRICT_PO_MATCH</p>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { useApp } from '../store';
import { Button, Card, Badge } from '../components/UI';

export const Sync: React.FC = () => {
  const { 
    setProducts, setPurchaseOrders, transactions, 
    clearTransactions, setView, settings 
  } = useApp();
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  const handleDownload = async () => {
    setIsSyncing(true);
    addLog('INITIATING MASTER DATA DOWNLOAD...');
    
    // Simulate fetching from serverAddress
    setTimeout(() => {
        const mockProducts = [
            { sku: 'SKU-001', description: 'Industrial Drill Press' },
            { sku: 'SKU-002', description: 'Steel Support Beam' },
            { sku: 'SKU-003', description: 'Magnetic Leveling Tool' },
            { sku: 'SKU-004', description: 'Hard Hat - Type II' },
        ];
        const mockPOs = [
            { poNumber: 'PO-2024-001', sku: 'SKU-001', expectedQty: 10 },
            { poNumber: 'PO-2024-001', sku: 'SKU-002', expectedQty: 50 },
            { poNumber: 'PO-2024-002', sku: 'SKU-003', expectedQty: 100 },
        ];

        setProducts(mockProducts);
        setPurchaseOrders(mockPOs);
        
        addLog(`SYNC SUCCESS: ${mockProducts.length} PRODUCTS LOADED`);
        addLog(`SYNC SUCCESS: ${mockPOs.length} PO LINES LOADED`);
        setIsSyncing(false);
    }, 1500);
  };

  const handleUpload = () => {
    if (transactions.length === 0) {
        addLog('UPLOAD ABORTED: NO NEW TRANSACTIONS');
        return;
    }

    setIsSyncing(true);
    addLog(`PREPARING EXPORT: ${transactions.length} RECORDS...`);

    // Simulate CSV generation
    setTimeout(() => {
        const dateStr = new Date().toISOString().split('T')[0];
        const fileName = settings.outputFormat
            .replace('{Date}', dateStr)
            .replace('{Device}', settings.deviceName);

        // Actual CSV string generation
        const headers = 'ID,Timestamp,Type,Reference,SKU,Qty,Device,User';
        const csvContent = [
            headers,
            ...transactions.map(t => `${t.id},${t.timestamp},${t.type},${t.reference},${t.sku},${t.qty},${t.device},${t.user}`)
        ].join('\n');

        // Logic to download file in browser
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        
        addLog(`UPLOAD SUCCESS: ${fileName} GENERATED`);
        clearTransactions();
        setIsSyncing(false);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('DASHBOARD')} className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 text-zinc-400">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
           </svg>
        </button>
        <h2 className="text-3xl font-black uppercase italic text-white tracking-tight">Sync Console</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={handleDownload} disabled={isSyncing} fullWidth>
            Download Master
        </Button>
        <Button onClick={handleUpload} disabled={isSyncing || transactions.length === 0} fullWidth variant="danger">
            Upload Transactions
        </Button>
      </div>

      <Card className="flex flex-col h-96">
        <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-4">
            <span className="text-zinc-500 font-black uppercase text-xs tracking-widest">System Logs</span>
            {isSyncing && <div className="animate-pulse flex items-center gap-2"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div> <span className="text-[10px] text-yellow-400 font-black uppercase tracking-widest">Active</span></div>}
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[11px] text-emerald-500">
            {log.length === 0 ? (
                <p className="text-zinc-700 italic">CONSOLE READY. AWAITING COMMANDS...</p>
            ) : (
                log.map((entry, i) => <p key={i} className={entry.includes('SUCCESS') ? 'text-emerald-400' : entry.includes('INIT') ? 'text-blue-400' : 'text-zinc-400'}>{entry}</p>)
            )}
        </div>
      </Card>

      <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-800">
        <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-widest">Remote Server: {settings.serverAddress}</p>
      </div>
    </div>
  );
};

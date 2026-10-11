import { useState } from 'react';

export default function SampleModal({ onClose, onSave, nextId }) {
  const [form, setForm] = useState({
    id: nextId, name:'', type:'Cell Therapy', owner:'E. Kim', location:'', status:'Received',
    received:new Date().toISOString().slice(0,10), due:'', priority:'Medium', lot:'', tests:[]
  });
  const update=(key,value)=>setForm(prev=>({...prev,[key]:value}));
  function submit(e){ e.preventDefault(); if(!form.name||!form.location||!form.due) return; onSave(form); }
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <form className="modal" onSubmit={submit} onMouseDown={e=>e.stopPropagation()}>
      <div className="modal-header"><div><p className="eyebrow">New record</p><h2>Add sample</h2></div><button type="button" className="icon-button" onClick={onClose}>×</button></div>
      <div className="form-grid">
        <label>Sample ID<input value={form.id} onChange={e=>update('id',e.target.value)} /></label>
        <label>Sample name<input placeholder="e.g. Stability Pull M9" value={form.name} onChange={e=>update('name',e.target.value)} /></label>
        <label>Lot / batch<input placeholder="LOT-2026-001" value={form.lot} onChange={e=>update('lot',e.target.value)} /></label>
        <label>Type<select value={form.type} onChange={e=>update('type',e.target.value)}><option>Cell Therapy</option><option>Stability</option><option>Raw Material</option><option>Microbiology</option><option>Other</option></select></label>
        <label>Owner<input value={form.owner} onChange={e=>update('owner',e.target.value)} /></label>
        <label>Priority<select value={form.priority} onChange={e=>update('priority',e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label>
        <label className="full">Storage location<input placeholder="Freezer A / R01 / B04" value={form.location} onChange={e=>update('location',e.target.value)} /></label>
        <label>Status<select value={form.status} onChange={e=>update('status',e.target.value)}><option>Received</option><option>In Testing</option><option>Complete</option><option>On Hold</option></select></label>
        <label>Received<input type="date" value={form.received} onChange={e=>update('received',e.target.value)} /></label>
        <label>Due date<input type="date" value={form.due} onChange={e=>update('due',e.target.value)} /></label>
      </div>
      <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button">Add sample</button></div>
    </form>
  </div>
}

import { useEffect, useMemo, useState } from 'react';
import { Activity, Archive, Beaker, Boxes, CalendarClock, CheckCircle2, ChevronRight, ClipboardList, FlaskConical, LayoutDashboard, Plus, Search, Snowflake, TriangleAlert } from 'lucide-react';
import SampleModal from './components/SampleModal.jsx';
import { seedActivity, seedInventory, seedSamples, storageUnits } from './data/sampleData.js';

const SAMPLE_KEY='labtracker-samples-v2', INV_KEY='labtracker-inventory-v2', ACT_KEY='labtracker-activity-v2';
const nav=[['Dashboard',LayoutDashboard],['Samples',Beaker],['Inventory',Boxes],['Storage',Snowflake],['Activity',Activity]];
function daysUntil(dateString){const today=new Date();today.setHours(0,0,0,0);return Math.ceil((new Date(`${dateString}T00:00:00`)-today)/86400000)}
function badge(status){return status.toLowerCase().replaceAll(' ','-')}

export default function App(){
  const [samples,setSamples]=useState(()=>JSON.parse(localStorage.getItem(SAMPLE_KEY)||'null')||seedSamples);
  const [inventory,setInventory]=useState(()=>JSON.parse(localStorage.getItem(INV_KEY)||'null')||seedInventory);
  const [activity,setActivity]=useState(()=>JSON.parse(localStorage.getItem(ACT_KEY)||'null')||seedActivity);
  const [tab,setTab]=useState('Dashboard'),[query,setQuery]=useState(''),[status,setStatus]=useState('All'),[showModal,setShowModal]=useState(false),[selected,setSelected]=useState(null);
  useEffect(()=>localStorage.setItem(SAMPLE_KEY,JSON.stringify(samples)),[samples]);
  useEffect(()=>localStorage.setItem(INV_KEY,JSON.stringify(inventory)),[inventory]);
  useEffect(()=>localStorage.setItem(ACT_KEY,JSON.stringify(activity)),[activity]);
  const filtered=useMemo(()=>samples.filter(s=>(status==='All'||s.status===status)&&`${s.id} ${s.name} ${s.type} ${s.owner} ${s.location} ${s.lot}`.toLowerCase().includes(query.toLowerCase())),[samples,query,status]);
  const active=samples.filter(s=>s.status!=='Complete').length, complete=samples.filter(s=>s.status==='Complete').length, dueSoon=samples.filter(s=>s.status!=='Complete'&&daysUntil(s.due)<=3).length, lowStock=inventory.filter(i=>i.quantity<=i.reorderAt).length;
  const nextId=`SMP-${Math.max(...samples.map(s=>Number(s.id.split('-')[1])||1000),1000)+1}`;
  function log(action){setActivity(prev=>[{id:Date.now(),time:'Just now',user:'E. Kim',action},...prev].slice(0,20))}
  function addSample(s){setSamples(p=>[s,...p]);log(`created ${s.id} · ${s.name}`);setShowModal(false)}
  function setSampleStatus(id,newStatus){setSamples(p=>p.map(s=>s.id===id?{...s,status:newStatus}:s));log(`changed ${id} to ${newStatus}`);setSelected(p=>p&&p.id===id?{...p,status:newStatus}:p)}
  function reset(){setSamples(seedSamples);setInventory(seedInventory);setActivity(seedActivity);setSelected(null)}

  const Stats=()=> <section className="stats-grid">
    <div className="stat"><span className="stat-icon"><Beaker size={19}/></span><div><p>Active samples</p><strong>{active}</strong><small>In current workflow</small></div></div>
    <div className="stat"><span className="stat-icon amber"><CalendarClock size={19}/></span><div><p>Due soon</p><strong>{dueSoon}</strong><small>Within 3 days</small></div></div>
    <div className="stat"><span className="stat-icon green"><CheckCircle2 size={19}/></span><div><p>Completed</p><strong>{complete}</strong><small>Closed records</small></div></div>
    <div className="stat"><span className="stat-icon red"><TriangleAlert size={19}/></span><div><p>Low stock</p><strong>{lowStock}</strong><small>At reorder threshold</small></div></div>
  </section>;

  const SampleTable=({limit})=> <div className="table-wrap"><table><thead><tr><th>Sample</th><th>Lot</th><th>Owner</th><th>Location</th><th>Status</th><th>Due</th><th></th></tr></thead><tbody>{filtered.slice(0,limit||filtered.length).map(s=><tr key={s.id} onClick={()=>setSelected(s)}><td><b>{s.name}</b><span>{s.id} · {s.type}</span></td><td>{s.lot||'—'}</td><td>{s.owner}</td><td>{s.location}</td><td><i className={`status ${badge(s.status)}`}>{s.status}</i></td><td className={daysUntil(s.due)<=3&&s.status!=='Complete'?'urgent':''}>{s.due}</td><td><ChevronRight size={16}/></td></tr>)}</tbody></table>{filtered.length===0&&<div className="empty">No samples match your filters.</div>}</div>;

  return <div className="app-shell">
    <aside className="sidebar"><div className="brand"><span><FlaskConical size={22}/></span>LabTracker</div><p className="side-label">Workspace</p>{nav.map(([name,Icon])=><button key={name} className={`nav-item ${tab===name?'active':''}`} onClick={()=>setTab(name)}><Icon size={18}/>{name}</button>)}<div className="side-grow"/><div className="profile"><div className="avatar">EK</div><div><b>Elliott Kim</b><small>QC Laboratory</small></div></div></aside>
    <main><header><div><p className="eyebrow">Laboratory operations</p><h1>{tab}</h1></div><div className="actions"><button className="secondary-button" onClick={reset}>Reset demo</button>{(tab==='Dashboard'||tab==='Samples')&&<button className="primary-button" onClick={()=>setShowModal(true)}><Plus size={17}/>Add sample</button>}</div></header>

      {tab==='Dashboard'&&<><Stats/><section className="dashboard-grid"><div className="panel wide"><div className="panel-head"><div><p className="eyebrow">Work queue</p><h2>Priority samples</h2></div><button className="link-button" onClick={()=>setTab('Samples')}>View all</button></div><SampleTable limit={4}/></div><div className="panel"><div className="panel-head"><div><p className="eyebrow">Today</p><h2>Recent activity</h2></div></div><div className="activity-list">{activity.slice(0,5).map(a=><div className="activity-row" key={a.id}><span className="activity-dot"/><div><p><b>{a.user}</b> {a.action}</p><small>{a.time}</small></div></div>)}</div></div></section><section className="storage-strip">{storageUnits.map(u=><div className="storage-mini" key={u.name}><div><p>{u.name}</p><small>{u.temp} · {u.status}</small></div><strong>{Math.round(u.used/u.capacity*100)}%</strong><div className="mini-bar"><span style={{width:`${u.used/u.capacity*100}%`}}/></div></div>)}</section></>}

      {tab==='Samples'&&<><Stats/><section className="panel"><div className="toolbar"><div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search ID, lot, owner, location..."/></div><select value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Received</option><option>In Testing</option><option>On Hold</option><option>Complete</option></select></div><SampleTable/></section></>}

      {tab==='Inventory'&&<section className="panel"><div className="panel-head"><div><p className="eyebrow">Materials</p><h2>Inventory levels</h2></div><span className="muted">Use +/− to simulate consumption</span></div><div className="inventory-grid">{inventory.map(i=>{const low=i.quantity<=i.reorderAt;return <article className="inventory-card" key={i.id}><div className="inventory-top"><div><p className="eyebrow">{i.category}</p><h3>{i.item}</h3></div><i className={`stock ${low?'low':''}`}>{low?'Reorder':'In stock'}</i></div><div className="qty"><strong>{i.quantity}</strong><span>{i.unit}</span></div><p className="muted">{i.location} · reorder at {i.reorderAt}</p><div className="qty-buttons"><button onClick={()=>{setInventory(p=>p.map(x=>x.id===i.id?{...x,quantity:Math.max(0,x.quantity-1)}:x));log(`updated inventory: ${i.item}`)}}>−</button><button onClick={()=>{setInventory(p=>p.map(x=>x.id===i.id?{...x,quantity:x.quantity+1}:x));log(`updated inventory: ${i.item}`)}}>+</button></div></article>})}</div></section>}

      {tab==='Storage'&&<section className="storage-grid">{storageUnits.map(u=><article className="panel storage-card" key={u.name}><div className="storage-head"><div><span className="round-icon"><Snowflake size={20}/></span><div><h2>{u.name}</h2><p>{u.temp}</p></div></div><i className={`stock ${u.status==='Attention'?'low':''}`}>{u.status}</i></div><div className="capacity"><div><span>Occupied</span><b>{u.used} / {u.capacity} positions</b></div><div className="capacity-bar"><span style={{width:`${u.used/u.capacity*100}%`}}/></div><small>{u.capacity-u.used} positions available</small></div></article>)}</section>}

      {tab==='Activity'&&<section className="panel"><div className="panel-head"><div><p className="eyebrow">Audit trail</p><h2>Recent changes</h2></div><span className="muted">Demo activity log</span></div><div className="audit-list">{activity.map(a=><div className="audit-row" key={a.id}><div className="audit-icon"><ClipboardList size={17}/></div><div><p><b>{a.user}</b> {a.action}</p><small>{a.time}</small></div></div>)}</div></section>}
    </main>

    {selected&&<div className="drawer-backdrop" onMouseDown={()=>setSelected(null)}><aside className="drawer" onMouseDown={e=>e.stopPropagation()}><button className="drawer-close" onClick={()=>setSelected(null)}>×</button><p className="eyebrow">Sample record</p><h2>{selected.name}</h2><p className="drawer-id">{selected.id} · {selected.lot}</p><div className="detail-grid"><div><span>Status</span><i className={`status ${badge(selected.status)}`}>{selected.status}</i></div><div><span>Priority</span><b>{selected.priority}</b></div><div><span>Owner</span><b>{selected.owner}</b></div><div><span>Due date</span><b>{selected.due}</b></div><div className="full"><span>Storage location</span><b>{selected.location}</b></div><div className="full"><span>Assigned tests</span><div className="chips">{(selected.tests||[]).map(t=><i key={t}>{t}</i>)}{(!selected.tests||!selected.tests.length)&&<small>No tests assigned</small>}</div></div></div><div className="drawer-actions"><button onClick={()=>setSampleStatus(selected.id,'In Testing')}>Start testing</button><button className="primary-button" onClick={()=>setSampleStatus(selected.id,'Complete')}>Mark complete</button></div><div className="compliance-note"><Archive size={18}/><div><b>Demo compliance record</b><p>All changes are logged locally for portfolio demonstration. This is not a validated GxP system.</p></div></div></aside></div>}
    {showModal&&<SampleModal nextId={nextId} onClose={()=>setShowModal(false)} onSave={addSample}/>} 
  </div>
}

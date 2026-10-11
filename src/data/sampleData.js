export const seedSamples = [
  { id:'SMP-1048', name:'CAR-T Final Product', type:'Cell Therapy', owner:'E. Kim', location:'Freezer A / R03 / B12', status:'In Testing', received:'2026-10-08', due:'2026-10-12', priority:'High', lot:'FP-26-1011', tests:['Identity','Viability','Sterility'] },
  { id:'SMP-1047', name:'Stability Pull M6', type:'Stability', owner:'J. Patel', location:'2–8°C / Shelf B2', status:'Received', received:'2026-10-09', due:'2026-10-15', priority:'Medium', lot:'STB-2504-M6', tests:['Appearance','pH','Potency'] },
  { id:'SMP-1045', name:'Environmental Monitoring', type:'Microbiology', owner:'E. Kim', location:'Incubator 2', status:'In Testing', received:'2026-10-07', due:'2026-10-11', priority:'High', lot:'EM-1007-A', tests:['Bioburden','ID'] },
  { id:'SMP-1041', name:'Raw Material — Buffer', type:'Raw Material', owner:'A. Rivera', location:'Room Temp / C07', status:'Complete', received:'2026-10-02', due:'2026-10-08', priority:'Low', lot:'RM-BUF-8821', tests:['Appearance','pH'] },
  { id:'SMP-1039', name:'In-Process Cell Count', type:'Cell Therapy', owner:'M. Chen', location:'Freezer B / R01 / B04', status:'On Hold', received:'2026-10-04', due:'2026-10-13', priority:'Medium', lot:'IPC-1004', tests:['Cell Count','Viability'] }
];

export const seedInventory = [
  { id:1, item:'Sterile 15 mL Tubes', category:'Consumable', quantity:84, unit:'ea', reorderAt:50, location:'Cabinet C-12' },
  { id:2, item:'Pipette Tips 200 µL', category:'Consumable', quantity:220, unit:'ea', reorderAt:100, location:'Bench Stock' },
  { id:3, item:'Trypan Blue 0.4%', category:'Reagent', quantity:2, unit:'bottles', reorderAt:2, location:'2–8°C R-04' },
  { id:4, item:'PBS 1X', category:'Reagent', quantity:6, unit:'bottles', reorderAt:3, location:'2–8°C R-03' },
  { id:5, item:'Cryoboxes', category:'Storage', quantity:12, unit:'ea', reorderAt:8, location:'Supply Room' },
  { id:6, item:'Sterile Transfer Pipettes', category:'Consumable', quantity:34, unit:'ea', reorderAt:40, location:'Cabinet C-07' }
];

export const seedActivity = [
  { id:1, time:'Today, 2:18 PM', user:'E. Kim', action:'moved SMP-1048 to In Testing' },
  { id:2, time:'Today, 11:06 AM', user:'J. Patel', action:'received SMP-1047 into 2–8°C / Shelf B2' },
  { id:3, time:'Yesterday, 4:42 PM', user:'A. Rivera', action:'completed testing for SMP-1041' },
  { id:4, time:'Oct 9, 9:13 AM', user:'M. Chen', action:'placed SMP-1039 on hold' }
];

export const storageUnits = [
  {name:'Freezer A', temp:'-80°C', used:72, capacity:96, status:'Normal'},
  {name:'Freezer B', temp:'-80°C', used:49, capacity:96, status:'Normal'},
  {name:'Cold Room 1', temp:'2–8°C', used:31, capacity:48, status:'Normal'},
  {name:'Incubator 2', temp:'37°C', used:18, capacity:24, status:'Attention'}
];

# LabTracker

A portfolio-ready laboratory operations dashboard built with React and Vite. LabTracker demonstrates sample lifecycle tracking, inventory control, storage utilization, and a lightweight activity log in a clean QC-style interface.

## Features
- Dashboard with active, due-soon, completed, and low-stock metrics
- Sample search and status filtering
- Add new sample records
- Sample detail drawer with status updates
- Inventory tracking with reorder alerts
- Storage utilization cards for freezers, cold rooms, and incubators
- Activity / audit-trail style history
- Browser persistence with `localStorage`
- Responsive layout

## Tech stack
React · Vite · JavaScript · CSS · Lucide React · localStorage

## Run locally
```bash
npm install
npm run dev
```

## Build for deployment
```bash
npm run build
```

This project is designed to deploy directly to Vercel from GitHub.

> Portfolio demo only. It is not a validated GxP/LIMS system and should not be used for regulated laboratory records.

<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->

# AIO CRM — Enterprise CRM Frontend

Production-ready React frontend for a CRM application. API-ready architecture — plug in your backend by updating `src/api/axiosClient.js` and the services under `src/api/services/`.

## Stack

React 18 · Vite · React Router DOM · Axios · React Hook Form · Yup · React Icons · React Hot Toast · SweetAlert2 · Bootstrap 5 · Chart.js · Day.js

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Default login (mock): `admin@aiocrm.com` / `admin123`

## Structure

```
src/
  api/            Axios client + service modules per resource
  components/     Reusable UI (common + charts)
  config/         App + navigation config
  context/        Auth, Theme, Sidebar providers
  data/           Mock JSON data (swap for API when backend is ready)
  hooks/          Custom hooks
  layouts/        MainLayout (app shell) + AuthLayout
  pages/          Feature pages grouped by domain
  router/         Route table + ProtectedRoute
  styles/         CSS variables, themes, global styles
  utils/          Constants, helpers, validators, storage, formatters
```

## Backend integration

1. Set `VITE_API_BASE_URL` in `.env`.
2. Each service in `src/api/services/*` already returns the shape components expect. Remove the mock-data fallbacks and let axios do the work.
3. `AuthContext` stores the JWT in `localStorage` under `aio_crm_token`; the axios interceptor attaches it as `Authorization: Bearer <token>`.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ConsumptionTable from './components/ConsumptionTable/ConsumptionTable.component';
import ChoosePlatform from './components/ChoosePlatform/ChoosePlatform.component';
import ConsumptionTables from './components/ConsumptionTables/ConsumptionTables.component';
import { GlobalContextProvider } from './context/GlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <ChoosePlatform/>,
  },
  {
    path: '/ct',
    element: <ConsumptionTables/>,
  },
  {
    path: '/ct/:consumptionTableId',
    element: <ConsumptionTable/>,
  }
])
root.render(
  <React.StrictMode>
      <GlobalContextProvider>
    <RouterProvider router={router}/>
      </GlobalContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

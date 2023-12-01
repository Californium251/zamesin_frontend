import React from 'react';
import Index from './components/index.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Index />
      <ToastContainer />
    </div>
  );
}

export default App;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './Pages/Home.jsx';
import Create from './Pages/Create.jsx';
import Gallery from './Pages/Gallery.jsx';
import Edit from './Pages/Edit.jsx';
import Details from './Pages/Details.jsx';
import Error from './Pages/Error.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="details/:id" element={<Details />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
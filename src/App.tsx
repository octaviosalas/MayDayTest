import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Importa los estilos CSS aquí

import { ThemeToggleProvider } from './store/themeContext';



function App() {
  return (
    <ThemeToggleProvider>
      <Routes>
         <Route path="/" element={<Main />} />
      </Routes>
      <ToastContainer />
    </ThemeToggleProvider>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Importa los estilos CSS aquí
import { Button } from '@mui/material';

import { ThemeToggleProvider, useThemeToggle } from './store/themeContext';

function ToggleButton() {
  const { toggleTheme, mode } = useThemeToggle();

  return (
    <Button color="inherit" onClick={toggleTheme}>
      {mode === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
    </Button>
  );
}

function App() {
  return (
    <ThemeToggleProvider>
      <ToggleButton /> {/* Añade el botón para cambiar el tema aquí */}
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <ToastContainer />
    </ThemeToggleProvider>
  );
}

export default App;

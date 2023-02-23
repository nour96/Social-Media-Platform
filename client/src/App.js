import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login.jsx';
import { Register } from './components/Register.jsx';
import { ColorContextProvider } from './context/ColorModeContext';
import { HomePage } from './pages/home.js';
import { UserProfile } from './pages/userProfile';
import { useTheme } from '@emotion/react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { EditPost } from './components/EditPost';

function Background() {
  const theme = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.margin = '0';
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, [theme.palette.background.default]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <ColorContextProvider>
        <Background />
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/:id" element={<UserProfile />} />
              <Route path="/editpost/:id" element={<EditPost />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ColorContextProvider>
    </AuthProvider>
  );
}

export default App;

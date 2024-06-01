import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// pages and components
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  console.log("API URL:", process.env.REACT_APP_API_URL);

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <div className="App">
            <BrowserRouter>
              <Navbar />
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
          </div>
    </ThemeProvider>

  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <div className="App">
            <BrowserRouter>
              <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
          </div>
    </ThemeProvider>

  );
}

export default App;

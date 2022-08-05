import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Menu from './pages/Menu';
import UserProfile from './pages/UserProfile';
import EditAccount from './pages/EditAccount';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Photos from './features/photos/Photos';

const theme = createTheme({
  status: {
    danger: '#e53e3e'
  },
  palette: {
    primary: {
      main: '#2979ff',
      darker: '#1c54b2'
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
      lighter: '#eee',
      darker: '#aaa'
    }
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffc107',
      darker: '#b28704'
    },
    neutral: {
      lighter: '#333',
      darker: '#000'
    }
  }
})

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [mobileView, setMoblieView] = useState(window.innerWidth < 600)
  let pathname = useLocation().pathname
  const [darkModeChecked, setDarkModeChecked] = useState([])

  function updateMedia() {
    setMoblieView(window.innerWidth < 600)
  }

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setCurrentUser(user))
        }
      })

    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  }, [])

  return (
    <ThemeProvider theme={darkModeChecked.includes('dark') ? darkTheme : theme}>
      <CssBaseline />

      <div className="App">
        <Header mobileView={mobileView} pathname={pathname} />

        <div className="Body">
          <Navigation mobileView={mobileView} pathname={pathname} />

          <div className="Content">
            <Switch>
              <Route path="/signup">
                <Signup onLogin={setCurrentUser} />
              </Route>
              <Route path="/login">
                <Login onLogin={setCurrentUser} />
              </Route>
              <Route path="/menu">
                <Menu currentUser={currentUser} onLogout={setCurrentUser} checked={darkModeChecked} setChecked={setDarkModeChecked} />
              </Route>
              <Route path="/users/:id">
                <UserProfile pathname={pathname} />
              </Route>
              <Route path="/add-photo">
                <h1>Add Photo</h1>
              </Route>
              <Route path="/search">
                <h1>Search</h1>
              </Route>
              <Route path="/tags">
                <h1>Tags</h1>
              </Route>
              <Route path="/edit-account">
                <EditAccount currentUser={currentUser} />
              </Route>
              <Route path="/">
                <Photos />
                {/* <Home /> */}
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App;

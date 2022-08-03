import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Navigation from './components/Navigation';
import Header from './components/Header';
import './App.css';

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
    <div className={darkModeChecked.includes('dark') ? "App dark" : "App"}>
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
            <Route path="/add">
              <h1>Add Photo</h1>
            </Route>
            <Route path="/search">
              <h1>Search</h1>
            </Route>
            <Route path="/tags">
              <h1>Tags</h1>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;

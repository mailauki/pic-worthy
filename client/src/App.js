import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
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

  const updateMedia = () => {
    setMoblieView(window.innerWidth < 600)
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)

    fetch("/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setCurrentUser(user))
        }
      })
  }, [])

  return (
    <div className="App">
      <Header mobileView={mobileView} />

      <div className="Body">
        <Navigation mobileView={mobileView} />

        <div className="Content">
          <Switch>
            <Route path="/signup">
              <Signup onLogin={setCurrentUser} />
            </Route>
            <Route path="/login">
              <Login onLogin={setCurrentUser} />
            </Route>
            <Route path="/menu">
              <Menu />
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

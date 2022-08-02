import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import Header from './components/Header';
import './App.css';

function App() {
  const [mobileView, setMoblieView] = useState(window.innerWidth < 600)

  const updateMedia = () => {
    setMoblieView(window.innerWidth < 600)
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  })

  return (
    <div className="App">
      <Header mobileView={mobileView} />

      <div className="Content">
        <Navigation mobileView={mobileView} />

        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

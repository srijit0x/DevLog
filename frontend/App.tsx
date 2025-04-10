import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import LogDisplay from './components/LogViewer';  
import CreateLogEntry from './components/AddLog'; 

const apiBaseUrl = process.env.REACT_APP_BACKEND_URL; 

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/logs">
            <LogDisplay apiBaseUrl={apiBaseUrl}/>
          </Route>
          <Route path="/add-log">
            <CreateLogEntry apiBaseUrl={apiBaseUrl}/>
          </Route>
          <Route path="/">
            <LogDisplay apiBaseUrl={apiBaseUrl}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
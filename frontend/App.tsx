import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import LogViewer from './components/LogViewer';
import AddLog from './components/AddLog';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/logs">
            <LogViewer backendURL={backendURL}/>
          </Route>
          <Route path="/add-log">
            <AddLog backendURL={backendURL}/>
          </Route>
          <Route path="/">
            <LogViewer backendURL={backendURL}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
import React from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import './App.css';
import Main from "./Main"
import Info from './Info';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Main/>
                    </Route>
                    <Route exact path="/info">
                        <Info/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

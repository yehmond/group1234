import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import thunk from "redux-thunk";
import "./App.scss";
import RBSMain from "./pages/RBSMain";
import NavBar from "./components/NavBar";
import "./App.scss";
import Home from "./pages/Home";
import StorePage from "./pages/StorePage";
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/browse"></Route>
                    <Route path="/store/:id" children={<StorePage />} />
                    <Route path="/about"></Route>
                    <Route path="/signin"></Route>
                    <Route path="/signup"></Route>
                    <Route path="/createshop">
                        <Redirect to="/createshop/register" />
                        <RBSMain />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;

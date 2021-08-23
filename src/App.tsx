import React from 'react';
import {Link, NavLink, BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Container, Navbar, Nav} from "react-bootstrap";
import {BsLightningFill, BsLightning} from 'react-icons/bs';

import Socket from "./Socket";

import './App.scss';
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import PageN from "./pages/PageN";
import TestFC from "./pages/TestFC";
import SimpleForm from "./pages/SimpleForm";

let ws = new Socket('ws://127.0.0.1:8080/ws');


interface Props {
}

interface State {
    socketOpen: boolean
}

class App extends React.Component<Props, State> {
    constructor(state: State) {
        super(state);
        this.state = {
            socketOpen: false,
        }
    }

    componentDidMount() {
        ws.onOpen = () => {
            this.setState({socketOpen: true})
        }
        ws.onClose = () => {
            this.setState({socketOpen: false})
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar bg="light" expand="lg">
                        <Link className={"navbar-brand"} to={"/"}>React-Bootstrap</Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to={"/page1"}>Page 1</NavLink>
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to={"/page2"}>Page 2</NavLink>
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to={"/page/42"}>Page 42</NavLink>
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to={"/testfc"}>Test React.FC</NavLink>
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to={"/simpleform"}>SimpleForm</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                {this.state.socketOpen && <BsLightningFill/>}
                                {!this.state.socketOpen && <BsLightning/>}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <Container>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/page1">
                            <Page1 ws={ws}/>
                        </Route>
                        <Route exact path="/page2">
                            <Page2/>
                        </Route>
                        <Route exact path="/page/:id(\d+)"
                               render={props => <PageN id={parseInt(props.match.params.id)} ws={ws}/>}/>
                        <Route exact path="/testfc">
                            <TestFC message={"Hello World"}/>
                        </Route>
                        <Route exact path="/simpleform" component={SimpleForm}/>

                        <Route>
                            <div>Not Found</div>
                        </Route>
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default App;

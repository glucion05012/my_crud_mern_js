import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/header.css';

import { Navbar,
            Nav,
         } from 'react-bootstrap';

export default class NavBar extends Component{  
    render(){
        return(
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/list">List</Nav.Link>
                    <Nav.Link href="/create">New</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
            
        )
    }
}
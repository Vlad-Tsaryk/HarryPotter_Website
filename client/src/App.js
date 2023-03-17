import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import MagicSchools from "./pages/MagicSchools";
import MagicSchoolCreate from "./pages/MagicSchoolCreate";
import MagicSchoolUpdate from "./pages/MagicSchoolUpdate";
import FacultyCreate from "./pages/FacultyCreate";
import Faculties from "./pages/Faculties";
import FacultyUpdate from "./pages/FacultyUpdate";
import Wizards from "./pages/Wizards";
import WizardCreate from "./pages/WizardCreate";
import WizardUpdate from "./pages/WizardUpdate";
import Ghosts from "./pages/Ghosts";
import GhostCreate from "./pages/GhostCreate";
import GhostUpdate from "./pages/GhostUpdate";

function App() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div><Router>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="#">Harry Potter<img src="/harry-potter.png" width="40" height="40"/></NavbarBrand>
                <NavbarToggler onClick={() => {
                    setIsOpen(!isOpen)
                }}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/magic_school">Magic schools</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/faculty">Faculties</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/wizard">Wizards</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/ghost">Ghosts</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <Routes>
                <Route path="magic_school/" element={<MagicSchools/>}/>
                <Route path="magic_school/create" element={<MagicSchoolCreate/>}/>
                <Route path="magic_school/update/:id" element={<MagicSchoolUpdate/>}/>
                <Route path="magic_school/delete/:id"/>
                <Route path="faculty/" element={<Faculties/>}/>
                <Route path="faculty/create" element={<FacultyCreate/>}/>
                <Route path="faculty/update/:id" element={<FacultyUpdate/>}/>
                <Route path="wizard/" element={<Wizards/>}/>
                <Route path="wizard/create" element={<WizardCreate/>}/>
                <Route path="wizard/update/:id" element={<WizardUpdate/>}/>
                <Route path="ghost/" element={<Ghosts/>}/>
                <Route path="ghost/create" element={<GhostCreate/>}/>
                <Route path="ghost/update/:id" element={<GhostUpdate/>}/>
            </Routes>
        </Router></div>


    );
}

export default App;

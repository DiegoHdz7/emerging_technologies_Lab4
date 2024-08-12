
import './App.css';
import Home from './components/Home';
import { Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import AddEditCourse from './components/AddEditCourse';


function App() {

  const [selectedCourse, setSelectedCourse] = useState(null);

  const appProps = {
    selectedCourse:selectedCourse,
    setSelectedCourse:setSelectedCourse
  }

   useEffect(()=>{
    document.title = 'Lab 4 - Diego Hernandez';
   },[])
  return (
    <>
    <h1  style={{ textAlign:"center" }}>Courses</h1>
   <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand  as={Link} to="/">Courses</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link}  to="/add-edit">Add Course</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>

    <Routes>
          
            <Route path="/" element={<Home appProps={appProps}/>} />   
            <Route path="/add-edit" element={<AddEditCourse appProps={appProps}/>}/>
    </Routes>


    </>
  )
}

export default App;

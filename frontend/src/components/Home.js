import {React, useRef, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { useQuery,useMutation, gql} from "@apollo/client";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
}
  from 'mdb-react-ui-kit';
  import Table from 'react-bootstrap/Table';
  import Container from 'react-bootstrap/Container';


export default function Home({appProps}) {



  const navigate = useNavigate()
  
    const courses = gql`
    {
        courses{
            _id,
          code,
          name,
          section,
          semester
        }
      }
    `

    const deleteCourseMut = gql`
    mutation DeleteCourse($_id: String!) {
      deleteCourse(_id: $_id) {
     name
      }
    }
  `;
    const { loading, error, data } = useQuery(courses);
    const [deleteCourse, {  deleteLoading,  deleteError, deleteData }] = useMutation(deleteCourseMut, {
      refetchQueries: [{ query: courses }]
    });
    
    const onEdit=(selectedCourse)=>{
      console.log("Selected course:",selectedCourse)
      
      appProps.setSelectedCourse(selectedCourse);
      navigate('/add-edit')


    }

    useEffect(()=>{
        console.log(data)
        appProps.setSelectedCourse(null);
    })


    const onDeleteCourse = (selectedCourse)=>{
      deleteCourse({
          variables: {
            _id:selectedCourse._id,
          },
        });
      console.log("data",deleteData)
      navigate('/');

  }


    if (deleteLoading) return <p>Loading...</p>;
    if (deleteError) return <p>Error :{JSON.stringify(deleteError)}</p>;

    if (loading) {return "Loading...";}

    if (error){ return `Error! ${error.message}`;}
    else {
        return (
            <Container>
            <Table striped bordered hover variant="dark" className='text-center'>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Section</th>
                    <th>Semester</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                { data.courses.map((course, index)=>{
                  return(
                  <tr  key={index}>
                    <td>{course.code}</td>
                    <td>{course.name}</td>
                    <td>{course.section}</td>
                    <td>{course.semester}</td>
                    <td><button onClick={()=>{onEdit(course)}}>Edit</button></td>
                    <td><button onClick={()=>{onDeleteCourse(course)}}>Delete</button></td>
                  
                  </tr>)
                })}
        
                </tbody>
        
                
              </Table>
        </Container>
           
          )

    }

   
   
    
 
}

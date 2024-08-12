import {React, useEffect, useRef} from 'react'
import { useQuery,useMutation , gql} from "@apollo/client";
import {useNavigate} from "react-router-dom";
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

export default function AddEditCourse({appProps}) {

    const codeRef  = useRef();
    const nameRef = useRef();
    const sectionRef = useRef();
    const semesterRef  = useRef();
    const navigate = useNavigate();

    const addCourseMut = gql`
    mutation AddCourse($name: String!,$code: String!, $section: Int!, $semester: Int!) {
      addCourse(name: $name, code:$code, section: $section, semester: $semester) {
        code
        name
        section
        semester
      }
    }
  `;

  const editCourseMut = gql`
  mutation EditCourse($_id:String!, $name: String!,$code: String!, $section: Int!, $semester: Int!) {
    updateCourse(_id:$_id, name: $name, code:$code, section: $section, semester: $semester) {
      code
      name
      section
      semester
    }
  }
`;

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


  
  

    const [addCourse, {  addLoading,  addError, addData }] = useMutation(addCourseMut,{
      refetchQueries: [{ query: courses }]
    });
    const [editCourse, { editLoading, editError, editData }] = useMutation(editCourseMut,{
      refetchQueries: [{ query: courses }]
    });

    const onAddCourse = ()=>{
      console.log("On Add...")
        addCourse({
            variables: {
              code:codeRef.current.value,
              name: nameRef.current.value,
              section: parseInt(sectionRef.current.value),
              semester: parseInt(semesterRef.current.value),
            },
          });
        console.log("data",addData)
        navigate('/');

    }

    const onEditCourse = ()=>{
      console.log("On Edit...")
      editCourse({
          variables: {
            _id:appProps.selectedCourse._id,
            code:codeRef.current.value,
            name: nameRef.current.value,
            section: parseInt(sectionRef.current.value),
            semester: parseInt(semesterRef.current.value),
          },
        });
      console.log("data",editData)
      navigate('/');

  }

  useEffect(()=>{
    console.log("Selected course:", appProps.selectedCourse)
  });

    
    if (addLoading) return <p>Loading...</p>;
    if (addError) return <p>Error :{JSON.stringify(addError)}</p>;

    if (editLoading) return <p>Loading...</p>;
    if (editError) return <p>Error :{JSON.stringify(editError)}</p>;

   



  return (
    <MDBContainer fluid style={{overflow: "auto"}}>

    <div className="p-5 bg-image"  style={{ backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px' }}></div>

    <MDBCard className=' p-5 shadow-5' style={{ width: '50%',marginTop: '-100px', marginLeft:'auto', marginRight:'auto', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
      <MDBCardBody className='p-5 text-center'>

        <h2 className="fw-bold mb-5">{ appProps.selectedCourse? "Edit Course" : "Add Course"}</h2>

        <MDBRow>
          <MDBCol col='6
          '>
            <MDBInput ref= {codeRef} wrapperClass='mb-4' label='Code' id='code' type='text' defaultValue={appProps?.selectedCourse?.code} />
          </MDBCol>
          <MDBCol col='6'>
            <MDBInput ref= {nameRef} wrapperClass='mb-4' label='Name' id='name' type='text' defaultValue={appProps?.selectedCourse?.name}  />
          </MDBCol>
          <MDBCol col='6'>
            <MDBInput ref= {sectionRef} wrapperClass='mb-4' label='section' id='section' type='number'defaultValue={appProps?.selectedCourse?.section}  />
          </MDBCol>
          <MDBCol col='6'>
            <MDBInput ref= {semesterRef} wrapperClass='mb-4' label='Semester' id='semester' type='number' defaultValue={appProps?.selectedCourse?.semester}  />
          </MDBCol>

        </MDBRow>


        {appProps.selectedCourse ?  <MDBBtn onClick={onEditCourse} className='w-100 mb-4' size='md'> Edit</MDBBtn> :
         <MDBBtn onClick={onAddCourse} className='w-100 mb-4' size='md'> Add</MDBBtn>}

      


      </MDBCardBody>



      
    </MDBCard>

  </MDBContainer>
  )
}

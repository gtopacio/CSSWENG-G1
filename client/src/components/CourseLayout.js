import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, InputGroup, Form } from 'react-bootstrap';
import "../css/CourseLayout.css";
import WebinarFile from './webinar/WebinarFile';

export default function CourseLayout({ webinar, user }) {

  const [fileToBeUploaded, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [validTypes] = useState(['application/pdf', 'image/jpg', 'image/jpeg', 'image/png']);

  const setUploadFile = (file) => {
    setErrors({});
    if(!validTypes.includes(file.type)){
      setErrors({file: "Invalid file type"});
      setFile(null);
      return;
    }
    setFile(file);
  };

  const uploadFile = async(e) => {
    if(fileToBeUploaded){
      e.preventDefault()
      
      let formData = new FormData();
      formData.append("file", fileToBeUploaded);
      formData.append("webinarID", webinar._id);
      formData.append("userID", user._id);
      let { data } = await axios.post("/api/webinar/files", formData);
      if(data.success){
        setFiles(data.files);
      }
      else{
        setErrors(data.errors);
      }
    }
  }

  useEffect(() => {
    async function getFiles(){
      let { data } = await axios.get("/api/webinar/files", {params: {webinarID: webinar._id}});
      if(data.success){
        console.log(data);
        setFiles(data.files);
      }
    }

    console.log(webinar);
    if(webinar._id){
      getFiles();
    }
  }, [webinar]);

    return (
        <div className="container" style={{maxWidth:"1050px",margin:"0 auto",display:'flex'}}>
            <main style={{textAlign:'left',borderRadius:'8px',padding:'16px',marginLeft:'8px'}}>
                <h1 id="course name">{webinar.name}</h1> 
                <h2 id="initial-header">Schedule</h2>
                <p>Insert Schedule Here</p>
                <h2 id="second-header">Professor</h2>
                <p>Insert Professor Here</p>
                <h2 id="fourth-header">Zoom Link</h2>
                <p>Insert Zoom Link</p>
                {webinar.teachers && webinar.teachers[user._id] ? 
                <InputGroup>
                  <FormControl
                    required
                    isInvalid = {!!errors.file}
                    placeholder="Profile Picture"
                    aria-label="dPicture"
                    aria-describedby="basic-addon1"
                    type="file"
                    name="file"
                    accept=".pdf, .jpg, .jpeg, .png"
                    onChange={(e) => {
                      setUploadFile(e.target.files ? e.target.files[0] : undefined)
                    }}
                    />
                    <Form.Control.Feedback type="invalid">
                    {errors.file}
                  </Form.Control.Feedback>
                    <Button onClick={uploadFile}>Upload</Button>
                </InputGroup>
                  : <></> }
                <div>
                <h3>Recent Uploads</h3>  
                  {files.map((x) => {return <WebinarFile key={x._id} file={x} />})}
                </div>  ``
            </main>
        </div>
    )
}

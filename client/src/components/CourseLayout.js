import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Nav, Navbar, Button, FormControl} from 'react-bootstrap';
import "../css/CourseLayout.css";
import WebinarFile from './webinar/WebinarFile';

export default function CourseLayout({ webinar, user }) {

  const [fileToBeUploaded, setFile] = useState(null);
  const [files, setFiles] = useState([]);

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

    if(webinar._id){
      getFiles();
    }
  }, [webinar]);

    const Headings = ({ headings, activeId }) => (
        <ul>
          {headings.map((heading) => (
            <li key={heading.id} className={heading.id === activeId ? "active" : ""}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${heading.id}`).scrollIntoView({
                    behavior: "smooth"
                  });
                }}
              >
                {heading.title}
              </a>
              {heading.items.length > 0 && (
                <ul>
                  {heading.items.map((child) => (
                    <li
                      key={child.id}
                      className={child.id === activeId ? "active" : ""}
                    >
                      <a
                        href={`#${child.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector(`#${child.id}`).scrollIntoView({
                            behavior: "smooth"
                          });
                        }}
                      >
                        {child.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      );
      
      /**
       * Dynamically generates the table of contents list, using any H2s and H3s it can find in the main text
       */
      const useHeadingsData = () => {
        const [nestedHeadings, setNestedHeadings] = React.useState([]);
      
        React.useEffect(() => {
          const headingElements = Array.from(
            document.querySelectorAll("main h2, main h3")
          );
      
          // Created a list of headings, with H3s nested
          const newNestedHeadings = getNestedHeadings(headingElements);
          setNestedHeadings(newNestedHeadings);
        }, []);
      
        return { nestedHeadings };
      };
      
      const getNestedHeadings = (headingElements) => {
        const nestedHeadings = [];
      
        headingElements.forEach((heading, index) => {
          const { innerText: title, id } = heading;
      
          if (heading.nodeName === "H2") {
            nestedHeadings.push({ id, title, items: [] });
          } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
            nestedHeadings[nestedHeadings.length - 1].items.push({
              id,
              title
            });
          }
        });
      
        return nestedHeadings;
      };
      
      const useIntersectionObserver = (setActiveId) => {
        const headingElementsRef = React.useRef({});
        React.useEffect(() => {
          const callback = (headings) => {
            headingElementsRef.current = headings.reduce((map, headingElement) => {
              map[headingElement.target.id] = headingElement;
              return map;
            }, headingElementsRef.current);
      
            // Get all headings that are currently visible on the page
            const visibleHeadings = [];
            Object.keys(headingElementsRef.current).forEach((key) => {
              const headingElement = headingElementsRef.current[key];
              if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
            });
      
            const getIndexFromId = (id) =>
              headingElements.findIndex((heading) => heading.id === id);
      
            // If there is only one visible heading, this is our "active" heading
            if (visibleHeadings.length === 1) {
              setActiveId(visibleHeadings[0].target.id);
              // If there is more than one visible heading,
              // choose the one that is closest to the top of the page
            } else if (visibleHeadings.length > 1) {
              const sortedVisibleHeadings = visibleHeadings.sort(
                (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
              );
      
              setActiveId(sortedVisibleHeadings[0].target.id);
            }
          };
      
          const observer = new IntersectionObserver(callback, { root: document.querySelector("iframe"), rootMargin: "500px" });
      
          const headingElements = Array.from(document.querySelectorAll("h2, h3"));
      
          headingElements.forEach((element) => observer.observe(element));
      
          return () => observer.disconnect();
        }, [setActiveId]);
      };
      
      /**
       * Renders the table of contents.
       */
      const TableOfContents = () => {
        const [activeId, setActiveId] = React.useState();
        const { nestedHeadings } = useHeadingsData();
        useIntersectionObserver(setActiveId);
      
        return (
          <Navbar aria-label="Table of contents" className="nav-extra" style={{height:'200px'}}>
            <Headings headings={nestedHeadings} activeId={activeId} />
          </Navbar>
        );
      };
      
      const DummyText =
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
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
                <FormControl
                  required
                  placeholder="Profile Picture"
                  aria-label="dPicture"
                  aria-describedby="basic-addon1"
                  type="file"
                  name="profilePicture"
                  accept=".pdf, .jpg, .img, .jpeg, .png"
                  onChange={(e) => {
                    setFile(e.target.files ? e.target.files[0] : null)
                  }}
                  />
                  <Button onClick={uploadFile}>Upload</Button>
                <div>
                <h3>Recent Uploads</h3>  
                  {files.map((x) => {return <WebinarFile file={x} />})}
                </div>  

            </main>
            <TableOfContents />
        </div>
    )
}

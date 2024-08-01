import React from "react";
import "./page.module.css";
import { getData } from "../../../lib/apiServices";


const page = async () => {
  const data = await getData('/api/projects');
  const projects = data.projects;
  // console.log('projects',projects);
  return (
    <div className="">
      <ol className="list-group list-group-numbered bg-transparent text-start">
        {projects.length > 0 ? (
          projects.map((item) => (
            <li
              className="list-group-item text-white-50 bg-transparent d-flex justify-content-between align-items-start py-3"
              key={item.id}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold text-white">{item.title}</div>
                {item.description}
                <span className="badge bg-secondary rounded-pill float-right">
                  {item.technologies}
                </span>{" "}
                <br />
              </div>
              {item.github_link ? (
                <a href="/" className="fs-3 nav-link">
                  <i className=" bi bi-github"></i>
                </a>
              ) : (
                ""
              )}
            </li>
          ))
        ) : (
          <li>No Projects Found</li>
        )}
        {/* Add more projects as needed */}
      </ol>
    </div>
  );
};

export default page;

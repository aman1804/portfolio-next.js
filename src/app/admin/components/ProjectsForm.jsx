"use client"
import React, { useState } from 'react';

const ProjectsForm = () => {
    const [projects, setProjects] = useState([{
        title: '',
        description: '',
        url: '',
        start_date: '',
        end_date: '',
        technologies: '',
        github_link: ''
    }]);

    const handleChange = (index, event) => {
        const values = [...projects];
        values[index][event.target.name] = event.target.value;
        setProjects(values);
    };

    const handleAddProject = () => {
        setProjects([...projects, {
            title: '',
            description: '',
            url: '',
            start_date: '',
            end_date: '',
            technologies: '',
            github_link: ''
        }]);
    };

    const handleRemoveProject = (index) => {
        const values = [...projects];
        values.splice(index, 1);
        setProjects(values);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log(projects);
    };

    return (
        <div className="container ">
            <h2>Projects Form</h2>
            <form onSubmit={handleSubmit}>
                {projects.map((project, index) => (
                    <div className="row mb-3 p-3 border rounded" key={index}>
                        <span>{projects.length > 1 && (
                                <button
                                    type="button"
                                    className="btn-close btn-close-white float-end"
                                    onClick={() => handleRemoveProject(index)}
                                >
                                </button>
                            )}</span>
                        <div className="col-md-6 form-group">
                            <label htmlFor={`title_${index}`}>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`title_${index}`}
                                name="title"
                                value={project.title}
                                onChange={(e) => handleChange(index, e)}
                                required
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor={`url_${index}`}>URL</label>
                            <input
                                type="url"
                                className="form-control"
                                id={`url_${index}`}
                                name="url"
                                value={project.url}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="col-md-12 form-group">
                            <label htmlFor={`description_${index}`}>Description</label>
                            <textarea
                                className="form-control"
                                id={`description_${index}`}
                                name="description"
                                value={project.description}
                                onChange={(e) => handleChange(index, e)}
                                rows="3"
                            ></textarea>
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor={`start_date_${index}`}>Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id={`start_date_${index}`}
                                name="start_date"
                                value={project.start_date}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor={`end_date_${index}`}>End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id={`end_date_${index}`}
                                name="end_date"
                                value={project.end_date}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor={`technologies_${index}`}>Technologies</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`technologies_${index}`}
                                name="technologies"
                                value={project.technologies}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor={`github_link_${index}`}>GitHub Link</label>
                            <input
                                type="url"
                                className="form-control"
                                id={`github_link_${index}`}
                                name="github_link"
                                value={project.github_link}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-primary mx-3"
                    onClick={handleAddProject}
                >
                    Add Project
                </button>
                <button type="submit" className="btn btn-success">Save</button>
            </form>
        </div>
    );
};

export default ProjectsForm;

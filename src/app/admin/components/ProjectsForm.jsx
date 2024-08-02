"use client"
import React, { useEffect, useState } from 'react';
import { deleteData, getData, postData } from '../../../../lib/apiServices'; // Adjust the import based on your API service
import Spinner from '../helpers/Spinner';

const ProjectsForm = ({ userId }) => {
    const [projects, setProjects] = useState([{
        title: '',
        description: '',
        url: '',
        start_date: '',
        end_date: '',
        technologies: '',
        github_link: ''
    }]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getData(`/api/projects/${userId}`); // Replace with your API endpoint
            if (response) {
                console.log(response)
                setProjects(response.projects);
            }
        } catch (error) {
            console.error('Error fetching projects data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

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

    const handleRemoveProject = async (index, projectId) => {
        if (projectId) {
            setLoading(true);
            try {
                const response = await deleteData(`/api/projects/${projectId}`); // Replace with your API endpoint
                if (response.success) {
                    alert(response.message);
                } else {
                    alert(response.error);
                }
            } catch (error) {
                console.error('Error deleting project data:', error);
                alert('An error occurred while deleting the project.');
            } finally {
                setLoading(false);
            }
        }
        const values = [...projects];
        values.splice(index, 1);
        setProjects(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await postData(`/api/projects/${userId}`, projects); // Replace with your API endpoint
            if (response) {
                alert(response.message || 'Projects saved successfully');
            }
        } catch (error) {
            console.error('Error submitting projects data:', error);
            alert('An error occurred while saving the projects.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Projects Form</h2>
            {loading && (
                <Spinner/>
            )}
            <form onSubmit={handleSubmit}>
                {projects.map((project, index) => (
                    <div className="row mb-3 p-3 border rounded" key={index}>
                        <span>
                            {projects.length > 1 && (
                                <button
                                    type="button"
                                    className="btn-close btn-close-white float-end"
                                    onClick={() => handleRemoveProject(index, project.id)}
                                >
                                </button>
                            )}
                        </span>
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

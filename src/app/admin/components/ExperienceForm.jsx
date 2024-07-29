"use client"
import React, { useState } from 'react';

const ExperienceForm = () => {
    const [experiences, setExperiences] = useState([{
        company_name: '',
        position: '',
        start_date: '',
        end_date: '',
        responsibilities: ''
    }]);

    const handleChange = (index, event) => {
        const values = [...experiences];
        values[index][event.target.name] = event.target.value;
        setExperiences(values);
    };

    const handleAddExperience = () => {
        setExperiences([...experiences, {
            company_name: '',
            position: '',
            start_date: '',
            end_date: '',
            responsibilities: ''
        }]);
    };

    const handleRemoveExperience = (index) => {
        const values = [...experiences];
        values.splice(index, 1);
        setExperiences(values);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log(experiences);
    };

    return (
        <div className="container">
            <h2>Experience Form</h2>
            <form onSubmit={handleSubmit}>
                {experiences.map((experience, index) => (
                    <div className="row mb-3 p-3 border rounded" key={index}>
                        <span>
                        {experiences.length > 1 && (
                                <button
                                    type="button"
                                    className="float-end btn-close btn-close-white"
                                    onClick={() => handleRemoveExperience(index)}
                                >
                                </button>
                            )}
                        </span>
                        <div className="col-md-6 form-group">
                            <label htmlFor={`company_name_${index}`}>Company Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`company_name_${index}`}
                                name="company_name"
                                value={experience.company_name}
                                onChange={(e) => handleChange(index, e)}
                                required
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor={`position_${index}`}>Position</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`position_${index}`}
                                name="position"
                                value={experience.position}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor={`start_date_${index}`}>Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id={`start_date_${index}`}
                                name="start_date"
                                value={experience.start_date}
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
                                value={experience.end_date}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="col-md-12 form-group">
                            <label htmlFor={`responsibilities_${index}`}>Responsibilities</label>
                            <textarea
                                className="form-control"
                                id={`responsibilities_${index}`}
                                name="responsibilities"
                                value={experience.responsibilities}
                                onChange={(e) => handleChange(index, e)}
                                rows="3"
                            ></textarea>
                        </div>
                        
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-primary mx-3"
                    onClick={handleAddExperience}
                >
                    Add Experience
                </button>
                <button type="submit" className="btn btn-success">Save</button>
            </form>
        </div>
    );
};

export default ExperienceForm;

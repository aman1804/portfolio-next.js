"use client"
import React, { useState } from 'react';

const EducationForm = () => {
    const [educations, setEducations] = useState([{
        institution: '',
        degree: '',
        field_of_study: '',
        start_date: '',
        end_date: '',
        grade: ''
    }]);

    const handleChange = (index, event) => {
        const values = [...educations];
        values[index][event.target.name] = event.target.value;
        setEducations(values);
    };

    const handleAddEducation = () => {
        setEducations([...educations, {
            institution: '',
            degree: '',
            field_of_study: '',
            start_date: '',
            end_date: '',
            grade: ''
        }]);
    };

    const handleRemoveEducation = (index) => {
        const values = [...educations];
        values.splice(index, 1);
        setEducations(values);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log(educations);
    };

    return (
        <div className="container ">
            <h2>Education Form</h2>
            <form onSubmit={handleSubmit}>
                {educations.map((education, index) => (
                    <div className="row mb-3 border rounded p-3" key={index}>
                        <span>
                        {educations.length > 1 && (
                                <button
                                    type="button"
                                    className="float-end btn-close btn-close-white"
                                    onClick={() => handleRemoveEducation(index)}
                                >
                                </button>
                            )}
                        </span>
                        <div className="col-md-4 form-group">
                            <label htmlFor={`institution_${index}`}>Institution</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`institution_${index}`}
                                name="institution"
                                value={education.institution}
                                onChange={(e) => handleChange(index, e)}
                                required
                            />
                        </div>
                        <div className="col-md-4 form-group">
                            <label htmlFor={`degree_${index}`}>Degree</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`degree_${index}`}
                                name="degree"
                                value={education.degree}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="col-md-4 form-group">
                            <label htmlFor={`field_of_study_${index}`}>Field of Study</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`field_of_study_${index}`}
                                name="field_of_study"
                                value={education.field_of_study}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="col-md-4 form-group">
                            <label htmlFor={`start_date_${index}`}>Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id={`start_date_${index}`}
                                name="start_date"
                                value={education.start_date}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="col-md-4 form-group">
                            <label htmlFor={`end_date_${index}`}>End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id={`end_date_${index}`}
                                name="end_date"
                                value={education.end_date}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="col-md-4 form-group">
                            <label htmlFor={`grade_${index}`}>Grade</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`grade_${index}`}
                                name="grade"
                                value={education.grade}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-primary mx-3"
                    onClick={handleAddEducation}
                >
                    Add Education
                </button>
                <button type="submit" className="btn btn-success">Save</button>
            </form>
        </div>
    );
};

export default EducationForm;

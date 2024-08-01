"use client"
import React, { useEffect, useState } from 'react';
import { deleteData, getData, postData } from '../../../../lib/apiServices';
import Spinner from '../helpers/Spinner';

const ExperienceForm = ({ userId }) => {
    const [experiences, setExperiences] = useState([{
        company_name: '',
        position: '',
        start_date: '',
        end_date: '',
        responsibilities: ''
    }]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getData(`/api/experiences/${userId}`);
            if (response) {
                console.log(response);
                setExperiences(response);
            }
        } catch (error) {
            console.error('Error fetching experience data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const handleRemoveExperience = async (index, experienceId) => {
        const values = [...experiences];
        if (experienceId) {
            setLoading(true);
            try {
                const response = await deleteData(`/api/experiences/${experienceId}`);
                if (response.success) {
                    alert(response.message);
                } else {
                    alert(response.error);
                    return false;
                }
            } catch (error) {
                console.error('Error deleting experience:', error);
            } finally {
                setLoading(false);
            }
        }
        values.splice(index, 1);
        setExperiences(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await postData(`/api/experiences/${userId}`, experiences);
            if (response) {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error submitting experience data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Experience Form</h2>
            {loading ? (
                <Spinner/>
            ):(
            <form onSubmit={handleSubmit}>
                {experiences.map((experience, index) => (
                    <div className="row mb-3 p-3 border rounded" key={index}>
                        <span>
                            {experiences.length > 1 && (
                                <button
                                    type="button"
                                    className="float-end btn-close btn-close-white"
                                    onClick={() => handleRemoveExperience(index, experience.id)}
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
            )}
        </div>
    );
};

export default ExperienceForm;

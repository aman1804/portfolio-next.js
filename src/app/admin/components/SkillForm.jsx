"use client"
import React, { useEffect, useState } from 'react';
import { deleteData, getData, postData } from '../../../../lib/apiServices';
import Spinner from '../helpers/Spinner';

const SkillsForm = ({ userId }) => {
    const [skills, setSkills] = useState([{ skill_name: '', proficiency_level: '' }]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getData(`/api/skills/${userId}`);
            if (response.skills && response.skills.length > 0) {
                console.log(response);
                setSkills(response.skills);
            }
        } catch (error) {
            console.error('Error fetching skills data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (index, event) => {
        const values = [...skills];
        values[index][event.target.name] = event.target.value;
        setSkills(values);
    };

    const handleAddSkill = () => {
        setSkills([...skills, { skill_name: '', proficiency_level: '' }]);
    };

    const handleRemoveSkill = async (index, skillId) => {
        const values = [...skills];
        if (skillId) {
            setLoading(true);
            try {
                const response = await deleteData(`/api/skills/${skillId}`);
                if (response.success) {
                    alert(response.message);
                } else {
                    alert(response.error);
                    return false;
                }
            } catch (error) {
                console.error('Error deleting skill:', error);
            } finally {
                setLoading(false);
            }
        }
        values.splice(index, 1);
        setSkills(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await postData(`/api/skills/${userId}`, skills);
            if (response) {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error submitting skills data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Skills Form</h2>
            {loading && (
                <Spinner/>
            )}
            <form onSubmit={handleSubmit}>
                {skills.map((skill, index) => (
                    <div className="row mb-3 p-3 border rounded" key={index}>
                        <span>
                            {skills.length > 1 && (
                                <button
                                    type="button"
                                    className="float-end btn-close btn-close-white"
                                    onClick={() => handleRemoveSkill(index, skill.id)}
                                >
                                </button>
                            )}
                        </span>
                        <div className="col-md-6 form-group">
                            <label htmlFor={`skill_name_${index}`}>Skill Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`skill_name_${index}`}
                                name="skill_name"
                                value={skill.skill_name}
                                onChange={(e) => handleChange(index, e)}
                                required
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor={`proficiency_level_${index}`}>Proficiency Level</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`proficiency_level_${index}`}
                                name="proficiency_level"
                                value={skill.proficiency_level}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-primary mx-3"
                    onClick={handleAddSkill}
                >
                    Add Skill
                </button>
                <button type="submit" className="btn btn-success">Save</button>
            </form>
        </div>
    );
};

export default SkillsForm;

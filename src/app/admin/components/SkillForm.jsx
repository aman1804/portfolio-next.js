"use client"
import React, { useEffect, useState } from 'react';
import { getData } from '../../../../lib/apiServices';

const SkillsForm = () => {
    const [skills, setSkills] = useState([{ skill_name: '', proficiency_level: '' }]);

    const fetchData = async () => {
        try {
            const response = await getData('/api/skills/1'); // Replace with your API endpoint
            if (response){
                console.log(response)
                setSkills(response.skills);
            }
        } catch (error) {
            console.error('Error fetching skills data:', error);
        }
    };


    useEffect(() => {
        // Define the getData function
        
        // Call getData when the component mounts
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

    const handleRemoveSkill = (index,skillId) => {
        const values = [...skills];
        values.splice(index, 1);
        setSkills(values);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log(skills);
    };

    return (
        <div className="container mt-">
            <h2>Skills Form</h2>
            <form onSubmit={handleSubmit}>
                {skills.map((skill, index) => (
                    <div className="row mb-3 p-3 border rounded" key={index}>
                        <span>
                        {skills.length > 1 && (
                                <button
                                    type="button"
                                    className="float-end btn-close btn-close-white"
                                    onClick={() => handleRemoveSkill(index,skill.id)}
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
                                type="number"
                                className="form-control"
                                id={`proficiency_level_${index}`}
                                name="proficiency_level"
                                value={skill.proficiency_level}
                                onChange={(e) => handleChange(index, e)}
                                min="10"
                                max="100"
                                required
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

"use client"
import React, { useState, useEffect } from 'react';
import { getData_By_userId, postData } from '../../../../lib/apiServices'; // Update with the correct import path
import { formatDateToYYYYMMDD } from '../helpers/formatDate';

async function updatePersonalInfo(userId, formData) {
    try {
        const response = await fetch(`/api/personal-info/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Update successful:', result);
        return result;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

async function savePersonalInfo(formData) {
    try {
        const response = await fetch('/api/personal-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Save successful:', result);
        return result;
    } catch (error) {
        console.error('Error saving data:', error);
        throw error;
    }
}

const PersonalInfoForm = ({ userId }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        middle_name: '',
        birthday: '',
        address: '',
        phone: '',
        website: '',
        bio: '',
        linked_in: '',
        github: '',
        profile_img: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getData_By_userId(`/api/personal-info/${userId}`);
                if (response) {
                    setFormData(response);
                    setIsEditing(true);
                    console.log(response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data.');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (isEditing) {
                await updatePersonalInfo(userId, formData);
                alert('Data updated successfully.');
            } else {
                await postData(`/api/personal-info/${userId}`,formData);
                alert('Data saved successfully.');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            setError('Error saving data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>{isEditing ? 'Edit Personal Information' : 'Personal Information Form'}</h2>
            {loading && (
                <div className="text-center mb-3">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className='row p-3 border rounded'>
                <div className="col-12">
                    <div className="row mb-3">
                        <div className="col-md-6 form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 form-group">
                            <label htmlFor="middle_name">Middle Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="middle_name"
                                name="middle_name"
                                value={formData.middle_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor="birthday">Birthday</label>
                            <input
                                type="date"
                                className="form-control"
                                id="birthday"
                                name="birthday"
                                value={ formatDateToYYYYMMDD(formData.birthday)}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12 form-group">
                            <label htmlFor="address">Address</label>
                            <textarea
                                className="form-control"
                                id="address"
                                name="address"
                                rows={3}
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor="website">Website</label>
                            <input
                                type="url"
                                className="form-control"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12 form-group">
                            <label htmlFor="bio">Bio</label>
                            <textarea
                                className="form-control"
                                id="bio"
                                name="bio"
                                rows={3}
                                value={formData.bio}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 form-group">
                            <label htmlFor="linked_in">LinkedIn</label>
                            <input
                                type="url"
                                className="form-control"
                                id="linked_in"
                                name="linked_in"
                                value={formData.linked_in}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor="github">GitHub</label>
                            <input
                                type="url"
                                className="form-control"
                                id="github"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12 form-group">
                            <label htmlFor="profile_img">Profile Image URL</label>
                            <input
                                type="url"
                                className="form-control"
                                id="profile_img"
                                name="profile_img"
                                value={formData.profile_img}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {isEditing ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInfoForm;

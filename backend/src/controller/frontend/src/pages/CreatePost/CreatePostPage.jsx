import React, { useState } from 'react';
import { createPost } from '../../services/PostApi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import CustomButton from '../../components/CustomButton';
import './CreatePostPage.css';

function CreatePostPage() {
    const navigate = useNavigate(); // Hook for navigating
    const [postData, setPostData] = useState({
        title: '',
        description: '',
        courseName: '',
        lookingFor: 0,
        modeOfCommunication: '',
        tags: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === 'lookingFor') {
            newValue = parseInt(value);
        }
        setPostData({
            ...postData,
            [name]: newValue
        });
    };

    const handleTagInput = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the form from being submitted
            if (e.target.value.trim() !== '') {
                setPostData({
                    ...postData,
                    tags: [...postData.tags, e.target.value.trim()] // Also trim to remove unnecessary spaces
                });
                e.target.value = ''; // Clear the input after adding the tag
            }
        }
    };

    const removeTag = (indexToRemove) => {
        setPostData({
            ...postData,
            tags: postData.tags.filter((_, index) => index !== indexToRemove)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createPost(postData.title, postData.description, postData.courseName, postData.lookingFor, postData.modeOfCommunication, postData.tags);

        if (!response) {
            alert('500: Internal Sever Error');
        } else if (response.status === 400 || response.status === 401 || response.status === 404 || response.status === 500) {
            alert(`error ${response.status}: ${response.message}`);
        } else {
            navigate('/feed');
        }
    };

    const handleCancel = () => {
        navigate('/feed'); // Navigate back to the feed page
    };

    return (
        <div className="create-post-page">
            <h1>Create Post</h1>
            <div className="header-actions">
                <CustomButton variant="cancel" onClick={handleCancel}>Cancel Post</CustomButton>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Post title</label>
                <input type="text" id="title" name="title" value={postData.title} onChange={handleInputChange} />

                <label htmlFor="description">Post description</label>
                <textarea id="description" name="description" value={postData.description} onChange={handleInputChange} />

                <label htmlFor="courseName">Course name (e.g. "CIS 3500")</label>
                <input type="text" id="courseName" name="courseName" value={postData.courseName} onChange={handleInputChange} />

                <label htmlFor="lookingFor">How many group members are you looking for?</label>
                <input type="number" id="lookingFor" name="lookingFor" value={postData.lookingFor} onChange={handleInputChange} />

                <label>Mode of communication</label>
                <div>
                    <input type="radio" id="irl" name="modeOfCommunication" value="IRL" onChange={handleInputChange} />
                    <label htmlFor="irl">IRL</label>

                    <input type="radio" id="online" name="modeOfCommunication" value="Online" onChange={handleInputChange} />
                    <label htmlFor="online">Online</label>

                    <input type="radio" id="dontCare" name="modeOfCommunication" value="Don't care" onChange={handleInputChange} />
                    <label htmlFor="dontCare">Don't care</label>
                </div>

                <label htmlFor="tags">Tags</label>
                <input type="text" id="tags" onKeyPress={handleTagInput} />
                <div className="tags-container">
                    {postData.tags.map((tag, index) => (
                        <div key={index} className="tag">
                            {tag} <span onClick={() => removeTag(index)}>x</span>
                        </div>
                    ))}
                </div>

                <button type="submit">Create post</button>
            </form>
        </div>
    );
}

export default CreatePostPage;

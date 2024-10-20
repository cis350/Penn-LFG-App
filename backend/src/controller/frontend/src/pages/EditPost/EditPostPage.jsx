import React, { useState, useEffect } from 'react';
import { deletePost, updatePost, getPost } from '../../services/PostApi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import CustomButton from '../../components/CustomButton';
import './EditPostPage.css';
/**
 * EditPostPage Component
 * This component is responsible for editing an existing post. It fetches the post data using the getPost function
 * from PostApi based on the current post ID stored in localStorage. Users can update the post's title, description,
 * course name, number of collaborators they are looking for, mode of communication, and tags.
 * The state of the form is managed using the useState hook, and changes are submitted to the backend via the updatePost function.
 * Users can navigate away using the useNavigate hook from react-router-dom.
 */

function EditPostPage() {
    const navigate = useNavigate(); // Hook for navigating
    const currentPostID = localStorage.getItem('posts');
    const [postData, setPostData] = useState({
        title: '',
        description: '',
        courseName: '',
        lookingFor: 0,
        modeOfCommunication: '',
        tags: []
    });

    useEffect(() => {
        async function fetchPost(currentPostID) {
            try {
                const result = await getPost(currentPostID);
                const post = result.post;
                setPostData({
                    title: post.title,
                    description: post.description,
                    courseName: post.course,
                    lookingFor: post.lookingFor,
                    modeOfCommunication: post.modeOfCollab,
                    tags: post.tags || []
                });
            } catch (error) {
                console.error("Failed to update the post:", error);
            }
        }
        fetchPost(currentPostID);
    }, [currentPostID]);

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
        const response = await updatePost(currentPostID, postData.title, postData.description, postData.courseName, postData.lookingFor, postData.modeOfCommunication, postData.tags);

        if (!response) {
            alert('500: Internal Sever Error');
        } else if (response.status === 400 || response.status === 401 || response.status === 404 || response.status === 500) {
            alert(`error ${response.status}: ${response.message}`);
        } else {
            navigate('/feed');
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await deletePost(currentPostID);
        if (!response) {
            alert('500: Internal Sever Error');
        } else if (response.status === 400 || response.status === 401 || response.status === 404 || response.status === 500) {
            alert(`error ${response.status}: ${response.message}`);
        } else {
            navigate('/account');
        }
    };

    return (
        <div className="create-post-page">
            <h1>Edit Post</h1>
            <div className="header-actions">
                <CustomButton variant="cancel" onClick={handleDelete}>Delete Post</CustomButton>
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

                <button type="submit">Confirm changes</button>
            </form>
        </div>
    );
}

export default EditPostPage;

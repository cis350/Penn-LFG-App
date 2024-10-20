import React, { useState, useEffect } from 'react';
import PostCardComponent from '../../components/Feed/PostCardComponent.jsx';
import './AccountPage.css'; 
import { getMyFeed } from '../../services/FeedApi.js';
import { useNavigate } from 'react-router-dom'; 

/**
 * AccountPage Component
 * This component is responsible for displaying the user's posts on their account page.
 * It fetches the posts from the backend using the getMyFeed service and displays them using the PostCardComponent.
 * Users can also navigate to edit their posts by clicking on the edit button in the PostCardComponent.
 */

function AccountPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const currentUser = localStorage.getItem('username');

  useEffect(() => {
    const fetchUserPosts = async () => {
      let userPosts = await getMyFeed(); 
      if (userPosts && Array.isArray(userPosts)) {
        setPosts(userPosts);
      } else {
        console.error('Failed to fetch user posts:', userPosts);
        setPosts([]); 
      }
    };
    
    fetchUserPosts();
  }, [currentUser]);

  const handleEditPost = (postId) => {
    localStorage.setItem('posts', postId);
    navigate('/edit-post');
  };

  return (
    <div className="account-page">
      <h1 className="account-header">My LFG Posts</h1>
      {posts.map((post, index) => (
        <PostCardComponent
          key={index}
          username={post.owner}
          title={post.title}
          description={post.description}
          tags={post.tags}
          course={post.course}
          groupSize={post.lookingFor}
          collabMode={post.modeOfCollab}
          time={post.createdAt}
          onEdit={() => handleEditPost(post['_id'])} 
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}

export default AccountPage;
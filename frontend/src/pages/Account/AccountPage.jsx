import React, { useState, useEffect } from 'react';
import PostCardComponent from '../../components/Feed/PostCardComponent.jsx';
import './AccountPage.css'; 
import FeedApi from '../../services/FeedApi.js';
import { useNavigate } from 'react-router-dom'; 

function AccountPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const currentUser = localStorage.getItem('username');

  useEffect(() => {
    const fetchUserPosts = async () => {
      let userPosts = await FeedApi.getMyFeed(); 
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
      <h1 className="account-header">My Posts</h1>
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
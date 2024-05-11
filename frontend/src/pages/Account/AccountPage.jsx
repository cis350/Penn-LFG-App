import React, { useState, useEffect } from 'react';
import PostCardComponent from '../../components/Feed/PostCardComponent.jsx';
import './AccountPage.css'; // Assume similar styling to FeedPage.css
import getMyFeed from '../../services/FeedApi.js';

function AccountPage() {
  const [posts, setPosts] = useState([]);
  const currentUser = "testUser";

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
  }, []);

  const handleEditPost = (postId) => {
    console.log('Editing post:', postId); // Placeholder logic
    // You might set a state here to open an edit modal or form
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
          onEdit={() => handleEditPost(post.id)} 
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}

export default AccountPage;
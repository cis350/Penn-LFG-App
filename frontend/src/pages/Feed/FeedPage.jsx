// FeedPage.jsx
import React, { useState, useEffect } from 'react';
import PostCardComponent from '../../components/Feed/PostCardComponent.jsx'
import './FeedPage.css';

function FeedPage() {
  const [posts, setPosts] = useState([
    { username: 'testUser',
      title: 'test group title',
      description: 'description title',
      tags: ['tag1', 'tag2'],
      course: 'CIS 3500',
      lookingFor: 2,
      modeOfCollab: 'in-person'
    }
  ]);

  // Placeholder for fetching data from the backend
  useEffect(() => {
    // Fetch data here, and set it with setPosts
    // Example: axios.get('/api/posts').then(response => setPosts(response.data))
  }, []);

  return (
    <div className="feed-page">
            <h1 className="feed-header">My Feed</h1> {/* Apply class to header */}
            {posts.map((post, index) => (
                <PostCardComponent
                    key={index}
                    username={post.username}
                    title={post.title}
                    description={post.description}
                    tags={post.tags}
                    course={post.course}
                    groupSize={post.lookingFor}
                    collabMode={post.modeOfCollab}
                />
            ))}
        </div>
  );
}

export default FeedPage;

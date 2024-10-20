import React, { useState, useEffect } from 'react';
import PostCardComponent from '../../components/Feed/PostCardComponent.jsx'
import './FeedPage.css';
import { getFeed } from '../../services/FeedApi.js';

/**
 * FeedPage Component
 * This component is responsible for fetching the posts from the backend and displaying them on the feed page.
 * It uses the getFeed function from FeedApi to fetch the posts and stores them in a state variable called posts.
 * The posts are then displayed using the PostCardComponent.
 */
function FeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let feedArray = await getFeed();
      if (feedArray && Array.isArray(feedArray)) {
        setPosts(feedArray);
      } else {
        console.error('Failed to fetch posts:', feedArray);
        setPosts([]);
      }
    };
    
    fetchPosts();
  }, []);

  return (
    <div className="feed-page">
      <h1 className="feed-header">Explore LFG Posts</h1>
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
        />
      ))}
    </div>
  );
}

export default FeedPage;

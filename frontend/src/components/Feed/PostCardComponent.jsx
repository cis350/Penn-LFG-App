// PostCardComponent.jsx
import React from 'react';
import './css/PostCardComponent.css';

function PostCardComponent({ username, title, description, tags, course, groupSize, collabMode }) {
  return (
    <div className="post-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <p><strong>Course:</strong> {course}</p>
      <p><strong>Group Size:</strong> {groupSize}</p>
      <p><strong>Collaboration Mode:</strong> {collabMode}</p>
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <span className="posted-by">Posted by: {username}</span>
    </div>
  );
}

export default PostCardComponent;

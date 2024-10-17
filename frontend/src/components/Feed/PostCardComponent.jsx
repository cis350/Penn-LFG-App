// PostCardComponent.jsx
import React from 'react';
import './css/PostCardComponent.css';
import CustomButton from '../CustomButton';

function convertToEST(dateString) {
  const date = new Date(dateString);
  const options = { timeZone: 'America/New_York', hour12: true, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const estDateTime = date.toLocaleString('en-US', options);
  return estDateTime;
}

function PostCardComponent({ username, title, description, tags, course, groupSize, collabMode, time, onEdit, currentUser }) {

  const isOwner = username === currentUser;

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
      <span className="posted-on">Posted on: {convertToEST(time)}</span>
      {isOwner && <CustomButton variant="edit" onClick={onEdit}>Edit</CustomButton>}
    </div>
  );
}

export default PostCardComponent;

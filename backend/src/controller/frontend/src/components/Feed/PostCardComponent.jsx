// PostCardComponent.jsx
import React from 'react';
import './css/PostCardComponent.css';
import moment from 'moment-timezone';
import CustomButton from '../CustomButton';

function convertToEST(dateString) {
  return moment(dateString).tz("America/New_York").format('MM/DD/YYYY hh:mm:ss A');
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

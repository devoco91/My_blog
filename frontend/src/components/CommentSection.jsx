import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './comment.css';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/comments/?post=${postId}`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [postId]);

  const handleAddComment = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    axios.post('http://localhost:8000/api/comments/', {
      post: postId,
      text: newComment,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setComments([response.data, ...comments]);
        setNewComment('');
      })
      .catch(error => console.error('Error adding comment:', error));
  };

  return (
    <div className="comments">
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p><strong>{comment.author_name}</strong> on {new Date(comment.created_date).toLocaleString()}</p>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;

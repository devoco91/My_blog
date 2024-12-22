import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from './CommentSection';
import './post.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${id}/`)
      .then(response => setPost(response.data))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  const handleLike = () => {
    const token = localStorage.getItem('access');
    axios.post(`http://localhost:8000/api/posts/${id}/like/`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setPost({ ...post, likes_count: response.data.likes_count }))
      .catch(error => console.error('Error liking post:', error));
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail">
  <img src={post.image_url} alt={post.title} className="post-detail-image" />
  <h1>{post.title}</h1>
  <p>{post.text}</p>


  <video controls className="post-detail-video">
        <source src={post.video_url} type="video/mp4" />
        Your browser does not support the video tag.
    </video>
  <button onClick={handleLike}>Like ({post.likes_count})</button>
  <CommentSection postId={id} />
</div>
  );
};

export default PostDetail;

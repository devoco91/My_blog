import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState({ category: '', tag: '', search: '' });

  useEffect(() => {
    axios.get('http://localhost:8000/api/posts/')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
    axios.get('http://localhost:8000/api/categories/')
      .then(response => setCategories(response.data));
    axios.get('http://localhost:8000/api/tags/')
      .then(response => setTags(response.data));
  }, []);

  const applyFilter = () => {
    axios.get('http://localhost:8000/api/posts/', { params: filter })
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error applying filter:', error));
  };

  return (
    <div className="home-page">
      <h1>Blog Posts</h1>
      <div className="filters">
        <select onChange={e => setFilter({ ...filter, category: e.target.value })}>
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <select onChange={e => setFilter({ ...filter, tag: e.target.value })}>
          <option value="">All Tags</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search..."
          onChange={e => setFilter({ ...filter, search: e.target.value })}
        />
        <button onClick={applyFilter}>Apply Filter</button>
      </div>
      <ul>
  {posts.map(post => (
    <li key={post.id}>
      <img src={post.image_url} alt={post.title} className="post-image" />
      <h2>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      <p>{post.text.slice(0, 100)}...</p>
    </li>
  ))}
</ul>

    </div>
  );
};

export default HomePage;

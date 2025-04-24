import React from 'react';
import './Loading.css';
import { UI } from './constants';

function Loading({ message }) {
  return (
    <div className="restaurant-loading-container">
      <div className="restaurant-loading-spinner"></div>
      <p className="restaurant-loading-message">{message || UI.LOADING.DEFAULT}</p>
    </div>
  );
}

export default Loading;
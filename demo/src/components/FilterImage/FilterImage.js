import React, { Component } from 'react';
import './FilterImage.css';

function FilterImage(props) {
  const { imageUrl } = props;

  return (
    <div className="filter-image">
      <img src={imageUrl} alt="" />
    </div>
  );
}

export default FilterImage;

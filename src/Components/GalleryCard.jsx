import React from 'react';

const GalleryCard = ({ name, speed, color, onEditClick, onDeleteClick }) => {
  const imageSrc = `src/assets/${color?.toLowerCase()}.png`;

  return (
    <div className="gallery-card">
      <img src={imageSrc} alt={`${color} crewmate`} className="crewmate-img" />
      
      <div className="crewmate-info-row">
        <span className="info-label">Name of Crewmate:</span>
        <span className="info-value">{name}</span>
      </div>
      
      <div className="crewmate-info-row">
        <span className="info-label">Speed of Crewmate:</span>
        <span className="info-value">{speed} mph</span>
      </div>
      
      <div className="crewmate-info-row">
        <span className="info-label">Color of Crewmate:</span>
        <span className="info-value">{color}</span>
      </div>
      
      <div className="card-actions">
        <button className="edit-btn" onClick={onEditClick}>Edit</button>
        <button className="delete-btn" onClick={onDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default GalleryCard;
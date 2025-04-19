import React from 'react';

const CreateCard = ({ title, type, placeholder, name, options, value, onChange }) => {
  return (
    <div className="card">
      <div className="input-card">
        <h4>{title}</h4>

        {type === "radio" && options ? (
          <div className="radio-list">
            {options.map((option) => (
              <label key={option.value} className="radio-item">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                />
                <span
                  className={option.value === "Rainbow" ? "rainbow-text" : ""}
                  style={option.value !== "Rainbow" ? { color: option.color } : {}}
                >
                  {option.value}
                </span>
              </label>
            ))}
          </div>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

export default CreateCard;

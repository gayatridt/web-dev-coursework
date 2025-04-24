import './Error.css';

function Error({ message, onClose }) {
  return (
    <div className="restaurant-error-container">
      <div className="restaurant-error-content">
        <p className="restaurant-error-message">{message}</p>
        <button className="restaurant-error-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default Error;
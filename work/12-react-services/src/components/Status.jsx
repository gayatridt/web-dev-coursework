import { MESSAGES } from '../constants';
import './Status.css'; 

function Status({ error }) {
  const message = MESSAGES[error] || MESSAGES.default;
  return (
    <div className="status">
      {message}
    </div>
  );
}

export default Status;

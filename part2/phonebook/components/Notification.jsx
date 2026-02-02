const Notification = ({ message, error }) => {
  if (error) {
    return <div className="error">{message}</div>;
  } else if (message !== null) {
    return <div className="notification">{message}</div>;
  } else {
    return null;
  }
};

export default Notification;

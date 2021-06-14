const Notification = ({ message }) => {
  if (message.text === null) {
    return null;
  }

  return <div className={message.class}>{message.text}</div>;
};

export default Notification;

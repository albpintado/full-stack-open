const Notification = ({ message }) => {
  return message.text === null ? "" : <div className={message.class}>{message.text}</div>;
};

export default Notification;

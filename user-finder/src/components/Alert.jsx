const Alert = ({ children, color }) => {
  const alertStyle = {
    color: color,
  };

  return (
    <div className="alert" style={alertStyle}>
      <h3>{children}</h3>
    </div>
  );
};

export default Alert;

import React from 'react';
import Alert from 'react-bootstrap/Alert';

const ErrorMessage = ({ message }) => {
  return (
    <Alert variant="danger" className="w-100 text-center">
      {message || 'Something went wrong.'}
    </Alert>
  );
};

export default ErrorMessage;

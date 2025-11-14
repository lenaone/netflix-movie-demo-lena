import React from 'react'
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
      <Spinner animation="border" variant="danger" role="status" style={{ width: '4rem', height: '4rem' }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default LoadingSpinner
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authContext } from '../contexts/Authcontext';

const VerifyAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyAccount, verifyingAccount, verificationData } = useContext(authContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        if (token) {
          await verifyAccount(token);
        } else {
          setError('No verification token provided');
        }
      } catch (err) {
        setError(err.message || 'Verification failed');
        // console.error('Verification error:', err);
      }
    };

    verify();
  }, [token, verifyAccount]);

  // Redirect on successful verification
  useEffect(() => {
    if (verificationData?.success) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [verificationData, navigate]);

  if (error) {
    return (
      <div>
        <h1>Verification Error</h1>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Account Verification</h1>
      {verifyingAccount ? (
        <div>
          <p>Verifying your account...</p>
          <div className="spinner"></div> {/* Add CSS for spinner */}
        </div>
      ) : (
        <div>
          <p style={{
            color: verificationData?.success ? 'green' : 'red',
            fontSize: '1.2rem',
            margin: '1rem 0'
          }}>
            {verificationData?.message}
          </p>
          {verificationData?.success && (
            <p style={{color: 'white', fontSize: '1.2rem'}}>You will be redirected to login shortly...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyAccount;
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const AuthSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('accessToken', token);

      navigate('/');
    } else {
      navigate('/login?error=auth_failed');
    }
  }, [searchParams, navigate]);

  return <div>Loading...</div>;
};

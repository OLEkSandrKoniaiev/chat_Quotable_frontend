import { useState, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { userService } from '../services/user.service.ts';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { accessToken } = await userService.login({ email, password });

      localStorage.setItem('accessToken', accessToken);
      navigate('/');
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Login failed. Please try again.');
      } else {
        setError('An unknown error occurred.');
      }
      setIsLoading(false);
    }
  };

  const googleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className={styles.loginPageContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <input
          type="email"
          placeholder="Email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        <button type="submit" className={styles.loginButton} disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
        <button
          type="button"
          className={styles.createButton}
          onClick={() => navigate('/register')}
          disabled={isLoading}
        >
          Create account
        </button>

        <hr className={styles.divider} />

        <button
          type="button"
          className={styles.googleButton}
          onClick={googleLogin}
          disabled={isLoading}
        >
          Enter with Google
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

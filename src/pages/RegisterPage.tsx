import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';

import { userService } from '../services/user.service.ts';
import styles from './RegisterPage.module.css';

interface IValidationErrors {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  general: string | null;
}

const parseApiErrors = (errors: string[]): IValidationErrors => {
  const fieldErrors: IValidationErrors = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    general: null,
  };

  for (const error of errors) {
    if (error.startsWith('firstName')) fieldErrors.firstName = error;
    else if (error.startsWith('lastName')) fieldErrors.lastName = error;
    else if (error.startsWith('email')) fieldErrors.email = error;
    else if (error.startsWith('password')) fieldErrors.password = error;
    else fieldErrors.general = error;
  }
  return fieldErrors;
};

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validationErrors, setValidationErrors] = useState<IValidationErrors>({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    general: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!firstName || !email || !password) {
      setValidationErrors((prev) => ({
        ...prev,
        general: 'First name, email, and password are required.',
      }));
      return;
    }

    setIsLoading(true);
    setValidationErrors({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      general: null,
    });

    try {
      const { accessToken } = await userService.register({
        firstName,
        lastName: lastName || undefined,
        email,
        password,
      });

      localStorage.setItem('accessToken', accessToken);
      navigate('/');
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        const data = err.response.data;

        if (data.errors && Array.isArray(data.errors)) {
          setValidationErrors(parseApiErrors(data.errors));
        } else if (data.error) {
          setValidationErrors((prev) => ({ ...prev, general: data.error }));
        } else {
          setValidationErrors((prev) => ({ ...prev, general: 'Registration failed.' }));
        }
      } else {
        setValidationErrors((prev) => ({ ...prev, general: 'An unknown error occurred.' }));
      }
      setIsLoading(false);
    }
  };

  const googleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className={styles.registerPageContainer}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {validationErrors.general && (
          <div className={styles.generalErrorMessage}>{validationErrors.general}</div>
        )}

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="First Name *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isLoading}
            className={validationErrors.firstName ? styles.inputError : ''}
          />
          <div className={styles.validationMessage}>{validationErrors.firstName}</div>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Last Name (optional)"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isLoading}
            className={validationErrors.lastName ? styles.inputError : ''}
          />
          <div className={styles.validationMessage}>{validationErrors.lastName}</div>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className={validationErrors.email ? styles.inputError : ''}
          />
          <div className={styles.validationMessage}>
            {validationErrors.email || 'e.g., user@example.com'}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className={validationErrors.password ? styles.inputError : ''}
          />
          <div className={styles.validationMessage}>
            {validationErrors.password || '8-64 chars, incl. A, a, 1, @'}
          </div>
        </div>

        <button type="submit" className={styles.registerButton} disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <button
          type="button"
          className={styles.loginButton}
          onClick={() => navigate('/login')}
          disabled={isLoading}
        >
          I have an account
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

export default RegisterPage;

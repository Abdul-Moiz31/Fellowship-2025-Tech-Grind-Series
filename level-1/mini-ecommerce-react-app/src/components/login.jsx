'use client';

import { z as zod } from 'zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../hooks/use-auth-hook';
import { setSession } from '../context/auth/util';

import { CONFIG } from '../config-global';

// ----------------------------------------------------------------------

const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Must be a valid email!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

const DUMMY_EMAIL = 'royalsheryar505@gmail.com';
const DUMMY_PASSWORD = 'password123';
const DUMMY_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MjQyNjIyfQ.FK0XATZqlw6FDOx9x7mrp29ITQqY8_HCE7RcZiPPETU';

// ----------------------------------------------------------------------

export function JwtSignInView() {
  const { checkUserSession, authenticated } = useAuthContext();
  const navigate = useNavigate();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    if (authenticated) {
      navigate('/');
    }
  }, [authenticated, navigate]);

  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      if (data.email === DUMMY_EMAIL && data.password === DUMMY_PASSWORD) {
        setSession(DUMMY_TOKEN);
        await new Promise((res) => setTimeout(res, 300));
        await checkUserSession?.();
        // router.push(CONFIG.auth.redirectPath);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      setErrorMsg(error.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto' }}>
      <h2>Account Sign In</h2>
      <p>Welcome back to your existing account at {CONFIG.site.name}</p>

      {errorMsg && (
        <p style={{ color: 'red', marginTop: 10 }}>{errorMsg}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            style={{ width: '100%', padding: 8 }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register('password')}
            type="password"
            placeholder="********"
            style={{ width: '100%', padding: 8 }}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <input
          type="submit"
          value={isSubmitting ? 'Signing In...' : 'Sign In'}
          style={{
            padding: 10,
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          disabled={isSubmitting}
        />
      </form>

      <div style={{ marginTop: 40, textAlign: 'center', fontSize: 12, color: '#888' }}>
        <p>Copyright © All Rights Reserved</p>
        <p>{CONFIG.site.name} {currentYear}</p>
      </div>
    </div>
  );
}

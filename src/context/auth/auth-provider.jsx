'use client';

import { useMemo, useEffect, useCallback } from 'react';
import { useSetState } from '../../hooks/use-set-state';

import { STORAGE_KEY } from './constant/access-token';
import { AuthContext } from '../auth-context';
import { setSession, isValidToken } from './util';

// Dummy Data
const DUMMY_USER = {
  id: '12345',
  name: 'John Doe',
  email: 'royalsheryar505@gmail.com',
  role: 'admin',
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MjQyNjIyfQ.FK0XATZqlw6FDOx9x7mrp29ITQqY8_HCE7RcZiPPETU',
  permissions: ['read:products', 'write:products', 'read:users'],
};

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({
    user: null,
    loading: true,
    permissions: [],
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        console.log("accessToken", accessToken);
        setSession(accessToken);

        // Simulate API delay
        await new Promise((res) => setTimeout(res, 500));

        setState({
          user: { ...DUMMY_USER },
          loading: false,
          permissions: DUMMY_USER.permissions,
        });
      } else {
        setState({ user: null, loading: false, permissions: [] });
      }
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false, permissions: [] });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      permissions: state.permissions,
    }),
    [checkUserSession, state.user, state.permissions, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

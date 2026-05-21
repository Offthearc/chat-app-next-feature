import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProtectedRoute } from '../components/Layout/ProtectedRoute';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../contexts/AuthContext';

describe('ProtectedRoute', () => {
  it('renders children when user is authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'u1' } as never,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );
    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  it('redirects to /login when not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });
    render(
      <MemoryRouter initialEntries={['/chat']}>
        <ProtectedRoute>
          <div>Protected content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
  });
});

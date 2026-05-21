import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RegisterPage } from '../pages/RegisterPage';

const mockRegister = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    register: mockRegister,
    currentUser: null,
    loading: false,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderPage() {
    return render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );
  }

  it('renders display name, email, and password fields', () => {
    renderPage();
    expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('calls register with all fields and navigates on success', async () => {
    mockRegister.mockResolvedValue(undefined);
    renderPage();
    fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secret123' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('alice@test.com', 'secret123', 'Alice');
      expect(mockNavigate).toHaveBeenCalledWith('/chat');
    });
  });

  it('shows error on registration failure', async () => {
    mockRegister.mockRejectedValue(new Error('Email already in use'));
    renderPage();
    fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: 'Bob' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'bob@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass123' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    await waitFor(() => {
      expect(screen.getByText('Email already in use')).toBeInTheDocument();
    });
  });
});

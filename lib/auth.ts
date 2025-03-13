import Cookies from 'js-cookie';

// Mock credentials - in a real app, these would be in a secure database
const MOCK_USERS = {
  admin: {
    email: 'admin@tryalma.ai',
    password: 'admin123',
    role: 'admin' as const,
    name: 'Admin User',
  },
  user: {
    email: 'user@tryalma.ai',
    password: 'user123',
    role: 'user' as const,
    name: 'Regular User',
  },
};

export interface AuthUser {
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export async function login(email: string, password: string): Promise<AuthUser | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = Object.values(MOCK_USERS).find(
    u => u.email === email && u.password === password
  );

  if (user) {
    // Set auth cookies
    Cookies.set('auth-token', 'mock-jwt-token', { expires: 7 });
    Cookies.set('user-role', user.role, { expires: 7 });
    return user;
  }

  return null;
}

export async function logout() {
  Cookies.remove('auth-token');
  Cookies.remove('user-role');
}

export async function getUser(): Promise<AuthUser | null> {
  const token = Cookies.get('auth-token');
  const role = Cookies.get('user-role');
  
  if (!token || !role) {
    return null;
  }

  // In a real app, we would validate the token and fetch user data
  const mockUser = role === 'admin' ? MOCK_USERS.admin : MOCK_USERS.user;
  return mockUser;
}
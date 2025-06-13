import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                SoulID
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      router.pathname === '/dashboard'
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/mint"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      router.pathname === '/mint'
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Mint Credential
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      router.pathname === '/login'
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      router.pathname === '/register'
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Register
                  </Link>
                  <Link
                    href="/verify"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      router.pathname === '/verify'
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Verify
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
} 
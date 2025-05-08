import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../PageCSS/authLogin.css';

function AuthLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password,
//       });

//       // Navigate to dashboard if login is successful
//       navigate('/dashboard');
//     } catch (err) {
//       const errorMsg = err.response?.data?.msg || 'Login failed';
//       alert(errorMsg);
//     }
//   };
const handleLoginSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  return (
    <div className="login-app-container">
      <div className="login-form-container">
        <div className="login-connection-status">Connected</div>

        <div className="login-form-content">
          <h1>Authority Login</h1>
          <p className="login-subtitle">Enter your credentials to sign in</p>

          <form className="login-form" onSubmit={handleLoginSubmit}>
            <div className="login-form-group">
              <label htmlFor="email">
                E-mail <span className="login-required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-form-group">
              <label htmlFor="password">
                Password <span className="login-required">*</span>
              </label>
              <div className="login-password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="••••••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="login-toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-submit-button">
              Log in
            </button>
          </form>

          <p className="login-note">
            Don’t have an account?
            <Link to="/signup" className="login-signup-link">
              Create one
            </Link>
          </p>
        </div>
      </div>

      <div className="login-image-container">
        {/* Background image handled via CSS */}
      </div>
    </div>
  );
}

export default AuthLogin;

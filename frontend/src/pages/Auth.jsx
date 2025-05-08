import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Imported Axios
import '../PageCSS/Auth.css';

function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.fullname.value)
    console.log(e.target.username.value)
    console.log(e.target.email.value)
    console.log(e.target.password.value)
    const fullName = e.target.fullname.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        fullName,
        username,
        email,
        password
      });

      console.log(res.data);
      alert("Registered successfully!");
      navigate('/login');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Something went wrong';
      alert(errorMsg); // ✅ Display error in popup
    }
  };

  return (
    <div className="auth-app-container">
      <div className="auth-login-container">
        <div className="auth-connection-status">Connected</div>

        <div className="auth-login-content">
          <h1>Create an account</h1>
          <p className="auth-subtitle">To continue, fill out your personal info</p>

          <form className="auth-login-form" onSubmit={handleSubmit}> {/* ✅ Add onSubmit */}
            <div className="auth-form-group">
              <label htmlFor="fullname">Full name <span className="auth-required">*</span></label>
              <input type="text" id="fullname" name="fullname" placeholder="Name Surname" required />
            </div>

            <div className="auth-form-group">
              <label htmlFor="username">Username <span className="auth-required">*</span></label>
              <input type="text" id="username" name="username" placeholder="best_wizard42" required />
            </div>

            <div className="auth-form-group">
              <label htmlFor="email">E-mail <span className="auth-required">*</span></label>
              <input type="email" id="email" name="email" placeholder="email@email.com" required />
            </div>

            <div className="auth-form-group">
              <label htmlFor="password">Password <span className="auth-required">*</span></label>
              <div className="auth-password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  className="auth-toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="confirmPassword">Repeat password <span className="auth-required">*</span></label>
              <div className="auth-password-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  className="auth-toggle-password"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="auth-terms-container">
              <p>
                By clicking Continue, you agree to our <a href="#">Terms and Conditions</a>, and confirm you have read our <a href="#">Privacy Policy</a>.
              </p>
            </div>

            <button type="submit" className="auth-sign-up-button">Sign up</button>
          </form>

          <p
            onClick={() => navigate('/login')}
            style={{
              marginTop: '20px',
              color: '#5d4aec',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Already have an account? Log in
          </p>
        </div>
      </div>

      <div className="auth-image-container">
        {/* Background image styled with CSS */}
      </div>
    </div>
  );
}

export default Auth;

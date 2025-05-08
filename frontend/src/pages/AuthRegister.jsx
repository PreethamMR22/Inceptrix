import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../PageCSS/AuthRegister.css';

function AuthRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      alert("Passwords do not match");
      return;
    }

    formData.append("certificate", certificate);

    try {
      await axios.post("http://localhost:5000/api/auth/authority-register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="auth-register-container">
      <div className="auth-image-section" />
      <div className="auth-form-section">
        <h1>Authority Registration</h1>
        <p className="subtitle">Verify your official credentials</p>

        <form onSubmit={handleSubmit}>
          <label>
            Full Name <span className="required">*</span>
            <input type="text" name="name" required placeholder="Officer Name" />
          </label>
          <label>
  Email <span className="required">*</span>
  <input type="email" name="email" required placeholder="example@domain.com" />
</label>
          <label>
            Rank <span className="required">*</span>
            <input type="text" name="rank" required placeholder="Designation / Rank" />
          </label>

          <label>
            Appointment Certificate <span className="required">*</span>
            <input type="file" accept=".pdf,.jpg,.png" required onChange={(e) => setCertificate(e.target.files[0])} />
            {certificate && <span className="file-info">Uploaded: {certificate.name}</span>}
          </label>

          <label>
            Date of Appointment <span className="required">*</span>
            <input type="date" name="appointmentDate" required />
          </label>

          <label>
            Issuing Authority <span className="required">*</span>
            <input type="text" name="issuingAuthority" required placeholder="Department / Officer" />
          </label>

          <label>
            Password <span className="required">*</span>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} name="password" required placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <label>
            Confirm Password <span className="required">*</span>
            <div className="password-wrapper">
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required placeholder="••••••••" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <p className="terms">
            By continuing, you accept our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
          </p>

          <button type="submit" className="submit-btn">Register</button>

          <p className="switch-link" onClick={() => navigate("/authority-login")}>
            Already have an account? Log in
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthRegister;

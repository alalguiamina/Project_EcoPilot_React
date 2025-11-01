import { KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import emailIcon from "../Assests/email.png";
import passwordIcon from "../Assests/password.png";
import logo from "../Assests/logo.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      console.log("Email:", email);
      console.log("Password:", password);
      navigate("/dashboard");
    } else {
      alert("Veuillez remplir tous les champs");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="App Logo" className="logo" />
      <div className="underline"></div>

      <div className="inputs">
        <div className="input">
          <img src={emailIcon} alt="email icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className="input">
          <img src={passwordIcon} alt="password icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>

      <div className="forgot-password">
        Lost Password? <span>Click Here</span>
      </div>

      <div className="submit-container">
        <div className="submit" onClick={handleLogin}>
          Login
        </div>
      </div>
    </div>
  );
};

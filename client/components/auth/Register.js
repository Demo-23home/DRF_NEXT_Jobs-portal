import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const { loading, error, isAuthenticated, register, clearErrors } =
    useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (isAuthenticated && !loading) {
      router.push("/");
    }
  }, [isAuthenticated, error, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    register({ username, password, first_name, last_name, email });
  };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/images/signup.svg" alt="register" layout="fill" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> SIGN UP</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    required
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="inputBox">
                  <i aria-hidden className="fas fa-user-tie"></i>
                  <input
                    type="text"
                    placeholder="Enter Last name"
                    required
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="inputBox">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    required
                    value={email}
                    pattern="\S+@\S+\.\S+"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Enter Your Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                  />
                </div>
              </div>
              <div className="registerButtonWrapper">
                <button type="submit" className="registerButton">
                  {loading ? "Loading..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

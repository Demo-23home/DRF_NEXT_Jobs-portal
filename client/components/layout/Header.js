import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const logoutHandler = () => {
    logout();
  };
  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="30" height="30" src="/images/logo.png" alt="Logo" />
            </div>
            <span className="logo1">Job</span>
            <span className="logo2">bee</span>
          </div>
        </Link>

        <div className="btnsWrapper">
          <Link href="/employeer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>
          {user ? (
            <div className="btn dropdown ml-3">
              <button
                className="btn dropdown-toggle mr-4"
                type="button"
                id="dropDownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hi, {user.first_name}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <li>
                  <Link href="/employer/jobs" className="dropdown-item">
                    My Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/user/applied" className="dropdown-item">
                    Jobs Applied
                  </Link>
                </li>
                <li>
                  <Link href="/user" className="dropdown-item">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/upload/resume" className="dropdown-item">
                    Upload Resume
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="dropdown-item text-danger"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

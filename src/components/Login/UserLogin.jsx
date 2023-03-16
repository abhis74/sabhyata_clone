import React, { useState } from "react";
import styles from "./Login.module.css";

const UserLogin = ({ userloginstate, close_popUp }) => {
  const [userNunmerInput, setUserNunmerInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [userData, setUserData] = useState({});
  const userNunmer = (event) => {
    setUserNunmerInput(event.target.value);
    console.log(setUserNunmerInput(event.target.value));
  };
  const password = (event) => {
    setPasswordInput(event.target.value);
    console.log(setPasswordInput(event.target.value));
  };
  const submitData = (event) => {
    event.preventDefault();
    console.log(userNunmerInput);
    console.log(passwordInput);

    if (userNunmerInput !== "" && passwordInput !== "") {
      const info = { Number: userNunmerInput, passw: passwordInput };
      setUserData(info, "info");
      console.log(userData, "userData");
      console.log(setUserData(info), "setUserData(info)");

      console.log(info, "info");

      close_popUp();
      setUserNunmerInput("");
      setPasswordInput("");
    } else {
      alert("Please enter all the details");
    }
  };

  return (
    <>
      {userloginstate && (
        <div>
          <div id={styles.myModal} className={styles.modal}>
            <div className={styles.modal__content}>
              <span className={styles.close} onClick={close_popUp}>
                &times;
              </span>
              <div className="container">
                <div className="row">
                  <p>
                    If you are already registered with us, then choose from
                    below:
                  </p>
                </div>
                <form onSubmit={submitData}>
                  <label htmlFor="userNumber"> Login With Number </label>
                  <input
                    type="tel"
                    name="userNumber"
                    id="userNumber"
                    placeholder="User Number"
                    value={userNunmerInput}
                    onChange={userNunmer}
                  />

                  <label htmlFor="passw"> Password </label>
                  <input
                    type="text"
                    name="passw"
                    id="passw"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={password}
                  />
                  <button type="submit" className={styles.btn}>
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserLogin;

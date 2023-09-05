import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    console.log("====================================");
    console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log("====================================");
    console.log(result);
    console.log("====================================");
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Email or password is incorrect");
    }
  };

  return (
    <div classNameName="login">
      <div>
        {/* <!-- Section: Design Block --> */}
        <section className="text-center">
          {/* <!-- Background image --> */}
          <div
            className="p-5 bg-image"
            style={{
              backgroundImage:
                "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
              height: 300,
            }}
          ></div>
          {/* <!-- Background image --> */}

          <div
            className="card mx-4 mx-md-5 shadow-5-strong"
            style={{
              marginTop: -100,
              background: "hsla(0, 0%, 100%, 0.8)",
              // backdropFilter: "blur(30)"
            }}
          >
            <div className="card-body py-5 px-md-5">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold mb-5">Log In</h2>

                  {/* <!-- Email input -->  */}
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" for="form3Example3">
                      Email address
                    </label>
                  </div>

                  {/* <!-- Password input --> */}
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" for="form3Example4">
                      Password
                    </label>
                  </div>

                  {/* <!-- Submit button --> */}
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="btn btn-primary btn-block mb-4"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Section: Design Block --> */}
      </div>
    </div>
  );
}

export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }

  }, []);

  const collectedData = async () => {
    console.log(name, email, password);

    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    navigate('/');

    result = await result.json();
    console.log("result", result);

    localStorage.setItem("user", JSON.stringify(result))
  };

  return (
    <>
      <div>
        {/* <!-- Section: Design Block --> */}
        <section className="text-center">
          {/* <!-- Background image --> */}
          <div className="p-5 bg-image" style={{
            backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
            height: 300
          }}
          ></div>
          {/* <!-- Background image --> */}

          <div className="card mx-4 mx-md-5 shadow-5-strong" style={{
            marginTop: -100,
            background: "hsla(0, 0%, 100%, 0.8)",
            // backdropFilter: "blur(30)"
          }}
          >
            <div className="card-body py-5 px-md-5">

              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold mb-5">Sign Up</h2>
                  <form>
                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                    <div className="row">
                      <div className="mb-4">
                        <div className="form-outline">
                          <input type="text"
                            className="form-control"
                            id="name"
                            onChange={(e) => setName(e.target.value)} />
                          <label className="form-label" for="form3Example1">First name</label>
                        </div>
                      </div>

                    </div>

                    {/* <!-- Email input -->  */}
                    <div className="form-outline mb-4">
                      <input type="email"
                        className="form-control"
                        id="email"
                        described="emailHelp"
                        onChange={(e) => setEmail(e.target.value)} />
                      <label className="form-label" for="form3Example3">Email address</label>
                    </div>

                    {/* <!-- Password input --> */}
                    <div className="form-outline mb-4">
                      <input type="password"
                        className="form-control"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)} />
                      <label className="form-label" for="form3Example4">Password</label>
                    </div>



                    {/* <!-- Submit button --> */}
                    <button type="button"
                      className="btn btn-primary ms-5"
                      onClick={() => {
                        if (name !== "" & email !== "" & password !== "") {
                          collectedData();
                        }
                        else {
                          alert("Enter details properly");
                        }
                      }}>
                      Sign Up
                    </button>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Section: Design Block --> */}
      </div >
    </>
  );
}

export default SignUp;

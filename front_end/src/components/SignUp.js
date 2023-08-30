import React, { useState } from "react";

function SignUp(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const collectedData = () => {
    console.log(name, email, password);
  };
  return (
    <>
      <div className="align-content-center">
        <h1 className="m-5">Register</h1>
        <form>
          <div className="m-5">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control w-25"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="m-5">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control w-25"
              id="email"
              described="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="m-5">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control w-25"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary ms-5" onClick={collectedData}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;

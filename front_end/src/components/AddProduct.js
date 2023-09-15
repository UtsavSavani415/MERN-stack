import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;

    const result = fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    console.log("====================================");
    console.log(await result);
    navigate("/");
  };

  return (
    <div className="p-5 col-6" style={{ height: "90vh" }}>
      <h1>Add product</h1>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
          <input
            type="name"
            className="form-control"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {error && !name && (
            <span className="text-danger">Enter valid name</span>
          )}
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Price</label>
        <div className="col-sm-10">
          <input
            type="number"
            className="form-control"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          {error && !price && (
            <span className="text-danger">Enter valid price</span>
          )}
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Category</label>
        <div className="col-sm-10">
          <input
            type="name"
            className="form-control"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          {error && !category && (
            <span className="text-danger">Enter valid category</span>
          )}
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Company</label>
        <div className="col-sm-10">
          <input
            type="name"
            className="form-control"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
          {error && !company && (
            <span className="text-danger">Enter valid company</span>
          )}
        </div>
      </div>

      <button type="submit" className="btn btn-primary" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.log(params.id);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);

    console.log("result", name);
  };

  const updateProduct = async () => {
    console.log(name, price, category, company, params.id);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };

  return (
    <div className="p-5 col-6" style={{ height: "90vh" }}>
      <h1>Update product</h1>

      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
          <input
            type="name"
            className="form-control"
            defaultValue={name}
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
            defaultValue={price}
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
            defaultValue={category}
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
            defaultValue={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
          {error && !company && (
            <span className="text-danger">Enter valid company</span>
          )}
        </div>
      </div>

      <button type="submit" className="btn btn-primary" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
}

export default UpdateProduct;

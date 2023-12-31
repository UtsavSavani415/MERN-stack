import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./productList.css";

function ProductList(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
    console.log("result of deletion", result);
  };

  const searchHandler = async (event) => {
    console.log("search value", event.target.value);
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      result = await result.json();

      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <>
      <div className="m-5 d-flex flex-column align-items-center justify-content-center">
        <h3 className="d-flex justify-content-center">Product list</h3>

        {/* Search bar code */}
        <div class="container pb-4">
          <div class="row height d-flex justify-content-center align-items-center">
            <div class="col-md-6">
              <div class="form">
                <i class="fa fa-search"></i>
                <input
                  type="text"
                  class="form-control form-input"
                  onChange={searchHandler}
                  placeholder="Search for the product..."
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row align-items-center ps-5">
          {products.length > 0 ? (
            products.map((item, index) => (
              <>
                <div className="card m-4 col-3" key={item._id}>
                  <img
                    src="https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2022/03/placeholder.png"
                    className="card-img"
                    alt="..."
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h4 className="card-title">{item.name}</h4>
                      <h5 className="card-title text-success">
                        {item.price} rs
                      </h5>
                    </div>
                    <h5 className="card-title">Brand:- {item.company}</h5>
                    <h5 className="card-title">Category:- {item.category}</h5>
                  </div>
                  <div className="d-flex justify-content-between p-2 ">
                    <button type="button" class="btn btn-dark">
                      <Link
                        className="text-white noDecoration"
                        to={"/update/" + item._id}
                      >
                        Update
                      </Link>
                    </button>
                    <button
                      onClick={() => deleteProduct(item._id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            ))
          ) : (
            <h1>No Record Found</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductList;

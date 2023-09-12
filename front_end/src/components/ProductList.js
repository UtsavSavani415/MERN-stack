import React, { useEffect, useState } from "react";

function ProductList(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
    console.log("result of deletion", result);
  };
  console.log(products);
  return (
    <>
      <div className="m-5 d-flex flex-column align-items-center justify-content-center">
        <h3 className="d-flex justify-content-center">Product list</h3>

        {products.map((item, index) => (
          <>
            <div className="card mb-4 col-4" key={item._id}>
              <img
                src="https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2022/03/placeholder.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title">{item.name}</h4>
                  <h5 className="card-title text-success">{item.price} rs</h5>
                </div>
                <h5 className="card-title">Brand:- {item.company}</h5>
                <h5 className="card-title">Category:- {item.category}</h5>
              </div>
              <button
                onClick={() => deleteProduct(item._id)}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default ProductList;

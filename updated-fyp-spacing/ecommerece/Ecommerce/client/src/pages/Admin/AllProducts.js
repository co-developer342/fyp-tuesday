import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-product');
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - All Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Products</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {products.map((p) => (
                <div className="col" key={p._id}>
                  <Link to={`/dashboard/admin/products/${p.slug}`} className='product-link'>
                    <div className="card">
                      <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;

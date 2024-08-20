// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import AdminMenu from '../../components/Layout/AdminMenu'
// import { useEffect, useState } from 'react'
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useNavigate,useParams } from 'react-router-dom';
// import{Select}from 'antd'
// const {Option}=Select;

// const UpdateProduct = () => {
//     const navigate=useNavigate()
//     const params=useParams();
//     const [categories,setCategories]=useState([])
//     const [category,setCategory]=useState("")
//     const [photo,setPhoto]=useState("");
//     const [name,setName]=useState("");
//     const [description,setDescription]=useState("");
//     const [quantity,setQuantity]=useState("");
//     const [price,setPrice]=useState("");
//     const [shipping,setShipping]=useState("");
//     const [id,setId]=useState('')
//     const getSingleProduct = async () => {
//         try {
//           const { data } = await axios.get(
//             `/api/v1/product/get-product/${params.slug}`
//           );
//           setName(data.product.name);
//           setId(data.product._id);
//           setDescription(data.product.description);
//           setPrice(data.product.price);
//           setPrice(data.product.price);
//           setQuantity(data.product.quantity);
//           setShipping(data.product.shipping);
//           setCategory(data.product.category._id);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//  useEffect(() => {
//     getSingleProduct();
//     // eslint-disable-next-line
//   },[]);
//     const getAllCategory = async () => {
//         try {
//           const { data } = await axios.get("/api/v1/category/all-category");
//           if (data?.success) {
//             setCategories(data?.category);
//           }
//         } catch (error) {
//           console.log(error);
//           toast.error("Something Went wring in getting category");
//         }
//       };
//       const handleDelete=async(e)=>{
//         e.preventDefault();
//         try {
//             const answer=window.prompt('Are you sure to delete this product?')
//             console.log("hogia");
//             if (!answer) return;
//              await axios.delete (`/api/v1/product/delete-product/${id}`)
//             toast.success('Product deleted Succesfully')
//             navigate('/dashboard/admin/products')
//         } catch (error) {
//             toast.error("Something Went wring in deleting ");
//         }
//       }
//       const handleUpdate = async (e) => {
//         e.preventDefault();
//         try {
//           const productData = new FormData();
//           productData.append("name", name);
//           productData.append("description", description);
//           productData.append("price", price);
//           productData.append("quantity", quantity);
//           photo && productData.append("photo", photo);
//           productData.append("category", category);
//           const { data } = axios.put(
//             `/api/v1/product/update-product/${id}`,
//             productData
//           );
//           if (data?.success) {
//             toast.error(data?.message);
//           } else {
//             toast.success("Product Updated Successfully");
//             navigate("/dashboard/admin/products");
//           }
//         } catch (error) {
//           console.log(error);
//           toast.error("something went wrong");
//         }
//       };

//       useEffect(() => {
//         getAllCategory();
//       },[]);
//   return (
//     <Layout title={"Dashboard - All Products"}>
//     <div className="container-fluid m-3 p-3">
//       <div className="row">
//         <div className="col-md-3">
//           <AdminMenu />
//         </div>
//         <div className="col-md-9">
//           <h1>Update Products</h1>
//           <div className='m-1 w-100'>
//                <Select  style={{ border: 'none'}} placeholder="Select Category" size='Large' showSearch className='form-select mb-3' value={category} onChange={(value)=>{setCategory(value)}} >
//                {categories?.map( (c) => (

//                 <Option key={c._id} value={c._id}>
//                  {c.name}
//                  </Option>

//                ))}

//                </Select>
//                <div className='mb-3'>
//                 <label  className='btn btn-outline-secondary col-md-12'>
//                 {photo ? photo.name : "Upload Photo"}
//                 <input type='file' name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0]) } hidden/>

//                 </label>
//                </div>
//                <div className='mb-3'>
//                {photo ? (
//                   <div className="text-center">
//                     <img
//                       src={URL.createObjectURL(photo)}
//                       alt="product_photo"
//                       height={"200px"}
//                       className="img img-responsive"
//                     />
//                   </div>
//                 ) : (
//                   <div className="text-center">
//                     <img
//                       src={`/api/v1/product/product-photo/${id}`}
//                       alt="product_photo"
//                       height={"200px"}
//                       className="img img-responsive"
//                     />
//                   </div>
//                 )}
//                </div>
//                <div className='mb-3'>

//                 <input type='text' value={name} placeholder='Write a name' className='form-control' onChange={(e)=>{setName(e.target.value)}}/>

//                </div>
//                <div className='mb-3'>

//                 <input type='text' value={description} placeholder='Write a desctiption' className='form-control' onChange={(e)=>{setDescription(e.target.value)}}/>

//                </div>
//                <div className='mb-3'>

//                 <input type='text' value={price} placeholder='Write a price' className='form-control' onChange={(e)=>{setPrice(e.target.value)}}/>

//                </div>
//                <div className='mb-3'>

//                 <input type='text' value={quantity} placeholder='Write a quantity' className='form-control' onChange={(e)=>{setQuantity(e.target.value)}}/>

//                </div>
//                <Select
//                   bordered={false}
//                   placeholder="Select Shipping "
//                   size="large"
//                   showSearch
//                   className="form-select mb-3"
//                   onChange={(value) => {
//                     setShipping(value);
//                   }}
//                   value={shipping ? "yes" : "No"}
//                 >
//                   <Option value="0">No</Option>
//                   <Option value="1">Yes</Option>
//                 </Select>
//            <div className='mb-3'>
//             <button className='btn btn-primary' onClick={handleUpdate }> Update Product</button>
//            </div>
//            <div className='mb-3'>
//             <button className='btn btn-danger' onClick={handleDelete }> Delete Product</button>
//            </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </Layout>
//   )
// }

// export default UpdateProduct
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [attributes, setAttributes] = useState([
    { key: "", values: [{ value: "", price: "" }] },
  ]);
  const [id, setId] = useState("");

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  // Fetch the product details
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      setAttributes(
        data.product.attributes || [
          { key: "", values: [{ value: "", price: "" }] },
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Handle product update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("attributes", JSON.stringify(attributes));

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Handle attribute changes
  const handleAttributeChange = (
    attrIndex,
    key,
    valueIndex,
    value,
    price = null
  ) => {
    const newAttributes = [...attributes];
    if (key === "key") {
      newAttributes[attrIndex].key = value;
    } else {
      if (price !== null) {
        newAttributes[attrIndex].values[valueIndex].price = price;
      } else {
        newAttributes[attrIndex].values[valueIndex].value = value;
      }
    }
    setAttributes(newAttributes);
  };

  // Add new attribute field
  const addAttributeField = () => {
    setAttributes([
      ...attributes,
      { key: "", values: [{ value: "", price: "" }] },
    ]);
  };

  // Add new value field to an attribute
  const addValueField = (index) => {
    const newAttributes = [...attributes];
    newAttributes[index].values.push({ value: "", price: "" });
    setAttributes(newAttributes);
  };

  // Delete an attribute field
  const deleteAttributeField = (attrIndex) => {
    const newAttributes = [...attributes];
    newAttributes.splice(attrIndex, 1);
    setAttributes(newAttributes);
  };

  // Delete a value field from an attribute
  const deleteValueField = (attrIndex, valueIndex) => {
    const newAttributes = [...attributes];
    newAttributes[attrIndex].values.splice(valueIndex, 1);
    if (newAttributes[attrIndex].values.length === 0) {
      newAttributes[attrIndex].values.push({ value: "", price: "" });
    }
    setAttributes(newAttributes);
  };

  // Toggle price field for a value
  const togglePriceField = (attrIndex, valueIndex) => {
    const newAttributes = [...attributes];
    newAttributes[attrIndex].values[valueIndex].showPriceField =
      !newAttributes[attrIndex].values[valueIndex].showPriceField;
    setAttributes(newAttributes);
  };

  // Fetch data on component mount
  useEffect(() => {
    getAllCategory();
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-100">
              <Select
                style={{ border: "none" }}
                placeholder="Select Category"
                size="large"
                showSearch
                className="form-select mb-3"
                value={category}
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height="200px"
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height="200px"
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={price}
                  placeholder="Write a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={quantity}
                  placeholder="Write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <Select
                style={{ border: "none" }}
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setShipping(value)}
                value={shipping ? "YES" : "NO"}
              >
                <Option value="true">YES</Option>
                <Option value="false">NO</Option>
              </Select>
              <div className="mb-3">
                <h4>Product Attributes</h4>
                {attributes.map((attr, attrIndex) => (
                  <div key={attrIndex} className="mb-2">
                    <div className="d-flex mb-2 align-items-center">
                      <input
                        type="text"
                        value={attr.key}
                        placeholder="Key"
                        className="form-control mr-2"
                        style={{ width: "45%" }}
                        onChange={(e) =>
                          handleAttributeChange(
                            attrIndex,
                            "key",
                            0,
                            e.target.value
                          )
                        }
                      />
                      <CloseOutlined
                        className="ml-2"
                        style={{
                          cursor: "pointer",
                          fontSize: "16px",
                          color: "white",
                          backgroundColor: "red",
                          borderRadius: "50%",
                          padding: "2px",
                        }}
                        onClick={() => deleteAttributeField(attrIndex)}
                      />
                    </div>
                    {attr.values.map((val, valIndex) => (
                      <div
                        key={valIndex}
                        className="d-flex mb-2 align-items-center"
                      >
                        <input
                          type="text"
                          value={val.value}
                          placeholder="Value"
                          className="form-control mr-2"
                          style={{ width: "45%" }}
                          onChange={(e) =>
                            handleAttributeChange(
                              attrIndex,
                              "value",
                              valIndex,
                              e.target.value
                            )
                          }
                        />
                        {val.showPriceField && (
                          <input
                            type="number"
                            value={val.price}
                            placeholder="Price"
                            className="form-control mr-2"
                            style={{ width: "25%" }}
                            onChange={(e) =>
                              handleAttributeChange(
                                attrIndex,
                                "price",
                                valIndex,
                                null,
                                e.target.value
                              )
                            }
                          />
                        )}
                        <button
                          className="btn btn-primary mr-2"
                          onClick={() => togglePriceField(attrIndex, valIndex)}
                        >
                          {val.showPriceField ? "Hide Price" : "Add Price"}
                        </button>
                        <CloseOutlined
                          className="ml-2"
                          style={{
                            cursor: "pointer",
                            fontSize: "16px",
                            color: "white",
                            backgroundColor: "red",
                            borderRadius: "50%",
                            padding: "2px",
                          }}
                          onClick={() => deleteValueField(attrIndex, valIndex)}
                        />
                      </div>
                    ))}
                    <button
                      className="btn btn-secondary mb-2"
                      onClick={() => addValueField(attrIndex)}
                    >
                      Add Value
                    </button>
                  </div>
                ))}
                <button
                  className="btn btn-secondary mb-3"
                  onClick={addAttributeField}
                >
                  Add Attribute
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;

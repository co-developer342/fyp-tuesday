import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName]=useState("")
  const [visible,setVisible]=useState(false)
  const [updatedName,setupdatedName]=useState("")
  const [selected, setSelected] = useState(null);
  //handle form
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
        const {data}=await axios.post('/api/v1/category/creat-category',{name})
        if(data?.success){
            toast.success(`${name} is created`)
        }
        else{
            toast.error(data.message)
            getAllCategory()
        }
    } catch (error) {
        console.log(error);
        toast.error('Something Went Wrong')
    }
  }
  const handleUpdate=async (e)=>{
    e.preventDefault()
    try {
        const {data}=await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName})
        if(data?.success){
            toast.success(`${updatedName} is updated`)
            setSelected(null)
            setupdatedName("")
            setVisible(false)
            getAllCategory()
        }
        else{
            toast.error(data.message)
           
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
    }
  }
  const handleDelete=async (id)=>{
    
    try {
        const {data}=await axios.delete(`/api/v1/category/delete-category/${id}`)
        if(data?.success){
            toast.success(`Category is deleted`)
            
            
            getAllCategory()
        }
        else{
            toast.error(data.message)
           
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
    }
  }
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wring in getting category");
    }
  };

 
  useEffect(() => {
    getAllCategory();
  },[]);
  return (
    <Layout title={"Dashboard - All Categories"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
             <CategoryForm handleSubmit={handleUpdate} value={updatedName} setValue={setupdatedName}/>

            </Modal>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>

            </div>
            <div className="w-75">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                   {categories?.map(c=>(
                    <>
                  <tr key={c._id}>

                    <td >{c.name}</td>
                    <td>
                        <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true); setupdatedName(c.name); setSelected(c)}}>Edit</button>
                        <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}} >Delete</button>
                    </td>
                  </tr>
                    </>
                   ))}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;

import slugify from "react-slugify";
import categoryModel from "../models/categoryModel.js";

export const CreateCategoryController=async (req,res)=>{
try {
    const {name}=req.body;
    if(!name){
        return res.status(401).send({message:'Name is required'})

    }
    const existingCategory=await categoryModel.findOne({name})
    if(existingCategory){
        return res.status(200).send({
            success:true,
            message:'Category Already Exists'
        })
    }
    const category=await new categoryModel({name,slug:slugify(name)}).save()
    res.status(201).send({
        success:true,
        message:'New category Created',
        category
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:'Error in Category'
    })
}
}


export const updateCategoryContrller=async(req ,res)=>{

    try {
        const {name}=req.body
        const {id}=req.params
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) }, // Here
            { new: true }
          );
          
        res.status(200).send({
            success:true,
            message:'Category Updated Succesfully',
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while updating category'
        })
    }

}

export const categoryController=async(req,res)=>{
    try {
        const category=await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:'All categories List',
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while all categories'
        })
    }

}

export const singleCattegoryController=async(req,res)=>{
    try {
        const category=await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Get Single Category Succesfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting single category'
        })
    }

}
export const deleteCategoryContrller = async (req, res) => {
    try {
        const { id } = req.params; // Corrected destructuring
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Category deleted Successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while deleting category',
        });
    }
};

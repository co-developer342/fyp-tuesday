import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import {CreateCategoryController, categoryController, deleteCategoryContrller, singleCattegoryController, updateCategoryContrller}  from '../Controller/categoryController.js'


const router=express.Router()

router.post("/creat-category",requireSignIn,isAdmin,CreateCategoryController)
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryContrller)
router.get("/all-category",categoryController)
router.get("/single-category/:slug",singleCattegoryController)
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryContrller)
export default router
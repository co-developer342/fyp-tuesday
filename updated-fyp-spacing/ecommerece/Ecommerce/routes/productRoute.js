import express from 'express'

import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { CreateProductController, deleteProductController, getProductController,productListController, productCountController,getSingleProductController, productPhotoController, updateProductController,productFiltersController, searchProductController, relatedProductController, productCategoryController, brainTreeTokenController, brainTreePaymentController } from '../Controller/productController.js'
import formidable from 'express-formidable'
const router=express.Router()

router.post("/create-product",requireSignIn,isAdmin,formidable(),CreateProductController)
router.get("/get-product",getProductController)
router.get("/get-product/:slug",getSingleProductController)
//product photo
router.get("/product-photo/:pid",productPhotoController)
//delete
router.delete("/delete-product/:pid",deleteProductController)

//update product
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController)
router.post("/product-filters",productFiltersController)



//product count
router.get("/product-count", productCountController);
router.get('/product-list/:page',productListController)

//search product

router.get('/search/:keyword',searchProductController)

//similar products
router.get('/related-product/:pid/:cid',relatedProductController)

//category wise product

router.get('/product-category/:slug',productCategoryController)

//payments routes
//token

router.get('/braintree/token',brainTreeTokenController)

//payments
router.post('/braintree/payment',requireSignIn,brainTreePaymentController)
export default router
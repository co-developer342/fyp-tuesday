import slugify from "react-slugify";
import ProductModel from "../models/ProductModel.js";
import fs from "fs";

import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import OrderModel from "../models/OrderModel.js";
import dotenv from "dotenv";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const CreateProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      category,
      quantity,
      shipping,
      attributes,
    } = req.fields;
    const { photo } = req.files;

    // Parse the attribute field
    let parsedAttributes = [];
    if (attributes) {
      try {
        parsedAttributes = JSON.parse(attributes);
      } catch (error) {
        return res.status(400).send({ error: "Invalid attribute format" });
      }
    }

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1MB" });
    }

    const products = new ProductModel({
      ...req.fields,
      slug: slugify(name),
      attributes: parsedAttributes, // Set the parsed attributes
    });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(200).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Product",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Products",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Prodcuct",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Single Products",
      error: error.message,
    });
  }
};

//get photo

export const productPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in photo",
      error: error.message,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    console.log("hogia");
    await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleteing product",
      error: error.message,
    });
  }
};
export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      attributes,
    } = req.fields;
    const { photo } = req.files;

    // Parse the attribute field
    let parsedAttributes = [];
    if (attributes) {
      try {
        parsedAttributes = JSON.parse(attributes);
      } catch (error) {
        return res.status(400).send({ error: "Invalid attribute format" });
      }
    }

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1MB" });
    }

    const product = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      {
        name,
        description,
        price,
        category,
        quantity,
        shipping,
        attributes: parsedAttributes, // Update attributes
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Product",
      error,
    });
  }
};
// export const updateProductController = async (req, res) => {
//   try {
//     const { name, description, price, category, quantity, shipping } =
//       req.fields;
//     const { photo } = req.files;
//     //alidation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "Name is Required" });
//       case !description:
//         return res.status(500).send({ error: "Description is Required" });
//       case !price:
//         return res.status(500).send({ error: "Price is Required" });
//       case !category:
//         return res.status(500).send({ error: "Category is Required" });
//       case !quantity:
//         return res.status(500).send({ error: "Quantity is Required" });
//       case photo && photo.size > 1000000:
//         return res
//           .status(500)
//           .send({ error: "photo is Required and should be less then 1mb" });
//     }

//     const products = await ProductModel.findByIdAndUpdate(
//       req.params.pid,
//       { ...req.fields, slug: slugify(name) },
//       { new: true }
//     );
//     if (photo) {
//       products.photo.data = fs.readFileSync(photo.path);
//       products.photo.contentType = photo.type;
//     }
//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "Product Updated Successfully",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in Updte product",
//     });
//   }
// };
//   filter

// export const productFiltersController = async (req, res) => {
//   try {
//     // Ensure checked and radio have default values
//     const checked = req.body.checked || [];
//     const radio = req.body.radio || [];

//     let args = {};
//     if (checked.length > 0) {
//       args.category = { $in: checked }; // Filters by categories
//     }
//     if (radio.length === 2) {
//       args.price = { $gte: radio[0], $lte: radio[1] }; // Filters by price range
//     }

//     const products = await ProductModel.find(args);

//     // Convert buffer to base64 string
//     const productsWithImages = products.map((product) => {
//       if (product.photo && product.photo.data) {
//         const base64 = Buffer.from(product.photo.data).toString("base64");
//         product.photo = `data:${product.photo.contentType};base64,${base64}`;
//       }
//       return product;
//     });
//     console.log(productsWithImages);
//     res.status(200).send({
//       success: true,
//       products: productsWithImages,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "Error While Filtering Products",
//       error,
//     });
//   }
// };
export const productFiltersController = async (req, res) => {
  try {
    const checked = req.body.checked || [];
    const radio = req.body.radio || [];

    let args = {};
    if (checked.length > 0) {
      args.category = { $in: checked }; // Filters by categories
    }
    if (radio.length === 2) {
      args.price = { $gte: radio[0], $lte: radio[1] }; // Filters by price range
    }

    const products = await ProductModel.find(args).lean(); // Use lean() to get plain JavaScript objects

    const productsWithImages = products.map((product) => {
      if (product.photo && product.photo.data) {
        const base64 = Buffer.from(product.photo.data).toString("base64");
        product.photo = `data:${product.photo.contentType};base64,${base64}`;
      }
      return product;
    });

    res.status(200).send({
      success: true,
      products: productsWithImages,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Search Product",
      error,
    });
  }
};

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params; // Correctly extract parameters
    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting related products",
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const product = await ProductModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting category product",
      error,
    });
  }
};
//payme nr gateway api
export const brainTreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const brainTreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new OrderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

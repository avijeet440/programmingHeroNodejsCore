import { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.server";
import type { IProduct } from "../types/products";
import { bodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/send.response";
const productController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  console.log(url); // /products/1 url eta return korbe jodi http://localhost:5000/products/1 diye request kori...
  console.log(method);

  const urlParams = url?.split("/"); // split ('/') methode eta return korbe = ["","products","1"]
  const parsedId = Number(urlParams?.[2]);
  console.log(urlParams);
  const id =
    urlParams?.[1] === "products" && Number.isInteger(parsedId) && parsedId > 0
      ? parsedId
      : null;
  //    const id= urlParams?.[1]==="products"? Number(urlParams?.[2]):null;
  console.log(id);
  //Get all product

  if (url === "/products" && method === "GET") {
    /*  const products= [  {
        id:1,
        name:"Laptop",
        price:60000,
    },
    {
        id:1,
        name:"Pc",
        price:50000,
    },
    {
        id:1,
        name:"Phone",
        price:20000,
    },

] */
    try {
      const products = productService();
      const body = products;
      sendResponse(res, true, 200, "Products fetched successfully", products);
    } catch (err) {
      sendResponse(res, false, 404, "Products not found");
    }

    //Get single product
  } else if (method === "GET" && id !== null) {
    const products = productService(); /* [{},{},{}] */
    const product = products.find((p: IProduct) => p.id === id);

    if (!product) {
      sendResponse(res, false, 404, "Products not found");
      return;
    }
    sendResponse(res, true, 200, "Products fetched successfully", product);
  } else if (method === "POST" && url === "/products") {
    const body = await bodyParser(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    console.log(newProduct);

    const products = productService(); /* [{},{},{}] */
    products.push(newProduct); /* [{},{},{},{new}] */
    // console.log(newProduct);
    // console.log(body);
    createProduct(products);
    sendResponse(res, true, 201, "Pruduct created successfully", newProduct);
  } else if (method === "PUT" && id !== null) {
    const body = await bodyParser(req);
    const products = productService(); /* [{},{},{}] */
    const productIndex = products.findIndex((p: IProduct) => p.id === id);
    console.log(productIndex);
    if (productIndex < 0) {
      sendResponse(res, false, 404, "Products not found");
      return;
    }

    products[productIndex] = {
      ...products[productIndex],
      ...body,
      id: products[productIndex].id,
    };

    createProduct(products);

    sendResponse(res, true, 200, "Product updated successfully", products);
  } else if (method === "DELETE" && id !== null) {
    const products = productService(); /* [{},{},{}] */
    const productIndex = products.findIndex((p: IProduct) => p.id === id);
    console.log(productIndex);
    if (productIndex < 0) {
      sendResponse(res, false, 404, "Products not found");

      return;
    }

    products.splice(productIndex, 1);
    createProduct(products);
    sendResponse(res, true, 200, "Products deleted successfully");
  }
};
export default productController;

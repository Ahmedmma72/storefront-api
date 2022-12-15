import { Router } from "express";
import { getAllProducts, getProduct, addProduct } from "../controllers/product.controller";
import verifyAuthToken from "../services/verifyAuth";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/",verifyAuthToken ,addProduct);

export default productRouter;

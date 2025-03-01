import product from "../models/product.js";
import { isItAdmin } from "./userController.js";

export function addProduct(req,res){

    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again"
        })
        return
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized to performe this action"
        })
        return
    }

const data = req.body;
const newProduct = new product(data);
newProduct.save()
.then(()=>{
    res.json({message:"Product added successfully"});
})
.catch((error)=>{
    res.status(500).json({error:"Product addition failed"});
});
}

export async function getProducts(req,res){
    try{

        if(isItAdmin(req)){
        const products = await product.find();
        res.json(products);
        return;
    }else{
        const products = await product.find
        ({availability:true});
        res.json(products);
        return;
    }
    }catch(e){
        res.status(500).json({
            message: "Failed to get products"
        })
    }
}


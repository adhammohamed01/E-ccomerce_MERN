import productModel from "../models/productModel";
export const getAllproducts=async function(){
    return await productModel.find();
};
export const seedInitialProducts=async function(){
    const products=[ {title:"Dell Laptop",image:"https://m.media-amazon.com/images/I/61zRDADh+YS._AC_SL1500_.jpg",price:15000,stock:10}
    ];
    const existingproducts=await getAllproducts();
    if(existingproducts.length===0){
        await productModel.insertMany(products)
    }
}
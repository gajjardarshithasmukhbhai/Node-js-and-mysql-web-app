const fs=require('fs');
const path=require('path');
const cart_json_file=path.join(path.dirname(process.mainModule.filename),"data","cart.json");
module.exports=class Cart{
	static cart(id,Price,name)
	{
		fs.readFile(cart_json_file,(err,fileContent)=>{
			let cart={products:[],totalPrice:0};
			//akhi aa design che above ^ ni tena thi exact e rite json banse
			//                         |
			if(!err){
				cart=JSON.parse(fileContent);
			}
			
			const existingProductIndex=cart.products.findIndex(prod=>prod.id===id);
			const existingProduct=cart.products[existingProductIndex];
			let updateProduct;
			if(existingProduct)
			{
				updateProduct={...existingProduct};
				updateProduct.qty=updateProduct.qty+1;
				cart.products=[...cart.products];
				cart.products[existingProductIndex]=updateProduct;	
			}
			else{
				updateProduct={id:id,qty:1,name:name};
				cart.products=[...cart.products,updateProduct];
			}
			cart.totalPrice=cart.totalPrice+ +Price;//+ +Price ma te string mathi te text ma te convert te kari nakhe che
			
			//source change	
			fs.writeFile(cart_json_file,JSON.stringify(cart,null,2),(err)=>{
					console.log(err);
			});	
			
		});
//change
	
	}
}
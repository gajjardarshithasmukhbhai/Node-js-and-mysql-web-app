const path=require('path');
let inner_data=[];
const fs=require('fs');
// const file_=path.dirname(process.mainModule.filename);
let Product_data=require("../modal/all_file_data.js");
let Cart=require("../modal/cart.js");
let Updte=require("../modal/update_cart.js");
exports.add_product_data_controller=(req,res,next)=>{
	let product=new Product_data(req.body.Title,req.body.Image,req.body.price,req.body.description);	
	product.save();
	// product.fetch();
	setTimeout(()=>{
		let ert=Product_data.fetch((mobile)=>{
			inner_data=mobile;
		});
	},300);
	res.redirect("/shop");
}
exports.order_controller=(req,res,next)=>{
	res.render("order");
	res.end();
}
//delete the data of admin products
exports.admin_delete_product_controller=(req,res,next)=>{
	let delete_cart_id=req.params.iid;
	Updte.delete(delete_cart_id);
	res.redirect('/shop');
	res.end();
}
exports.admin_product_controller=(req,res,next)=>{
	Product_data.fetch()
	.then(([rows,fieldData])=>{
		res.render("Admin_product",{data:rows});
		res.end();
	})
	.catch(err=>{
		console.log("my error");
		res.end();
	});
}
exports.admin_edit_product_controller=(req,res,next)=>{
	let confirmId;
	let user_data=req.params.id;
	let delete_cart_id=req.params.iid;
	Updte.edit()
	.then(([row,fileData])=>{
		confirmId=row.find(cb=>cb.uid==user_data);
		res.render("Admin_edit_product",{verifies_data:confirmId});
		res.end();
	})
	.catch(err=>{
		console.log(err);
	});
}
exports.admin_update_product_controller=(req,res,next)=>{
	let Id=req.params.Id;
	// let id=req.body.update_id;
	let title=req.body.update_title;
	let price=req.body.update_price;
	let description=req.body.update_description;
	let image=req.body.update_image;
	let update=new Updte(Id);
	Updte.change(Id,title,price,description,image);
	res.redirect('/Admin_Product');
	res.end();	
}
exports.cart_controller=(req,res,next)=>{
	res.render("cart");
	res.end();
}
exports.carts_controller=(req,res,next)=>{
	let id=req.body.ProductId;
	let Price=req.body.price;
	// console.log("my id",id);
	Product_data.specific_data(id,product=>{
		// console.log("product of me",product);
		Cart.cart(id,product.price,product.title);
	});
	res.redirect("cart");
	res.end();
}
exports.products_controller=(req,res,next)=>{
	res.render("product");
	res.end();
}
exports.product_controller=(req,res,next)=>{
	const uid=req.params.productId;
	// const data=req.params.dat;
	// ("hello my id is->"+uid);
	// ("hello my data is->"+data);//amathi data te lidha che
	Product_data.fetch_Id_product(uid,detail=>{
		// console.log("gujju rock",detail);
		res.render("product",{id_data:detail});
		res.end();
	});//problem occur
	// res.redirect('/shop');	
}
exports.delete=(req,res,next)=>{
	res.end();
}
exports.shop_controller=(req,res,next)=>{
	Product_data.fetch()
	.then(([rows,fieldData])=>{
		// console.log("data",rows);
		res.render("shop",{data:rows});
		res.end();
	})
	.catch(err=>{
		console.log("my error");
		res.end();

	});
	
}
exports.home_controller=(req,res,next)=>{
	res.render("index");
	res.end();
}
exports.add_product_controller=(req,res,next)=>{
	res.render("Add_product");
	res.end();
}
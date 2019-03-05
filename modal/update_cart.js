const fs=require('fs');
const path=require('path');
const db=require('../util/database.js');
let cart_data=[];
let FILEindex;
let globalId;
let change_id;
let change_title;
let change_price;
let change_description;
let change_image;
let delete_id;
module.exports=class Update{
	constructor(id)
	{
		globalId=id;
	}
	static change(change_id,change_title,change_price,change_description,change_image)
	{
		this.change_id=change_id;
		this.change_title=change_title;
		this.change_price=change_price;
		this.change_description=change_description;
		this.change_image=change_image;
		// console.log("sublime text",this.change_description);
		db.execute('select *from product')
		.then(([row,fileData])=>{
			cart_data=row;
		})
		.catch(err=>{
			console.log(err);
		});
		let extended=[];
		setTimeout(()=>{
			FILEindex=cart_data.findIndex(data=>data.uid===globalId);
		//problem
			extended=[...cart_data];
			extended[FILEindex]={title:this.change_title,Image:this.change_image,price:this.change_price,description:this.change_description,uid:this.change_id}			
			db.execute(`update product set title="${extended[FILEindex].title}",Image="${extended[FILEindex].Image}",price="${extended[FILEindex].price}",description="${extended[FILEindex].description}" where uid="${extended[FILEindex].uid}"`)
			.catch(err=>{
				console.log("rock_solid",err);
			});
			
		},800);

	}	
	static delete(delete_id)
	{
		this.delete_id=delete_id;
		
		db.execute("select *from product")
		.then(([row,fileData])=>{
				cart_data=row;
		})
		.catch((err)=>{
			console.log("err will be ocur in update_cart.js");
		});
		// console.log(":-)",cart_data);
		setTimeout(()=>{
		let FILEind=cart_data.find(data=>data.uid===this.delete_id);
		db.execute(`delete from product where uid="${FILEind.uid}"`)
		.catch(err=>{
			console.log(err);
			});
		},60);
	
	}
	static edit(id)
	{
		return db.execute("select *from product");
	}
}	
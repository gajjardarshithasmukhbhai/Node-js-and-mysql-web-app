
let product=[];
const db=require("../util/database.js");

module.exports=class Product_data{
	constructor(Title,Image,price,description)//take the data
	{
		// super(); it's uses to call the parent class
		this.Title=Title;
		this.Image=Image;
		this.price=price;
		this.description=description;

		// console.log("--",this.Title,";;;");//jyare aa rite
		// call karso to value undefined avase but /
		
	}
	save()//save the data
	{
		var text = "";
  		var possible = "0123456qwemnbvclkjhsajo02889182789";
	  	for (var i = 0; i < 5; i++)
	  	{
	    	text += possible.charAt(Math.floor(Math.random() * possible.length))
		}

		this.uid=text;
		db.execute('insert into product values(?,?,?,?,?)',[this.Title,this.Image,this.price,this.description,this.uid])
		//sql injection protection mate aarite write karvu
		.catch(err=>console.log(err));		
	}
	static fetch()//get the data
	{
		return db.execute("select *from product");
	}
	static specific_data(id,cb)
	{
		
	}
	static fetch_Id_product(id,cb)
	{
		
	}
}
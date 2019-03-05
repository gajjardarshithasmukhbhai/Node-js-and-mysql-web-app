const express=require('express');
const app=express();
const path=require('path');
const db=require('./util/database.js');
const bodyParser=require('body-parser');
const Add_product=require('./controller/Add_product.js');
const order=require('./controller/Add_product.js');
const Admin_product=require('./controller/Add_product.js');
const cart=require('./controller/Add_product.js');
const product=require('./controller/Add_product.js');
const shop=require('./controller/Add_product.js');
const home=require('./controller/Add_product.js');
const add_product=require('./controller/Add_product.js');
app.set("view engine","pug");
app.set("views","view");
app.use("/css",express.static(path.join(__dirname,"css/css/")));
app.use("/bootstrap",express.static(path.join(__dirname,"node_modules/bootstrap/dist/css/")));
app.use("/bootstrap-js",express.static(path.join(__dirname,"node_modules/bootstrap/dist/js/")));
app.use("/jquery",express.static(path.join(__dirname,"node_modules/jquery/dist/")));
app.use("/anime-js",express.static(path.join(__dirname,"node_modules/anime/")));
app.use(bodyParser.urlencoded({extended:true}));
app.post("/add_product_data",Add_product.add_product_data_controller);
app.get("/Admin_product",Admin_product.admin_product_controller);
app.get("/Admin_product/:id",Admin_product.admin_edit_product_controller);
app.post("/admin_product_update_data/:Id",Admin_product.admin_update_product_controller);
app.get("/Admin_delete_product/:iid",Admin_product.admin_delete_product_controller);
let sk=215;

app.get("/order",order.order_controller);
app.get("/Add_product",add_product.add_product_controller);
app.get("/cart",cart.cart_controller);
app.post("/Cart",cart.carts_controller);
app.get("/product",product.products_controller);
// tame aaj rite te delete ne specify te kari sako
app.get("/product/:productId",product.product_controller);

//->jyare data lo tyare always te :productId kari ne tame
//->te data te lai sako url mathi

// hello
// app.get("/product/delete",product.product_controller);
// upar ni jem karta error avase.because specific
// route ne te dynamic route ni upar mukvu padse

app.get("/shop",shop.shop_controller);
app.get("/",home.home_controller);
app.use((req,res,next)=>{
	res.status(404).render("404",{error:"url is wrong"});
})
app.listen(5060,(wer)=>console.log("i am new"));
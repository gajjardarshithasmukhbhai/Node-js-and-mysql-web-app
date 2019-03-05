const mysql=require('mysql2');
const pool=mysql.createPool({//pool ena mate ke apne mutiple mysql
	//connection use karvana che na ke one
	host:'localhost',
	user:'root',
	database:'product_base',
	password:'Zxcvb@123'
});
module.exports=pool.promise();
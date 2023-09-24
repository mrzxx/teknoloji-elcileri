const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// route files
const userRoutes = require('./routes/users');

// database files
const sequelize = require('./utility/database');
const Product = require('./models/product');
const Category = require('./models/category');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartitem');


// init
app.set('view engine','pug');
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(__dirname + '/public'));

//middleware
app.use((req,res,next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            res.end(JSON.stringify({error:"Bad Login."}));
        })
});

// routes
app.use(userRoutes);


// database ---
Product.belongsTo(Category,{
    foreignKey:{
        allowNull:false
    }
});
Category.hasMany(Product,{
    foreignKey:{
        allowNull:false
    }
});
User.hasOne(Cart,{
    foreignKey:{
        allowNull:false
    }
});
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
let _user;
sequelize
    .sync({force:true})
    .then((result) => {
        
        User.count()
        .then(result => {
            if(result===0){
                User.bulkCreate([
                    {name:'Mert Pamuk',email:'info@mertpamuk.com'},
                    {name:'Mehmet Tağıl',email:'futoo@gmail.com'},
                    {name:'Mustafa Koçer',email:'mustafakoceerr33@gmail.com'}
                ]);
            }
        })
        .then(result => {
            User.findByPk(1)
            .then(user => {
                _user = user;
                return user.getCart();
            })
            .then(cart => {
                if(!cart){
                    return _user.createCart();
                }
                return cart;
            }).then(cart => {
                CartItem.bulkCreate([{quantity:2,cartId:cart.id,productId:2},{quantity:2,cartId:cart.id,productId:3}]);
            });
        });

        Category.count()
            .then(result => {
                if(result===0){
                    Category.bulkCreate([
                        {name:'Telefon',description:'Telefon'},
                        {name:'Bilgisayar',description:'Bilgisayar'},
                        {name:'Elektronik',description:'Elektronik'}
                    ]);
                }
            });


        Product.count()
            .then(result => {
                if(result===0){
                    Product.bulkCreate([
                        {name:'IPhone X',description:'letgo 2.el',price:8500,categoryId:1},
                        {name:'IPhone 11',description:'2.el',price:1800,categoryId:1},
                        {name:'IPhone 12',description:'0 el',price:38500,categoryId:1}
                    ]);
                }
            });
        
    })
    .catch((err) => {
    console.log(err);
    });
// database ---

app.use((req,res) => {
    res.status(404).render('404');
});

app.listen(3000,()=> {
    console.log("Listening..");
});

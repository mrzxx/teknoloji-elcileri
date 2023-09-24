const Category = require('../models/category');
const Product = require('../models/product');
const CartItem = require('../models/cartItem');

exports.getProduct = (req,res,next) => {
    Product.findAll()
        .then(result => {
            res.end(JSON.stringify(result));
        })
        .catch(err => {
            res.end(JSON.stringify({error:err}));
        });
}

exports.getAddProduct =    (req,res,next) => {
    
    res.render('add-product',
    {
        title: 'Add a new Product',
        path: '/'
    });
}

exports.postAddProduct =    (req,res,next) => {
    const name = req.body.model;
    const price = req.body.price;
    const desc = req.body.description;
    const catid = req.body.catid;
    const user = req.user;
    Product.create({
        name:name,
        price:price,
        description:desc,
        categoryId:catid,
        userId:user.id
    }).then(result => {
        result.dataValues.user = user.dataValues;
        res.end(JSON.stringify(result));
    }).catch(err => {
        res.end(JSON.stringify({error:err}));
    });
}



exports.getById = (req,res,next) => {
    const id = req.params.productid;
    Product.findByPk(id)
    .then(result => {
        if(result !== null)
            res.end(JSON.stringify(result));
        else
            res.end(JSON.stringify({id:id,error:"404"}));
    })
    .catch(err => {
        res.end(JSON.stringify({error:err}));
    });
    
}


exports.getByCatId = (req,res,next) => {
    const catid = req.params.catid;
   
    /*Product.findAll({where:{categoryId:catid}})
        .then(result => {
            res.end(JSON.stringify(result));
        })
        .catch(err => {
            res.end(JSON.stringify({id:catid,error:err}));
        });*/

    Category.findAll()
        .then(categories => {
            return categories.find(i=>i.id==catid);
        })
        .then(category => {
            return category.getProducts();
        })
        .then(products => {
            res.end(JSON.stringify(products));
        })
        .catch(err =>
            {
                res.end(JSON.stringify({error:err}));
            });
    
}


exports.updateById = (req,res,next) => {
    const id = req.params.productid;
    const name = req.params.name;
    const price = req.params.price;
    const desc = req.params.desc;
    const user = req.user;
    const catid = req.params.catid;
    Product.findByPk(id)
    .then(result => {
        if(result !== null){
            result.name = name;
            result.price = price;
            result.description = desc;
            result.categoryId = catid;
            result.userId = user.id;
            result.save().then(res => {
                res.end(JSON.stringify(result));
            }).catch(err => {
                res.end(JSON.stringify({error:err}));
            });
        }
        else
            res.end(JSON.stringify({id:id,error:"404"}));
    })
    .catch(err => {
        res.end(JSON.stringify({error:err}));
    });
    
}



exports.getDeleteById = (req,res,next) => {
    const id = req.params.productid;
    /*
    Product.destroy({where:{id:id}}).then((result)=>{
        res.end(JSON.stringify(result));
    }).catch(err => {
        console.log(err);
    });
    */

    Product.findByPk(id).then((result) => {
        result.destroy().then(rr => {
            res.end(JSON.stringify(result));
        }).catch(err => {
            res.end(JSON.stringify({error:err}));
        });
    }).catch(ww => {
        res.end(JSON.stringify(ww));
    });
    
}

exports.getCart = (req,res,next) => {
    
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
        })
        .then(products => {
            res.end(JSON.stringify(products));
        })
        .catch(err => {
            res.end(JSON.stringify(err));
        });

    
}

exports.deleteCartItem = (req,res,next) => {
    let productid = req.params.productid;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({where:{id:productid}});
        })
        .then(products => {
            const product = products[0];
            return product.CartItem.destroy();
        })
        .then(dest => {
            res.end(JSON.stringify({success:dest}));
        })
        .catch(err => {
            res.end(JSON.stringify({error2:err}));
        });

    
}

exports.postCart = (req,res,next) => {
    

    
}
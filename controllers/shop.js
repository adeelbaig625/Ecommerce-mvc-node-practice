const Product = require('../models/product');
const Cart=require('../models/cart');

exports.getProducts = (req, res, next) => {
  
 
    Product.fetchAll().then(([rows,fieldData])=>
  {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows,fieldData])=>
  {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })

};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
exports.getProduct=(req,res,next)=>
{
  const prodId=req.params.productId;
  Product.findById(prodId).then(([product])=>
  {
    console.log(product[0])
    res.render('shop/product-detail',{
     path: '',
     product:product[0],
     pageTitle: product[0].title
    })
  })
};
exports.postCart=(req,res,next)=>
{
  const prodId=req.body.productId;
  Product.findById(prodId,product=>
    {
      Cart.addProduct(prodId,product.price);
    });
 
  res.redirect('/cart')
}



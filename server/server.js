const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Models
const { User } = require("./models/user");
const { Brand } = require("./models/brand");
const { Wood } = require("./models/wood");
const { Product } = require("./models/product");

// Middlewares
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");

//=======================================
//              BRAND
//=======================================
app.post(
  `/api/${process.env.CURRENT_API_VERSION}/products/brand`,
  auth,
  admin,
  (req, res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true, brand: doc });
    });
  }
);

app.get(
  `/api/${process.env.CURRENT_API_VERSION}/products/brands`,
  (req, res) => {
    Brand.find({}, (err, brands) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(brands);
    });
  }
);

//=======================================
//              PRODUCTS
//=======================================

app.post(
  `/api/${process.env.CURRENT_API_VERSION}/products/article`,
  auth,
  admin,
  (req, res) => {
    const product = new Product(req.body);
    product.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        article: doc
      });
    });
  }
);

app.post(
  `/api/${process.env.CURRENT_API_VERSION}/products/shop`,
  (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    let findArgs = {};

    const filters = req.body.filters;
    for (let key in filters) {
      if (filters[key].length > 0) {
        if (key === "price") {
          findArgs[key] = {
            $gte: filters[key][0],
            $lte: filters[key][1]
          };
        } else {
          findArgs[key] = filters[key];
        }
      }
    }
    Product.find(findArgs)
      .populate("brand")
      .populate("wood")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, articles) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
          size: articles.length,
          articles
        });
      });
  }
);

// if type === 'id' look for id(s)
// if type === 'arrival' look for limit
// if type === 'sold' look for limit
// else get all

app.get(
  `/api/${process.env.CURRENT_API_VERSION}/products/articles`,
  (req, res) => {
    let type = req.query.type;
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    switch (type) {
      case "id":
        if (req.query.id) {
          let ids = req.query.id.split(",");
          let items = [];
          items = ids.map(item => {
            return mongoose.Types.ObjectId(item);
          });

          Product.find({ _id: { $in: items } })
            .populate("brand")
            .populate("wood")
            .sort([[sortBy, order]])
            .limit(limit)
            .exec((err, docs) => {
              return res.status(200).send(docs);
            });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Missing id parameter" });
        }
        break;

      case "arrival":
        order = req.query.order ? req.query.order : "desc";
        sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
        Product.find({})
          .populate("brand")
          .populate("wood")
          .sort([[sortBy, order]])
          .limit(limit)
          .exec((err, articles) => {
            if (err) return res.status(400).send(err);
            res.send(articles);
          });
        break;

      case "sold":
        order = req.query.order ? req.query.order : "desc";
        sortBy = req.query.sortBy ? req.query.sortBy : "sold";
        Product.find({})
          .populate("brand")
          .populate("wood")
          .sort([[sortBy, order]])
          .limit(limit)
          .exec((err, articles) => {
            if (err) return res.status(400).send(err);
            res.send(articles);
          });
        break;

      default:
        Product.find({})
          .populate("brand")
          .populate("wood")
          .sort([[sortBy, order]])
          .limit(limit)
          .exec((err, products) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(products);
          });
        break;
    }
  }
);
//=======================================
//              WOODS
//=======================================
app.post(
  `/api/${process.env.CURRENT_API_VERSION}/products/wood`,
  auth,
  admin,
  (req, res) => {
    const wood = new Wood(req.body);

    wood.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true, wood: doc });
    });
  }
);

app.get(
  `/api/${process.env.CURRENT_API_VERSION}/products/woods`,
  (req, res) => {
    Wood.find({}, (err, woods) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(woods);
    });
  }
);
//=======================================
//              USERS
//=======================================

app.get(
  `/api/${process.env.CURRENT_API_VERSION}/users/auth`,
  auth,
  (req, res) => {
    res.status(200).json({
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      cart: req.user.cart,
      histor: req.user.history
    });
  }
);

app.post(
  `/api/${process.env.CURRENT_API_VERSION}/users/register`,
  (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
      if (err) return res.json({ success: false, err });

      res.status(200).json({
        success: true
      });
    });
  }
);

app.post(`/api/${process.env.CURRENT_API_VERSION}/users/login`, (req, res) => {
  // find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ loginSuccess: false, message: "Auth failed" });

    user.comparePassword(req.body.password, (err, match) => {
      if (!match)
        return res.json({ loginSuccess: false, message: "Auth failed" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true });
      });
    });
  });
});

app.get(
  `/api/${process.env.CURRENT_API_VERSION}/users/logout`,
  auth,
  (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    });
  }
);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running ${port}`);
});

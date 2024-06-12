var DataTypes = require("sequelize").DataTypes;
var _blog = require("./blog");
var _blog_lang = require("./blog_lang");
var _category = require("./category");
var _category_lang = require("./category_lang");
var _composition = require("./composition");
var _composition_lang = require("./composition_lang");
var _language = require("./language");
var _msg = require("./msg");
var _order_activity = require("./order_activity");
var _orders = require("./orders");
var _orders_item = require("./orders_item");
var _pages = require("./pages");
var _pages_lang = require("./pages_lang");
var _products = require("./products");
var _products_lang = require("./products_lang");
var _shipping_address = require("./shipping_address");
var _slider = require("./slider");
var _slider_lang = require("./slider_lang");
var _token = require("./token");
var _users = require("./users");

function initModels(sequelize) {
  var blog = _blog(sequelize, DataTypes);
  var blog_lang = _blog_lang(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var category_lang = _category_lang(sequelize, DataTypes);
  var composition = _composition(sequelize, DataTypes);
  var composition_lang = _composition_lang(sequelize, DataTypes);
  var language = _language(sequelize, DataTypes);
  var msg = _msg(sequelize, DataTypes);
  var order_activity = _order_activity(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var orders_item = _orders_item(sequelize, DataTypes);
  var pages = _pages(sequelize, DataTypes);
  var pages_lang = _pages_lang(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var products_lang = _products_lang(sequelize, DataTypes);
  var shipping_address = _shipping_address(sequelize, DataTypes);
  var slider = _slider(sequelize, DataTypes);
  var slider_lang = _slider_lang(sequelize, DataTypes);
  var token = _token(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  blog_lang.belongsTo(blog, { as: "rid_blog", foreignKey: "rid"});
  blog.hasMany(blog_lang, { as: "blog_langs", foreignKey: "rid"});
  category_lang.belongsTo(category, { as: "rid_category", foreignKey: "rid"});
  category.hasMany(category_lang, { as: "category_langs", foreignKey: "rid"});
  products.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(products, { as: "products", foreignKey: "category_id"});
  composition_lang.belongsTo(composition, { as: "rid_composition", foreignKey: "rid"});
  composition.hasMany(composition_lang, { as: "composition_langs", foreignKey: "rid"});
  order_activity.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_activity, { as: "order_activities", foreignKey: "order_id"});
  orders_item.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(orders_item, { as: "orders_items", foreignKey: "order_id"});
  pages_lang.belongsTo(pages, { as: "rid_page", foreignKey: "rid"});
  pages.hasMany(pages_lang, { as: "pages_langs", foreignKey: "rid"});
  orders_item.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(orders_item, { as: "orders_items", foreignKey: "product_id"});
  products_lang.belongsTo(products, { as: "rid_product", foreignKey: "rid"});
  products.hasMany(products_lang, { as: "products_langs", foreignKey: "rid"});
  slider_lang.belongsTo(slider, { as: "rid_slider", foreignKey: "rid"});
  slider.hasMany(slider_lang, { as: "slider_langs", foreignKey: "rid"});
  order_activity.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(order_activity, { as: "order_activities", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  token.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(token, { as: "tokens", foreignKey: "user_id"});

  return {
    blog,
    blog_lang,
    category,
    category_lang,
    composition,
    composition_lang,
    language,
    msg,
    order_activity,
    orders,
    orders_item,
    pages,
    pages_lang,
    products,
    products_lang,
    shipping_address,
    slider,
    slider_lang,
    token,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

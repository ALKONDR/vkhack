const fs = require('fs');

const db = require('./product_base');

const newDB = {};

db.categories.forEach(category => {
    newDB[category] = db.products.filter(product => product.category === category);
});

fs.writeFileSync('groupedDB.json', JSON.stringify(newDB));
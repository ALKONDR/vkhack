const fs = require('fs');

const db = require('./product_base');

const fixed_products = db.products.map(el => {
    const new_price = !!el.price ? el.price : (Math.random() * 500).toFixed(2);
    const new_actual = el.actualPrice != "NaN" ? el.actualPrice : (new_price - Math.random() * new_price / 2.0).toFixed(2);

    return {
        ...el,
        price: new_price,
        actualPrice: new_actual
    }
});

fs.writeFileSync('product_base.json', JSON.stringify({ ...db, products: fixed_products }));

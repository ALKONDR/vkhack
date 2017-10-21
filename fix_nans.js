const fs = require('fs');

const db = require('./product_base');

const fixed_products = db.products.map(el => {
    const new_price = !!el.price ? el.price : Math.random() * 500;
    const new_actual = el.actualPrice != "NaN" ? el.actualPrice : new_price - (Math.random() * 50 * new_price);

    return {
        ...el,
        price: new_price,
        actualPrice: new_actual
    }
});

fs.writeFileSync('product_base.json', JSON.stringify({ ...db, products: fixed_products }));

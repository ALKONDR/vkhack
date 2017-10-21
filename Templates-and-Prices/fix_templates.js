const fs = require('fs');

const db = require('../parser/product_base.json');

const file2fix = require('./BuilderFix');

// console.log(file2fix['Transactions']);

const findInDB = productName => {
    // console.log(productName);
    let ans = {};
    db.products.forEach(el => {
        if (el.product === productName) {
            ans = {
                price: el.price,
                actualPrice: el.actualPrice
            }
        }
    });
    if (!ans.price)
        console.log(productName);
    return ans;
};

file2fix['Transactions'] = file2fix['Transactions'].map(el => {
    // console.log(el);
    const new_el = {
        "Products": el['Products'].map(prod => {
            // console.log(prod);
            const rightPrice = findInDB(prod["ProductName"]);
            return {
                ...prod,
                "ActualPrice": rightPrice.actualPrice,
                "Price": rightPrice.price
            }
        })
    };

    return {
        ...el,
        ...new_el
    }
});

fs.writeFileSync('./2.json', JSON.stringify(file2fix));

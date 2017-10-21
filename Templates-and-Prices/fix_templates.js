const fs = require('fs');

const db = require('../parser/product_base.json');

const file2fix = require('./StudentFix');

// console.log(file2fix['Transactions']);

const findInDB = (productName, category) => {
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
    if (!ans.price) {
        console.log(productName);
        console.log(category);
        const allInCategory = db.products.filter(el => el.category === category);
        const ourProduct = allInCategory[Math.floor(Math.random() * allInCategory.length)];

        ans = {
            price: ourProduct.price,
            actualPrice: ourProduct.actualPrice
        }
    }

    console.log(ans);
    return ans;
};

file2fix['Transactions'] = file2fix['Transactions'].map(el => {
    // console.log(el);
    const new_el = {
        "Products": el['Products'].map(prod => {
            // console.log(prod);
            const rightPrice = findInDB(prod["ProductName"], prod["CategoryName"]);
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

fs.writeFileSync('./StudentFix2.json', JSON.stringify(file2fix));

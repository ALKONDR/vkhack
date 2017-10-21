const fs = require('fs');
const cheerio = require('cheerio');

let db = {
    categories: [],
    products: []
};

const htmls = [];

for (let i = 0; i <= 118; i++) {
    htmls.push(fs.readFileSync('pages/file' + i + '.txt', 'utf8', function(err, data) {
        if (err) throw err;

        console.log('yea boi ' + i);
    }));
}

htmls.forEach(html => {
    const $ = cheerio.load(html);
    const category = $('div#widget_breadcrumb li.current').text().trim();

    const products = [];
    const prices = [];

    $('div.product_name a').each(function() { products.push($(this).attr('title')); });
    $('span.price.label').each(function() { prices.push(Number($(this).text().trim().split(' ')[0].replace(',', '.'))); });

    const merged = products.map((el, ind) => { return {
        product: el,
        price: prices[ind],
        actualPrice: (prices[ind] - prices[ind] * (Math.random() / 2)).toFixed(2),
        category
    } });

    db.categories.push(category);
    db.products = db.products.concat(merged);

    console.log(category);
});



fs.writeFileSync('product_base.json', JSON.stringify(db), function (err) {
    if (err) {
        console.log(err);
    }

    console.log("DB saved");
});

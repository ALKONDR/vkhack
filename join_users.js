const fs = require('fs');

const frictions = ['builder', 'girl', 'loner', 'student', 'woman'];

const allUsers = {
    users: []
};

frictions.forEach(friction => {
    for (let i = 0; i < 100; i++) {
        let user = require('./Frictions/' + friction + 'Fric' + i + '.json');

        allUsers.users.push(user);
    }
});

fs.writeFileSync('all_users.json', JSON.stringify(allUsers));

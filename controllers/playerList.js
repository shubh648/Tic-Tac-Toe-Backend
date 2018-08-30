var users = require('./users.json');
const fs = require('fs');
var position;
module.exports = playerList = {
    
    list: (data) => {

        console.log('this is data in the playlist', data);
        writeData(JSON.stringify(data, null, 2));
    },

    readData: ()=> {
        return users.availableUsers;
        
    },

    msg:(data)=>{
        playerList.list(data);
    },

    getData:(cb)=>{
        cb(users.availableUsers);
    },

    setPosition:(pos)=>{
        console.log("setPosition" , pos);
        
        position = pos;
    },

    getPosition:(cb)=>{
        console.log("getPosition", position);
        
        cb(position);
    }
}

function writeData(user) {
    let jsonUsers = JSON.parse(user);

    if (!users.availableUsers.some(e => e.player === jsonUsers.player)) {
        users.availableUsers.push(jsonUsers);

        fs.writeFile('./controllers/users.json', JSON.stringify(users), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    }
    else {
        console.log("already in file");
    }
}




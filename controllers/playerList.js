var users = require('./users.json');
const fs = require('fs');
const app = require('../app');

module.exports = playerList = {

    readData: () => {
        return users.availableUsers;

    },

    msg: (data) => {
        playerList.list(data);
    },

    getData: (data, cb) => {
        cb(users.availableUsers);
    },

    newGame: (data) => {
        writeData(data);
        app.socket.emit('newPlayer', data);
    },

    joinGame: (data) => {
        writeCurrentPlaying(data);
        app.socket.emit('joinGame', data);

    },

    multiPlayer: (position) => {
        app.socket.emit('multiPlayer', position);
    },

    restart: (data) => {
        app.socket.emit('restart', data);
    },

    destroy: (data) => {
        removeFromCurrentPlaying(data);
        app.socket.emit('destroy', data);
    }
}

function writeData(user) {
    let jsonUsers = typeof user === 'string' ? JSON.parse(user) : user;

    if (!users.availableUsers.some(e => e.player === jsonUsers.player)) {
        users.availableUsers.push(jsonUsers);

        fs.writeFile('./controllers/users.json', JSON.stringify(users), (err) => {
            if (err) throw err;
            console.log('Data written to availableUsers');
        });
    } else {
        console.log("already in file");
    }
}

function writeCurrentPlaying(players) {
    let jsonUsers = typeof players === 'string' ? JSON.parse(players) : players;
    let removeUsers = [];

    users.usersPlaying.push(jsonUsers);

    users.availableUsers.forEach((element,index) => {
        if (element.player === players.player1 || element.player === players.player2) {
            removeUsers.push(index);
        }
    })

    removeUsers.sort((a, b) => { return b - a }).forEach(removeFromAvailableUsers);

    fs.writeFile('./controllers/users.json', JSON.stringify(users), (err) => {
        if (err) throw err;
        console.log('Data written to usersPlaying');
    });

}

function removeFromAvailableUsers(element) {
        
    users.availableUsers.splice(element, 1);

}

function removeFromCurrentPlaying(players) {
    let removeUsers = [];  

    users.usersPlaying.forEach((element,index) => {
        if (element.player1 === players.player1 && element.player2 === players.player2) {
            removeUsers.push(index);
        }
    })

    removeUsers.sort((a, b) => { return b - a }).forEach(element => {
        users.usersPlaying.splice(element, 1);
    });;

    fs.writeFile('./controllers/users.json', JSON.stringify(users), (err) => {
        if (err) throw err;
        console.log('Data written to usersPlaying');
    });
    

}
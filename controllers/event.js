const players = require('./playerList');
module.exports = {
    on:(event, ...params)=>{
        console.log("came to event", event);
        players[event](...params);
    }
}
const { hash } = require("../login/helper");
const AccountTable = require("../login/table");
const Session = require('../login/session');

const setSession = ( { userName , res }) => {
    return new Promise((resolve , reject) => {
        const session = new Session({ userName });
        const sessionString = session.toString();
    
        // AccountTable.updateSessionId( {
        //     sessionId: session.id,
        //     userName : hash(username)
        // })
        // .then( () => {});
            res.cookie('session' , sessionString , {
                expire : Date.now() + 3600000,
                httpOnly : false,  
        })
        .then(  resolve( { message : 'session created' , type: 'success'}) )
        .catch( error => reject(error));;  
});
}

module.exports = { setSession };
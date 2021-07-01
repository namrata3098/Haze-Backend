const e = require('express');
const {Router} = require('express');
const AccountTable = require('../login/table');
const { hash } = require('../login/helper');
const { setSession } = require ('./helper');
const Session = require('../login/session');


const router = new Router();

router.post('/signup' , ( req , res , next) => {
    const { username , password } = req.body;

    const userName = username;
    const passWord = hash(password);

    AccountTable.getAccount( { userName }).then( ({ account }) => {
        if(!account) {
            AccountTable.storeAccount( { userName , passWord })
        }
        else {
            const error = new Error('This username already exsist');
            error.statusCode = 409;
            throw error;
        }
    })
    .then(() => 
    {   
        return setSession({ userName , res});
    })
    .then(( { message }) => res.json( { message}))
    .catch( error => next(error)); 
})

router.post('/login' , (req , res , next) => {
    const { username , password } = req.body;

    const userName = username;

    AccountTable.getAccount(( { userName}))
    .then( ({ account }) => {
        if(account && account.passWord === hash(password)){
           return setSession({ userName , res})
        }
        else {
            const error = new Error('Incorrect username / password ');

            error.statusCode = 409;
            throw error;
        }
    }).then(( { message , type }) => res.json( { message , type }) )
    .catch( error => next(error))

})

router.get('/logout' , ( req , res , next ) => {
    const userName = Session.parse(req.cookies.session);
    res.clearCookie('session');
    res.json ( { message : 'Loged out' , type: 'success'})
})

module.exports = router;
const { response } = require('express');
const pool = require('../../databasePool');

class AccountTable{
    static storeAccount( { userName, passWord }) {
         
        return new Promise( (resolve , reject ) => {
            pool.query('INSERT INTO account("userName" , "passWord") VALUES($1 , $2)' ,
            [userName , passWord],
            (error , response ) => {
                if(error) return reject(error)

                resolve();
            })

        });
    }

    static getAccount( { userName }) {
        return new Promise((resolve , reject) => {
            pool.query('SELECT id , "passWord" FROM account WHERE "userName" = $1' ,
             [userName], 
             (error , response) => {
                 if(error) return reject(error);
                 resolve({ account : response.rows[0]})
             })
        })
    }

    static updateSessionId ( { sessionId , userName }){
        console.log('session' , sessionId , userName)
        return new Promise ((resolve , reject) => {
            pool.query( 'UPDATE account SET "sessionId"=$1 WHERE "userName"=$2') ,
            [sessionId , userName],
            (error , response ) => {
                if(error) return reject(error);

                resolve();
            }
        })
    }
}

module.exports = AccountTable;
 

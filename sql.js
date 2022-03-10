import { createRequire } from "module";
const require = createRequire(import.meta.url);
export class sql {
    connection = null;
    mysql;
    constructor() {
        this.mysql = require('mysql');
        this.connection = this.mysql.createConnection({
            host:'localhost',
            user:'root',
            database:'exm',
            password:''
        });
    }

    sqlReturn(){
        let sql = "SELECT * FROM USERS";
        this.connection.query(sql, function(err, rows, fields) {
            if (err) {
                return console.error("Ошибка: " + err.message);
            }
            else {
                console.log("Подключение к серверу MySQL успешно установлено");
            }
            for(let a = 0;a < rows.length;a++){
                console.log(rows[a]);
            };
        });
    }

    sqlUserNameCheck(username){
        //this.connection.connect();
        let sql = "SELECT userName FROM USERS";
        let isTrue = null;
        this.connection.query(sql, function(err, rows, fields) {
            if (err) {
                return console.error("Ошибка: " + err.message);
            }
            else {
                console.log("Подключение к серверу MySQL успешно установлено");
            }
            for(let a = 0;a < rows.length;a++){
                if(rows[a].userName == username){
                    isTrue = "Username has been created early";
                }
            };
        });
        //this.connection.end();
        return isTrue;
    }

    sqlInsert(email,username,password){
        console.log(typeof email);
        this.connection.connect();
        let sql_form = 'INSERT INTO Users(email,userName,passWord) VALUES (\''+ email +'\',\''+ username +'\',\''+ password +'\')';
        this.connection.query(sql_form);
        this.sqlReturn();
        this.connection.end();
    }

}
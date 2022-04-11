import React, {useContext, useState} from 'react';
import {Context} from "../index";

const LoginForm = () => {
    const [email,setMail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const {store} = useContext(Context);
    return (
        <div>
            <input
                type='text'
                value={email}
                onChange={e => setMail(e.target.value)}
                placeholder='Email'
            />
            <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Пароль'
            />
            <button onClick={() => store.login(email,password)}>Войти</button>
            <button onClick={() => store.registration(email,password)}>Регистрация</button>
            </div>
    );
};

export default LoginForm;
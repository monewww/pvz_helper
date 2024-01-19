import React, { useState } from 'react';
import './loginpage.css';

function RegisterPage() {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [anotherPassword, setAnotherPassword] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleAnotherPasswordChange = (event) => {
        setAnotherPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    function check(name,email, password, anotherPassword) {
        if (name===''){
            alert('用户名不能为空');
            return;
        }
        if (email===''){
            alert('邮箱不能为空');
            return;
        }
        if (password !== anotherPassword) {
            alert('两次输入的密码不一致');
            return;
        }
        const data = { username: name,email:email, password: password };
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(data => {
                data=JSON.parse(data);
                if (data.status === 'success') {
                    alert('success');
                }
                else {
                    alert('failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    return (
        <div className='centerContainer'>
            <div className='loginTable'>
                <input className='inputBox'
                    type="text"
                    value={username}
                    onChange={handleNameChange}
                    placeholder="用户名"
                />
                <br />
                <input className='inputBox'
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="邮箱"
                />
                <br />
                <input className='inputBox'
                    type="text"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="密码"
                />
                <br />
                <input className='inputBox'
                    type="text"
                    value={anotherPassword}
                    onChange={handleAnotherPasswordChange}
                    placeholder="再次输入密码"
                />
                <br />
                <button className='registerButton' onClick={() => check(username,email,password,anotherPassword)}>注册</button>
            </div>
        </div>
    );
}

export default RegisterPage;

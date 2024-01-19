import React, { useState } from 'react';
import './loginpage.css';

function LoginPage() {
  // 使用 useState 创建多个状态变量来分别存储输入框的值
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 创建独立的处理函数
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function check(email, password) {
    const data = { email:email, password: password };
    // 改为服务器地址
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
      if (data==='failed'){
        alert('failed');
      }
      else{
        window.location.href='/user';
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
        <button className='loginButton' onClick={() => check(email,password)}>登录</button>
        <button className='registerButton' onClick={() => window.location.href='/register'}>注册</button>
      </div>
    </div>
  );
}

export default LoginPage;

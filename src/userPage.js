
import './userPage.css';
import React from 'react';
import usericon from './img/testicon.png';
import { useState, useEffect } from 'react';
import { Drawer, Typography } from 'antd';

function UserPage(){
    const [showCheckDelect, setShowCheckDelect] = useState(false);
    const [showAccount, setShowAccount] = useState('');
    const [addingAccount, setAddingAccount] = useState(false); // 用于控制添加账号窗口的显示与否
    const [showLogPage, setShowLogPage] = useState(false); // 用于控制助手日志窗口的显示与否

    const [userinfo, setUserInfo] = useState({username: 'username1', email: 'email'});
    const [nickname, setNickname] = useState('');
    const [accountList, setAccountList] = useState([]);
    const [selectFile, setSelectFile] = useState(null);
    const [description, setDescription] = useState('');

    function checkDelect(){
        setShowCheckDelect(true);
    }

    function deletecount(username){
        const data = { username: username};
        fetch('http://localhost:8080/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(data => {
            if (data==='删除成功'){
                window.location.href='/login';
            }
            else{
                alert('failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function AccountChoose(account){
        setShowAccount(account);
        setShowLogPage('');
    }   

    function AccountSelecter({accountList}){
        return (
            <div className='accountList'>
                <ul>
                    {accountList.map((account) => (
                        <li><button onClick={()=>AccountChoose(account)}>{account}</button></li>
                    ))}
                </ul>
            </div>
        )
    }

    function addAccount(){
        if (nickname===''){
            alert('请输入账号名');
            return;
        }
        if (selectFile===null){
            alert('请选择文件');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectFile);
        fetch('http://localhost:8080/api/addAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                username: userinfo.username,
                nickname: nickname,
                description: description,
                formData: formData
            }
            )
        })
        .then(response => response.text())
        .then(data => {
            if (data==='创建成功'){
                accountList.push(nickname);
                setAccountList(accountList);
                setAddingAccount(false);
            }
            else{
                alert('failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function handleNickNameChange(e){
        setNickname(e.target.value);
    }

    useEffect(() => {
        // 发起请求获取后端数据
        fetch('/api/getUserData')
          .then(response => response.json())
          .then(userinfo => {
            setUserInfo(userinfo);
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }, []);

    const hanleFileChange = (e) => {
        setSelectFile(e.target.files[0]);
    }


    return(
        <div className='container'>
            <div className='leftcontainer'>
                <div className='userinfo'>
                    <img src={usericon} alt="usericon" style={{ width: '10', height: '10'}}/>
                    <br/>
                    <p>{userinfo.username}</p>
                    <p>{userinfo.email}</p>
                    <button onClick={()=>checkDelect()}>注销用户</button>
                </div>
                <div className='userorder'>
                    <ul>
                        <button onClick={()=>setShowLogPage("assistantLog")}>任务日志</button>
                        <button onClick={()=>setShowLogPage("accountManage")}>账号管理</button>
                        <button onClick={()=>setShowLogPage("accountSchedule")}>账号进度</button>
                    </ul>
                </div>
                
            </div>
            {showLogPage !== "" && (
                <div className='dropdown'>
                    {showLogPage === "assistantLog"&&(<p>任务日志</p>)}
                    {showLogPage === "accountManage"&&(<p>账号管理</p>)}
                    {showLogPage === "accountSchedule"&&(<p>账号进度</p>)}
                </div>
                )}
            {showCheckDelect&&(<div className='centerPart'>
                <p>确认注销用户？</p>
                <div className='checkdeletebutton'>
                    <button onClick={()=>deletecount(userinfo.username)}>确认</button>
                    <button onClick={()=>setShowCheckDelect(false)}>取消</button>
                </div>
            </div>
            )}
            {showAccount&&(<div className='accountinfo'>
                <p>账号：{showAccount}</p>
                {description&&(<p>描述：{description}</p>)}
            </div>
            )}
            {addingAccount&&(<div className='centerPart'>
                <p>添加账号</p>
                <p>请上传账号文件</p>
                <input type='text' value={nickname} placeholder='账号名' onChange={handleNickNameChange}/>
                <input type='text' value={description} placeholder='账号描述(可为空)' onChange={(e)=>setDescription(e.target.value)}/>
                <input type='file' onChange={hanleFileChange}/>
                <div className='addAccountbutton'>
                    <button onClick={()=>addAccount()}>确认</button>
                    <button onClick={()=>setAddingAccount(false)}>取消</button>
                </div>
            </div>
            )}
            <div className='rightcontainer'>
                <div className='account'>
                    <p>账号列表</p>
                    <AccountSelecter accountList={accountList}/>
                    <button className='addAccountButton' onClick={()=>setAddingAccount(true)}>添加账号</button>
                </div>
            </div>
            <button className='startbutton'>开始任务</button>
        </div>
    )
}

export default UserPage;
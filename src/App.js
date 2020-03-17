import React, {useState, useEffect} from 'react';
import './App.css';
import MsgBoard from './Components/msgBoard';
import Input from './Components/Input';
import 'bootstrap/dist/css/bootstrap.min.css';
import Socket from './utils/socket'



function App() {
  const [currentUser, setCurrentUser] = useState('')
  const [conversations, setConversations] = useState([])
  const [userList, setUserList] = useState([])

useEffect(()=>{
  Socket.emit('NEW_USER')

  Socket.on('GET_CURRENT_USER', user => {
    // console.log(user.username)
    setCurrentUser(user.username)
  })

  Socket.on('UPDATE_USER_LIST', users => {
    // console.log(users)
    setUserList(users)
  })
  Socket.on("RECEIVE_BROADCAST", data=>{
    // console.log(data)
    setConversations((latestConversations)=>{
      return [...latestConversations,data]
    })
  })

  
},[])


  return (
    <div className="App">
      <div style = {{width:"80vw"}}>
        <MsgBoard conversations = {conversations} currentUser = {currentUser}></MsgBoard>
        <Input currentUser = {currentUser}></Input>    
      </div>
      <div>
        
          {
            userList.map((user) => {
              let avatar = `https://api.adorable.io/avatars/50/${user.username}.png`
              return (
                <div style = {{display:"flex"}}>
                  <img src = {avatar} style = {{borderRadius:"20%"}}></img>
                  <div style = {{marginTop:"10px"}}>{user.username}</div>
                </div>
              )
            })
          }
        
      </div>
    </div>
  );
}

export default App;

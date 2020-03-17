import React, {useState, useEffect, useRef} from 'react'
import socket from '../utils/socket'
import Scroll from 'react-scroll'


const Input = (props) =>{
    const {currentUser} = props
    const [text, setText] = useState('')
    let avatar = `https://api.adorable.io/avatars/80/${currentUser}.png`
    const formRef = useRef()


    const textInput = (e) => {
        // console.log(e.target.value)
        setText(e.target.value)
        if(e.keyCode === 13){
            e.preventPropagation()
            // console.log('you pressed enter')
            e.preventDefault()
        }
    }

    const submitForm = (e) => {
        // console.log("Submit triggered")
        e.preventDefault()
        
        // let arr = [...conversations]
        // arr.push({
        //     username: currentUser,
        //     message:text,
        //     timestamp: Date.now()
        // })
        // setConversations(arr)
        socket.emit("BROADCAST_MESSAGE",{
            username: currentUser,
            message:text,
            timestamp: Date.now()
        } )
        setText('')
        // console.log(conversations)
        // const scrollToEnd = () => {
        //     Scroll.animateScroll.scrollToBottom()
        // }
    
        // scrollToEnd()
    }

    const validateInput = () => {
        if(text.trim() === ""){
            return true
        }else{
            return false
        }
    }

    const msgBoardRef = useRef()

    const scrollMsgBoard = () => {
        if(msgBoardRef.current){
            console.log( msgBoardRef.current.scrollHeight)
            
            msgBoardRef.current.scrollTop = msgBoardRef.current.scrollHeight
        }
    }
    setTimeout(scrollMsgBoard(),2000)

    const checkKeyInput = (e) => {
        let key = e.key
        if(key === "Enter"){
            e.preventDefault()
            // console.log('you pressed enter')
            formRef.current.dispatchEvent(new Event('submit'))
            // socket.emit("BROADCAST_MESSAGE",{
            //     username: currentUser,
            //     message:text,
            //     timestamp: Date.now()
            // } )
            // setText('')
            
        }
    }

    
    return (
        <div id = "inputBar">
            <div id = "currentUser">
                <img style = {{borderRadius:"20%"}} src = {avatar} />
                <p>{currentUser}</p>
                
            </div>
            <div id = "textArea">
                <form id = "sendMsg" onSubmit = {(e)=>submitForm(e)} ref={formRef}>
                    <div style = {{display:"flex"}}>
                        {/* <div> */}
                            <textarea form = "sendMsg" cols = "150" rows = "4" maxLength = "500" wrap = "hard" value = {text} onChange = {(e)=>textInput(e)} onKeyPress = {(e)=>checkKeyInput(e)}></textarea>
                        {/* </div> */}
                        <div>
                            <input disabled = {validateInput()} type = "submit" style = {{height: "70px", width:"60px", margin:"0px", padding:"0px"}}></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Input
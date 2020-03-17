import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import Scroll, {animateScroll} from 'react-scroll'
// import {animateScroll} from 'react-scroll'

const MsgBoard =(props) =>{
    const {conversations, currentUser} = props

    const scrollToEnd = () => {
        animateScroll.scrollToBottom({
            containerId: "msgBoard"
        })
    }

    useEffect(()=>{
        scrollToEnd()
    },[conversations])
    
    // let test = document.querySelector("#msgBoard")
    return (
        <div id = "msgBoard">
        {/* <div id = "msgBoard" ref={msgBoardRef}> */}

            
            {
                conversations.map((item) => {
                    return(
                        //if the username sent from the server, the background color will be different
                        <div className={"indiMsg" + (currentUser == item.username ? " currentUser" : "")}>
                            <div >{`${item.username}: `}</div>
                            <div >{item.message}</div>
                            <div style = {{color:"lightgrey", fontSize:"16px"}}> {moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</div>
                        </div>
                        
                    )
                })
            }
            
        </div>
        
    )
}

export default MsgBoard
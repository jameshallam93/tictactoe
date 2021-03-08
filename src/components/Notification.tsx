import React from "react"


const Notification = (props: {notice: string}) =>{
    return(
        <div className = "notification">
            <h3>{props.notice}</h3>
        </div>
    )
}


export default Notification
import React from 'react'

const UserOutput = (props) => {
    return (
        <div>
            <p style={style.name}>{props.userName}</p>
            <p>This is another paragraph</p>
        </div>
    )
}

const style = {
    name:{
        fontSize: '32px'
    }

}
export default UserOutput
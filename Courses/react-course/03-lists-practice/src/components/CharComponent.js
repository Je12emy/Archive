import React from 'react';

const CharComponent = ({char, deleteChar}) => {
    return (
            <span className='char' onClick={deleteChar} >{char}</span>
    )
}


export default CharComponent
import React from 'react'

const ValidationComponent = ({inputLength}) => {
    const isValid = () => {
        if(inputLength >= 5){
            return true
        }
        return false
    }

    return (
        <div>
        { isValid() ?
            (
                <p style={style.validator, style.validValue} >
                    Text is Long Enough               
                </p>
            )
            : <p style={style.validator, style.invalidValue}> Text is NOT Long Enough </p>
        }
        </div>
    )
};

const style = {
    validator: {
        fontSize: "11px",
    },
    validValue: {
        color: "green"
    },
    invalidValue: {
        color: "red"
    }
}

export default ValidationComponent;
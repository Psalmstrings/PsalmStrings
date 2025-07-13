const Button = ({text, handleClick, icon})=>{
    return(
        <button style={{marginRight:"30px"}}>{text}, {handleClick}</button>
    )
}

export default Button
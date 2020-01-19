import React from 'react';
import './Button.css'
function Button(props) {
  const { name, color} = props;
  return (
    <div>
     <button className="button" style={{ backgroundColor : `${color}`}} onClick={props.onClick}>{name}</button>
    </div>
  );
}

export default Button;

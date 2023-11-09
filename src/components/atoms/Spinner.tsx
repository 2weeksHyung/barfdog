import React from 'react';
import styledComponents from 'styled-components';
import { ImSpinner2 } from 'react-icons/im';
import { CgSpinner } from 'react-icons/cg';

const Wrap = styledComponents.i`
    display:flex;
    align-items: center;
    justify-content:center;
    pointer-events:none;
    // opacity:0;
    animation: rotate ${(props) => props.speed}s linear infinite !important;
    
    &.floating{
      position:absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
    }
    
    @keyframes rotate {
      from{transform:rotate(0);}
      to{transform:rotate(360deg);}
    }
  `;

interface PropsInterface {
  style?: {
    width?: string;
    height?: string;
    color?: string;
  };
  speed?: string;
  floating?: boolean;
}

const Spinner = ({ style, speed = '0.6', floating, ...props }:PropsInterface) => {
  const defaultStyle = {
    ...style,
    width: style?.width || '20',
    height: style?.height || '20',
    color: style?.color || 'var(--color-main)',
  };
  
 

  return (
    <Wrap className={`spinner ${floating ? 'floating' : ''}`} speed={speed} {...props}>
      <ImSpinner2 style={defaultStyle} />
    </Wrap>
  );
};

export default Spinner;

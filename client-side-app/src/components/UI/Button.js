import React from 'react'
import styles from './Button.module.css'

export default function Button( props ) {
    const clickHandler = ( event ) => {
        props.onClick( event )
    }

    const buttonCategory =
        props.label === "next"
            ? styles[ "button-next" ]
            : props.label === "speech"
                ? styles[ "button-speech" ]
                : "";

    return (
        <button onClick={ clickHandler } className={ `${ styles[ `button` ] } ${ buttonCategory }` } value={ props.content }>{ props.content }</button>
    )
}

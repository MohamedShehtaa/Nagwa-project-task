import React from 'react'

import styles from './WordContainer.module.css'
export default function WordContainer( props ) {
    return (
        <div className={ styles[ `word-container` ] }>
            <div className={ styles[ `word` ] }>{ props.word }</div>
        </div>
    )
}

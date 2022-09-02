import React from 'react'

import styles from './AppContainer.module.css'

export default function AppContainer( props ) {
    return (
        <div className={ styles[ `question-container` ] }>{ props.children }</div>
    )
}

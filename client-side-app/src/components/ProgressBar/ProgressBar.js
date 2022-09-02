import React from 'react'

import styles from "./ProgressBar.module.css"

export default function ProgressBar( props ) {
    let barFillWidth = "0%";
    if ( props.maxValue > 0 ) {
        barFillWidth = Math.round( ( props.value / props.maxValue ) * 100 ) + "%";
    }
    return (
        <div className={ styles[ `progress-bar` ] }>
            <div className={ styles[ `progress-bar__inner` ] }>
                <div className={ styles[ `progress-bar__fill` ] } style={ { width: barFillWidth } }></div>
            </div>
        </div>
    )
}

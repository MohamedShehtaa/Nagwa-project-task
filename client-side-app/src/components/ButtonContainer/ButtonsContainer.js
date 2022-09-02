import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";

import Button from "../UI/Button";
import styles from "./ButtonsContainer.module.css";
import { increseScore } from "../../app/features/appSlice";

export default function ButtonsContainer( props ) {

    const posArray = [ "adverb", "verb", "noun", "adjective" ];
    const [ message, setMessage ] = useState( "" );
    const [ messageColor, setMessageColor ] = useState( "" );
    const dispatch = useDispatch();
    const posValueHandler = ( event ) => {
        console.log( event.target.disabled );
        props.showNext( true );
        if ( event.target.value === props.pos ) {
            dispatch( increseScore() )
            setMessage( "Correct Answer" );
            setMessageColor( "#36d399" );
        } else {
            setMessage( "Wrong Answer" );
            setMessageColor( "red" );
        }
    };
    return (
        <>
            <div
                className={ styles[ `btn-container` ] }
                style={ { borderColor: `${ props.pressNext ? messageColor : "" }` } }>
                { posArray.map( ( pos ) => (
                    <Button
                        onClick={ posValueHandler }
                        key={ pos }
                        content={ pos }
                        label={ "speech" }
                    />
                ) ) }
            </div>
            { props.pressNext && (
                <p
                    className={ styles[ "message-style" ] }
                    style={ { color: `${ messageColor }` } }>
                    { message }
                </p>
            ) }
        </>
    );
}

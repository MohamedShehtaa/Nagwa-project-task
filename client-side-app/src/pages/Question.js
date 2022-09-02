import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";

import ButtonsContainer from "../components/ButtonContainer/ButtonsContainer";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import Button from "../components/UI/Button";
import WordContainer from "../components/wordContainer/WordContainer";
import styles from "./Qustion.module.css";
import { useGetWordsQuery } from "../services/wordsApi";
import { increaseCounter, setRank } from "../app/features/appSlice";
import AppContainer from '../components/UI/AppContainer'
import { usePostScoreMutation } from '../services/rankApi'

export default function Question() {
    console.log( "hi" )
    const { data, IsError, isLoading } = useGetWordsQuery();
    const [ nextState, setNextState ] = useState( false );
    const [ postScore ] = usePostScoreMutation();
    const appStore = useSelector( ( state ) => state.appStore );
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const count = appStore.count;
    const score = appStore.score * 10;


    const dataElmentNo = count < 9 ? count : count - 1;

    const counterHandler = async () => {
        setNextState( false )

        if ( count < 10 ) {
            dispatch( increaseCounter() );
        } else if ( count === 10 ) {
            const res = await postScore( { score: score } );
            dispatch( setRank( res.data.rank ) )
            navigate( '/rank' )

        }

    };

    return (
        <>
            { isLoading && <p className={ styles[ "center-text" ] }>IS LOADING...</p> }
            { IsError && (
                <p className={ styles[ "center-text" ] }>SOMTHING WENT WRONG...</p>
            ) }
            { data && (
                <AppContainer>
                    <p className={ styles[ "question-counter" ] }> { count }/10</p>
                    <ProgressBar value={ count * 10 } maxValue={ 100 } />
                    <h1 className={ styles[ `word-question` ] }>
                        Which part of speech does the word belong to?
                    </h1>
                    <WordContainer word={ data[ dataElmentNo ].word } />
                    <ButtonsContainer pos={ data[ dataElmentNo ].pos } showNext={ setNextState } pressNext={ nextState } />
                    { nextState && <Button content={ "Next" } label={ "next" } onClick={ counterHandler } /> }
                </AppContainer>
            ) }
        </>
    );
}

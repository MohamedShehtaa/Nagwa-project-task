import React from 'react'
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";

import AppContainer from '../components/UI/AppContainer'
import Button from '../components/UI/Button'
import styles from './YourScore.module.css'
import { restApp } from '../app/features/appSlice'

export default function YourScore() {
    const appStore = useSelector( state => state.appStore );
    const score = appStore.score * 10;
    const rank = appStore.rank

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const playAgainHandler = () => {
        navigate( '/' )
        dispatch( restApp() )
    }
    return (
        <AppContainer>
            <p className={ styles[ 'score-style__text' ] }> Your Score <span className={ styles[ 'score-style__NO' ] }>{ score }</span> </p>
            <p className={ styles[ 'score-style__text' ] }> Your Rank <span className={ styles[ 'score-style__NO' ] }>{ rank } </span> </p>
            <Button content={ "PLAY AGAIN" } label={ "next" } onClick={ playAgainHandler } />

        </AppContainer>
    )
}

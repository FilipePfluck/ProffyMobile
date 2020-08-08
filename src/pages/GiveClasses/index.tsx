import React from 'react'
import {ImageBackground} from 'react-native'

import giveClassesBackground from '../../assets/images/give-classes-background.png'

import * as S from './styles'

const GiveClasses: React.FC = ()=>{
    return(
        <S.Container>
            <ImageBackground source={giveClassesBackground} style={{flex: 1, justifyContent: 'center'}}>

            </ImageBackground>
        </S.Container>
    )
}

export default GiveClasses
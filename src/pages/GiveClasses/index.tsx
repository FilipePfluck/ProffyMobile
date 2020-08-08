import React from 'react'
import {ImageBackground} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import giveClassesBackground from '../../assets/images/give-classes-background.png'

import * as S from './styles'

const GiveClasses: React.FC = ()=>{
    const { goBack } = useNavigation()

    return(
        <S.Container>
            <ImageBackground 
                resizeMode="contain" 
                source={giveClassesBackground} 
                style={{flex: 1, justifyContent: 'center'}}
            >
                <S.Title>Quer ser um Proffy?</S.Title>
                <S.Description>Para começar, você precisa se cadastrar na plataforma web.</S.Description>
            </ImageBackground>
            <S.Button onPress={goBack}>
                <S.ButtonText>
                    Entendi
                </S.ButtonText>
            </S.Button>
        </S.Container>
    )
}

export default GiveClasses
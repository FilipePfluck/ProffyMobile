import React, { useState, useEffect } from 'react'
import { Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

import landing from '../../assets/images/landing.png'
import study from '../../assets/images/icons/study.png'
import giveClasses from '../../assets/images/icons/give-classes.png'
import heart from '../../assets/images/icons/heart.png'

import * as S from './styles'

const Landing:React.FC = ()=>{
    const navigation = useNavigation()

    const [connections, setConnections ] = useState(0)

    useEffect(()=>{
        api.get('/connections').then(response => {
            setConnections(response.data)
        })
    },[])

    return(
        <S.Container>
            <S.LandingImage source={landing} />
            <S.Title>
                Seja bem vindo, {'\n'}
                <S.TitleBold>
                    O que deseja fazer?
                </S.TitleBold>
            </S.Title>
            <S.ButtonsContainer>
                <S.Button 
                    color="#9871f5"
                    onPress={()=>{navigation.navigate('Study')}}
                >
                    <Image source={study} />
                    <S.TextButton>Estudar</S.TextButton>
                </S.Button>
                <S.Button 
                    color="#04d361" 
                    onPress={()=>{navigation.navigate('GiveClasses')}}
                >
                    <Image source={giveClasses} />
                    <S.TextButton>Dar aulas</S.TextButton>
                </S.Button>
            </S.ButtonsContainer>
            <S.TotalConnections>
                Total de {connections} conexões realizadas {'  '}
                <Image source={heart} />
            </S.TotalConnections>
        </S.Container>
    )
}

export default Landing
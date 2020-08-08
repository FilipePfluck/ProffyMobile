import React from 'react'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/Feather'

import back from '../../assets/images/icons/back.png'
import logo from '../../assets/images/logo.png'

import * as S from './styles'

interface PageHeaderProps {
    title: string
}

const Header:React.FC<PageHeaderProps> = ({title}) => {
    const {navigate} = useNavigation()
    
    return(
        <S.Container>
            <S.TopBar>
                <S.Button onPress={()=>navigate('Landing')}>
                    <Image source={back}/> 
                </S.Button>
                <Image source={logo}/>
            </S.TopBar>
            <S.Title>{title}</S.Title>
        </S.Container>
    )
}

export default Header
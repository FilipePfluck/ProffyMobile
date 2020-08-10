import React, {ReactNode} from 'react'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/Feather'

import back from '../../assets/images/icons/back.png'
import logo from '../../assets/images/logo.png'

import * as S from './styles'

interface PageHeaderProps {
    title: string
    headerRight?: ReactNode
}

const Header:React.FC<PageHeaderProps> = ({title, children, headerRight}) => {
    const {navigate} = useNavigation()
    
    return(
        <S.Container>
            <S.TopBar>
                <S.Button onPress={()=>navigate('Landing')}>
                    <Image source={back}/> 
                </S.Button>
                <Image source={logo}/>
            </S.TopBar>
            <S.Header>
                <S.Title>{title}</S.Title>
                {headerRight}
            </S.Header>
                
            {children}
        </S.Container>
    )
}

export default Header
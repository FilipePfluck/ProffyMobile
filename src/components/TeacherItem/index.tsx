import React, { useCallback, useState } from 'react'
import { Image, Linking } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

import heartOutline from '../../assets/images/icons/heart-outline.png'
import unfavorite from '../../assets/images/icons/unfavorite.png'
import whatsapp from '../../assets/images/icons/whatsapp.png'

import * as S from './styles'

interface Teacher{
    avatar: string
    bio: string
    cost: number
    id: number
    name: string
    subject: string
    user_id?: number
    whatsapp: string
}

interface TeacherItemProps{
    teacher: Teacher
    favorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorited}) => {
    const handleWhatsapp = useCallback(()=>{
        api.post('/connections', {
            user_id: teacher.id
        })

        Linking.openURL(`whatsapp://send?phone=+55${teacher.whatsapp}`)
    },[teacher.whatsapp])

    const [isFavorited, setIsFavorited] = useState(favorited)

    async function toggleFavorite() {
        const favorites = await AsyncStorage.getItem("favorites");
        let favoritesArray: Array<any> = [];
    
        if (favorites) {
          favoritesArray = JSON.parse(favorites);
        }
    
        if (isFavorited) {
          const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
            return teacher.id === teacherItem.id;
          });
    
          favoritesArray.splice(favoriteIndex, 1);
          setIsFavorited(false);
        } else {
          favoritesArray.push(teacher);
          setIsFavorited(true);
        }

        await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
    }

    return(
        <S.Container>
            <S.Profile>
                <S.Avatar source={{uri: teacher.avatar}}/>
                <S.ProfileInfo>
                    <S.Name>{teacher.name}</S.Name>
                    <S.Subject>{teacher.subject}</S.Subject>
                </S.ProfileInfo>
            </S.Profile>
            <S.Bio>{teacher.bio}</S.Bio>
            <S.Footer>
                <S.Price>
                    Preço/hora: {'   '}
                    <S.PriceValue>R$ {teacher.cost}</S.PriceValue>
                </S.Price>
                <S.ButtonsContainer>
                    <S.FavoriteButton 
                        favorited={isFavorited}
                        onPress={toggleFavorite}
                    >
                        <Image source={isFavorited ? unfavorite : heartOutline } />
                    </S.FavoriteButton>
                    <S.ContactButton onPress={handleWhatsapp}>
                        <Image source={whatsapp}/>
                        <S.ContactButtonText>Entrar em contato</S.ContactButtonText>
                    </S.ContactButton>
                </S.ButtonsContainer>
            </S.Footer>
        </S.Container>
    )
}

export default TeacherItem
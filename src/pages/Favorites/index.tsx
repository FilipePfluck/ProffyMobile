import React, {useState, useEffect} from 'react'
import { useIsFocused } from "@react-navigation/native"

import Header from '../../components/header'
import TeacherItem from '../../components/TeacherItem'

import AsyncStorage from '@react-native-community/async-storage'

import { ScheduleItem, Teacher } from '../../interfaces'

import api from '../../services/api'

import * as S from './styles'

const Favorites:React.FC = () => {
    const isFocused = useIsFocused()

    const [favorites, setFavorites] = useState([])

    function loadFavorites() {
        AsyncStorage.getItem("favorites").then((response) => {
          if (response) {
            const favoritedTeachers = JSON.parse(response);
            
            setFavorites(favoritedTeachers)
          }
        })
    }

    useEffect(()=>{
        loadFavorites()
    },[isFocused])

    return(
        <S.Container>
            <Header title="Meus proffys favoritos"/>
            <S.TeacherList
                contentContainerStyle={{
                    paddingBottom: 16
                }}
            >
                {favorites.map((teacher: Teacher) => (
                    <TeacherItem 
                        key={teacher.id}
                        teacher={teacher}
                        favorited
                    />
                ))}

            </S.TeacherList>
        </S.Container>
    )
}

export default Favorites
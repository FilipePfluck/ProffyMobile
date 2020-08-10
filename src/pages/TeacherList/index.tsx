import React, { useState, useCallback, useEffect } from 'react'
import { Linking } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useFocusEffect } from "@react-navigation/native"

import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

import Header from '../../components/header'
import TeacherItem from '../../components/TeacherItem'

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

const TeacherList:React.FC = () => {
    const [isFilterVisible, setIsFilterVisible] = useState(false)

    const [favorites, setFavorites] = useState<number[]>([])
    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function loadFavorites() {
        AsyncStorage.getItem("favorites").then((response) => {
          if (response) {
            const favoritedTeachers = JSON.parse(response);
            const favoritedTeachersIds = favoritedTeachers.map(
              (teacher: Teacher) => {
                return teacher.id
              }
            );
    
            setFavorites(favoritedTeachersIds)
          }
        })
    }

    useFocusEffect(() => {
        loadFavorites()
    })

    const handleFiltersSubmit = useCallback(async ()=>{
        loadFavorites()

        const response = await api.get('/classes', {
            params:{
                subject, 
                week_day, 
                time
            }
        })

        setTeachers(response.data)
        setIsFilterVisible(false)
    },[subject, week_day, time])

    return(
        <S.Container>
            <Header 
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={()=>setIsFilterVisible(!isFilterVisible)}>
                        <S.FilterButtonText>Filtros</S.FilterButtonText>
                    </BorderlessButton>
                )}
            >
                {isFilterVisible && (
                    <S.SearchForm>
                        <S.Label>Matéria</S.Label>
                        <S.Input 
                            placeholder="Qual a matéria?"
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />

                        <S.InputGroup>
                            <S.InputBlock>
                                <S.Label>Dia da semana</S.Label>
                                <S.Input 
                                    placeholder="Qual dia?"
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                />
                            </S.InputBlock>
                            <S.InputBlock>
                                <S.Label>Horário</S.Label>
                                <S.Input 
                                    placeholder="Qual hora?"
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                />
                            </S.InputBlock>
                        </S.InputGroup>

                        <S.SubmitButton onPress={handleFiltersSubmit}>
                            <S.SubmitButtonText>
                                Filtrar
                            </S.SubmitButtonText>
                        </S.SubmitButton>
                    </S.SearchForm>
                )}
            </Header>

            <S.TeacherList
                contentContainerStyle={{
                    paddingBottom: 16
                }}
            >
                {!!!teachers[0] && (
                    <S.NothingFound>
                        Desculpe, não foi encontrado nenhum professor. 
                        Tente alterar os filtros
                    </S.NothingFound>
                )}

                {teachers.map((teacher: Teacher) => (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id)}    
                    />
                ))}

            </S.TeacherList>
        </S.Container>
    )
}

export default TeacherList
import React, { useState, useCallback, useEffect } from 'react'
import { FlatList } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useIsFocused } from "@react-navigation/native"
import RNPickerSelect from 'react-native-picker-select'
import {Picker} from '@react-native-community/picker'

import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

import { ScheduleItem, Teacher } from '../../interfaces'

import Header from '../../components/header'
import TeacherItem from '../../components/TeacherItem'

import * as S from './styles'

const TeacherList:React.FC = () => {
    const isFocused = useIsFocused()

    const [isFilterVisible, setIsFilterVisible] = useState(false)

    const [favorites, setFavorites] = useState<number[]>([])

    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [filteredTeachers, setFIlteredTeachers] = useState<Teacher[]>([])
    const [orderedFilteredTeachers, setOrderedFilteredTeachers] = useState<Teacher[]>([])

    const [page, setPage] = useState(1)

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

    const handleFiltersSubmit = useCallback(async ()=>{
        loadFavorites()

        let filteredArray = teachers

        if(subject){
            filteredArray = filteredArray.filter(teacher => {
                return teacher.subject === subject
            })
        }

        if(week_day){
            filteredArray = filteredArray.filter(teacher => {
                return teacher.schedule.some(scheduleItem => {
                    return scheduleItem.week_day === Number(week_day)
                })
            })
        }

        if(time){
            filteredArray = filteredArray.filter(teacher => {
                return teacher.schedule.some(scheduleItem => {
                    if(week_day){
                        return (
                            scheduleItem.week_day === Number(week_day)
                            && scheduleItem.from <= Number(time)
                            && scheduleItem.to > Number(time)
                        )
                    }else{
                        return (
                            scheduleItem.from <= Number(time)
                            && scheduleItem.to > Number(time)
                        )
                    }
                })
            })
        }

        setFIlteredTeachers(filteredArray)
        setIsFilterVisible(false)
        setPage(1)

    },[subject, week_day, time])

    useEffect(()=>{
        loadFavorites()

        api.get('/classes').then(response => {
            const res = response.data.map((teacher: Teacher) => {
                return {
                    ...teacher,
                    schedule: teacher.schedule.map(scheduleItem => {
                        return {
                            ...scheduleItem,
                            from: scheduleItem.from/60,
                            to: scheduleItem.to/60
                        }
                    })
                }
            })

            setTeachers(res)
            setFIlteredTeachers(res)
            setOrderedFilteredTeachers(res.slice(0, 4))
        })

    },[])

    useEffect(()=>{
        setOrderedFilteredTeachers(
            filteredTeachers.slice(0, page * 5)
        )

    },[page, filteredTeachers])

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
                                <S.Label>Dia da Semana</S.Label>
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
            
            {!!!orderedFilteredTeachers[0] && (
                <S.NothingFound>
                    Desculpe, não foi encontrado nenhum professor. 
                    Tente alterar os filtros
                </S.NothingFound>
            )}

            <FlatList
                style={{marginTop: -20}}
                data={orderedFilteredTeachers}
                keyExtractor={teacher => String(teacher.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={()=>{setPage(page+1)}}
                onEndReachedThreshold={0.2}
                renderItem={({ item: teacher})=>(
                    <TeacherItem 
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id)}    
                    />
                )} 
            >

            </FlatList>

            
        </S.Container>
    )
}

export default TeacherList
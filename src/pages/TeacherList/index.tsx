import React, { useState, useCallback, useEffect } from 'react'
import { FlatList } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useIsFocused } from "@react-navigation/native"
import RNPickerSelect from 'react-native-picker-select'
import {Picker} from '@react-native-community/picker'
import {
    ItemValue
  } from '@react-native-community/picker/typings/Picker'

import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

import { ScheduleItem, Teacher } from '../../interfaces'

import Header from '../../components/header'
import TeacherItem from '../../components/TeacherItem'
import ShimmerTeacher from '../../components/ShimmerTeacher'

import * as S from './styles'

const TeacherList:React.FC = () => {
    const isFocused = useIsFocused()

    const [isLoading, setIsLoading] = useState(true)

    const [isFilterVisible, setIsFilterVisible] = useState(false)

    const [favorites, setFavorites] = useState<number[]>([])

    const [teachers, setTeachers] = useState<Teacher[]>([])

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

        setPage(1)

        api.get('/classes', {
            params: {
                page: 1,
                time,
                week_day,
                subject
            }
        }).then(response => {
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
        })

        setIsFilterVisible(false)

    },[subject, week_day, time])

    const loadMoreTeachers = useCallback(()=>{
        api.get('/classes', {
            params: {
                page: page + 1,
                subject,
                week_day,
                time
            }
        }).then(response => {
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

            setTeachers([...teachers, ...res])
            setPage(page + 1)
        })
    },[page, subject, week_day, time, teachers])

    useEffect(()=>{
        loadFavorites()

        api.get('/classes', {
            params: {
                page: 1
            }
        }).then(response => {
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
        })

    },[])

    useEffect(()=>{
        setIsLoading(false)
    },[teachers])

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
                        <S.SelectContainer>
                                    <Picker
                                        prompt="Qual disciplina?"
                                        selectedValue={subject}
                                        onValueChange={(itemValue: ItemValue, itemIndex)=>{
                                            setSubject(itemValue)
                                        }}
                                        style={{color: '#bababa'}}
                                    >   
                                        <Picker.Item label="Artes" value="Artes" />
                                        <Picker.Item label="Biologia" value="Biologia" />
                                        <Picker.Item label="Ciência" value="Ciência" />
                                        <Picker.Item label="Educação Física" value="Educação Física" />
                                        <Picker.Item label="Física" value="Física" />
                                        <Picker.Item label="Geografia" value="Geografia" />
                                        <Picker.Item label="História" value="História" />
                                        <Picker.Item label="Inglês" value="Inglês" />
                                        <Picker.Item label="Matemática" value="Matemática" />
                                        <Picker.Item label="Português" value="Português" />
                                        <Picker.Item label="Química" value="Química" />
                                    </Picker>
                                </S.SelectContainer>

                        <S.InputGroup>
                            <S.InputBlock>
                                <S.Label>Dia da Semana</S.Label>
                                <S.SelectContainer>
                                    <Picker
                                        prompt="Qual data?"
                                        selectedValue={week_day}
                                        onValueChange={(itemValue, itemIndex)=>{
                                            setWeekDay(itemValue)
                                        }}
                                        style={{color: '#bababa'}}
                                    >
                                        <Picker.Item label="Domingo" value={"0"} />
                                        <Picker.Item label="Segunda" value={"1"} />
                                        <Picker.Item label="Terça" value={"2"} />
                                        <Picker.Item label="Quarta" value={"3"} />
                                        <Picker.Item label="Quinta" value={"4"} />
                                        <Picker.Item label="Sexta" value={"5"} />
                                        <Picker.Item label="Sábado" value={"6"} />
                                    </Picker>
                                </S.SelectContainer>
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
            
            {isLoading && (
                <S.Shimmer>
                    <ShimmerTeacher/>
                    <ShimmerTeacher/>
                </S.Shimmer>
            )}

            {!isLoading && (
    
                <FlatList
                    style={{marginTop: -20}}
                    data={teachers}
                    keyExtractor={teacher => String(teacher.id)}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMoreTeachers}
                    onEndReachedThreshold={0.2}
                    renderItem={({ item: teacher})=>(
                        <TeacherItem 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}    
                        />
                    )} 
                >
    
                </FlatList>
            )}

            {!isLoading && !teachers[0] && (
                <S.NothingFound>
                    Desculpe, não foi encontrado nenhum professor. 
                    Tente alterar os filtros
                </S.NothingFound>
            )}

            
        </S.Container>
    )
}

export default TeacherList
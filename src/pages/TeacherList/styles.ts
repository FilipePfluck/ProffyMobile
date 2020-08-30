import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import {Picker} from '@react-native-community/picker'

export const Container = styled.View`
    flex: 1;
    background-color: #221f26;
`

export const TeacherList = styled.ScrollView`
    margin-top: -20px;
`

export const SearchForm = styled.View`
    margin: 16px 0;
`

export const Label = styled.Text`
    color: #D4C2FF;
`

export const Input = styled.TextInput`
    height: 54px;
    background-color: #fff;
    border-radius: 8px;
    justify-content: center;
    padding: 0 16px;
    margin-top: 4px;
    margin-bottom: 8px;
`

export const Select = styled(Picker)` 
    height: 54px;
    background-color: #fff;
    border-radius: 8px;
    justify-content: center;
    padding: 0 16px;
    margin-top: 4px;
    margin-bottom: 8px;
`

export const InputGroup = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const InputBlock = styled.View`
    width: 48%;
`

export const FilterButton = styled.TouchableOpacity`
    padding: 32px;
`

export const FilterButtonText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: 700;
`

export const SubmitButton = styled(RectButton)`
    background-color: #04D361;
    border-radius: 8px;
    height: 56px;

    margin-top: 8px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const SubmitButtonText = styled.Text`
    color: #fff;
    font-size: 16px;
`

export const NothingFound = styled.Text`
    color: #fff;
    font-size: 16px;
    margin-top: 32px;
    padding: 0 24px;
`
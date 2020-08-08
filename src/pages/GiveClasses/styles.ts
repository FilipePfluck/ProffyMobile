import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 40px;

    background-color: #8257E5;
`

export const Content = styled.ImageBackground`
    flex: 1;
    justify-content: center;
`

export const Title = styled.Text`
    font-weight: 700;
    font-size: 32px;
    line-height: 37px;
    color: #fff;
`

export const Description = styled.Text`
    margin-top: 24px;
    color: #D4C2FF;
    font-size: 16px;
    line-height: 26px;
`

export const Button = styled(RectButton)`
    margin: 40px 0;
    padding: 24px;
    border-radius: 8px;
    background-color: #04D361;
    height: 58px;
    width: 100%;

    align-items: center;
    justify-content: center;
`

export const ButtonText = styled.Text`
    color: #FFF;
    font-size: 16px;
    font-weight: 700;
`
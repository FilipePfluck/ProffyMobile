import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

interface buttonProps{
    color: string
}

export const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 40px;

    background-color: #8257E5;
`

export const LandingImage = styled.Image`
    width: 100%;
`

export const Title = styled.Text`
    color: #fff;
    font-size: 20px;
    line-height: 30px;
    margin-top: 80px;
    text-align: center;
`

export const TitleBold  = styled.Text`
    font-weight: bold;
`

export const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    margin-top: 40px;
`

export const Button = styled(RectButton)<buttonProps>`
    height: 150px;
    width: 48%;

    background-color: ${props => props.color};
    border-radius: 10px;
    padding: 24px;
    justify-content: space-between;
    align-items: center;
`

export const TextButton = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: 700
`

export const TotalConnections = styled.Text`
    color: #d4c2ff;
    font-weight: 400;
    margin-top: 24px;
    font-size: 14px;
    line-height: 20px;
`
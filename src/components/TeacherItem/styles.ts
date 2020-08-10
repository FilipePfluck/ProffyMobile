import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

interface FavoriteButtonProps{
    favorited: boolean
}

export const Container = styled.View`
    background-color: #2c2933;
    border-radius: 8px;
    margin-bottom: 16px;
    overflow: hidden;
    width: 90%;
    margin: 0 auto;
    padding: 24px;
    margin-bottom: 24px;
`

export const Profile = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Avatar = styled.Image`
    width: 64px;
    height: 64px;
    border-radius: 32px;
    margin-right: 16px;
`

export const ProfileInfo = styled.View`

`

export const Name = styled.Text`
    font-weight: 700;
    font-size: 24px;
    color: #916BEA;
`

export const Subject = styled.Text`
    color: #6A6180;
    margin-top: 4px;
`

export const Bio = styled.Text`
    margin-top: 24px;
    font-size: 16px;
    line-height: 24px;
    color: #6A6180;
`

export const Footer = styled.View`
    align-items: center;
    margin-top: 24px;
`

export const Price = styled.Text`
    color: #6A6180;
    font-size: 16px;
`

export const PriceValue = styled.Text`
    font-weight: 700;
    color: #916BEA;
`

export const ButtonsContainer = styled.View`
    flex-direction: row;
    margin-top:  16px;
`

export const FavoriteButton = styled(RectButton)<FavoriteButtonProps>`
    background-color: ${props => props.favorited ? '#e33e3d' : '#916BEA'};
    width: 56px;
    height: 56px;
    border-radius: 8px;


    justify-content: center;
    align-items: center;
    margin-right: 16px;
`

export const ContactButton = styled(RectButton)`
    background-color: #04D361;
    border-radius: 8px;

    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const ContactButtonText = styled.Text`
    color: #fff;
    font-size: 16px;
    margin-left: 16px;
`
import React from 'react'

import * as S from './styles'

const ShimmerTeacher: React.FC = () => {
    return(
        <S.Container>
            <S.Profile>
                <S.Avatar/>
                <S.ProfileInfo>
                    <S.Name/>
                    <S.Subject/>
                </S.ProfileInfo>
            </S.Profile>

            <S.Schedule>
                <S.ScheduleLabel>
                    <S.ScheduleLabelText/>
                    <S.ScheduleLabelText/>
                </S.ScheduleLabel>

                <S.ScheduleItem>
                    <S.ScheduleItemText style={{width: 124}}/>
                    <S.ScheduleItemText style={{width: 98}}/>
                </S.ScheduleItem>
                <S.ScheduleItem>
                    <S.ScheduleItemText style={{width: 118}}/>
                    <S.ScheduleItemText style={{width: 72}}/>
                </S.ScheduleItem>
                
            </S.Schedule>
 
            <S.Footer>
                <S.Price/>
                <S.ButtonsContainer>
                    <S.FavoriteButton/>
                    <S.ContactButton />
                </S.ButtonsContainer>
            </S.Footer>
        </S.Container>
    )
}

export default ShimmerTeacher
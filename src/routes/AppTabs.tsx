import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TeacherList from '../pages/TeacherList'
import Favorites from '../pages/Favorites'

const { Navigator, Screen } = createBottomTabNavigator()

function StudyTabs(){
    return(
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64,
                    borderWidth: 0,
                    borderColor: "#221f26",
                    backgroundColor: "#221f26"
                },
                tabStyle: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 0,
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20,         
                },
                labelStyle: {
                    fontSize: 13,
                    fontWeight: 'bold',
                    marginLeft: 16,
                },
                activeTintColor: "#FFF",
                inactiveTintColor: "#999591"
            }}
        >
            <Screen 
                name="TeacherList" 
                component={TeacherList}
                options={{
                    tabBarLabel:"Proffys"
                }}
            />
            <Screen 
                name="Favorites" 
                component={Favorites}
                options={{
                    tabBarLabel:"Favoritos"
                }}
            />
        </Navigator>
    )
}

export default StudyTabs
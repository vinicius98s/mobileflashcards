import React from 'react'
import styled from 'styled-components/native'
import { View, StatusBar, ActivityIndicator } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Constants } from 'expo'

import Home from './pages/Home'
import Deck from './pages/Deck'
import Quiz from './pages/Quiz'
import Color from './pages/Color'

import { getMainColor } from './helpers/colors'
import { setNotification } from './helpers/notifications'

const StackNavigator = createStackNavigator(
	{
		Home: {
			screen: Home
		},
		Color: {
			screen: Color,
			navigationOptions: {
				title: 'Choose a color'
			}
		},
		Deck: {
			screen: Deck
		},
		Quiz: {
			screen: Quiz
		}
	},
	{
		defaultNavigationOptions: {
			headerTitleStyle: {
				textAlign: 'center',
				flex: 1
			},
			headerTintColor: 'white',
			headerForceInset: { top: 'never', bottom: 'never' }
		}
	}
)

const AppNavigator = createAppContainer(StackNavigator)

const StyledStatusBar = ({ backgroundColor, ...props }) => (
	<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
		<StatusBar translucent backgroundColor={backgroundColor} {...props} />
	</View>
)

export const ColorContext = React.createContext()

export default class App extends React.Component {
	state = {
		mainColor: ''
	}

	componentDidMount() {
		setNotification()
		this.handleGetColor()
	}

	componentDidUpdate() {
		this.handleGetColor()
	}

	handleGetColor = () => {
		getMainColor().then((color) => {
			this.setState({ mainColor: color })
		})
	}

	render() {
		const { mainColor } = this.state

		if (!mainColor) {
			return (
				<Wrapper>
					<ActivityIndicator color="black" size="large" />
				</Wrapper>
			)
		}

		return (
			<ColorContext.Provider value={mainColor}>
				<Container>
					<StyledStatusBar backgroundColor={mainColor} barStyle="light-content" />
					<AppNavigator />
				</Container>
			</ColorContext.Provider>
		)
	}
}

const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`

const Container = styled.View`
	flex: 1;
`

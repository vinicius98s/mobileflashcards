import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { ColorPicker } from 'react-native-color-picker'

import { setMainColor } from '../helpers/colors'

import { ColorContext } from '../App'

export default class Color extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Choose a color',
		headerStyle: {
			backgroundColor: navigation.getParam('mainColor')
		},
		headerRight: <View />
	})

	render() {
		return (
			<ColorContext.Consumer>
				{(mainColor) => (
					<View style={{ flex: 1 }}>
						<Explanation mainColor={mainColor}>
							Make this app look like what you want!{`\n\n`}
							Choose a color, then press on the circle to set it as a default color.
						</Explanation>
						<ColorPicker
							defaultColor={mainColor}
							onColorSelected={(color) => {
								setMainColor(color).then(
									this.props.navigation.navigate('Home', {
										mainColor: color
									})
								)
							}}
							style={{ flex: 0.9 }}
						/>
					</View>
				)}
			</ColorContext.Consumer>
		)
	}
}

const Explanation = styled.Text`
	${(props) => (props.mainColor ? `color: ${props.mainColor};` : 'color: black;')}
	font-size: 16;
	text-align: center;
	margin-top: 20;
`

import React from 'react'
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ColorContext } from '../App'

export default function StyledCardButton(props) {
	return (
		<ColorContext.Consumer>
			{(mainColor) => (
				<StyledAddNewDeck onPress={props.handleOnPress} mainColor={mainColor}>
					<MaterialCommunityIcons
						name="cards-outline"
						size={120}
						color={'rgba(255, 255, 255, 0.65)'}
						style={{ flex: 0.45 }}
					/>
					<AddNewDeckText>{props.title}</AddNewDeckText>
				</StyledAddNewDeck>
			)}
		</ColorContext.Consumer>
	)
}

const StyledAddNewDeck = styled.TouchableOpacity`
	width: 100%;
	height: 70;
	align-items: center;
	justify-content: center;
	border-radius: 13;
	flex-direction: row;
	overflow: hidden;
	margin-top: 25;

	${(props) => (props.mainColor ? `background-color: ${props.mainColor};` : 'background-color: black;')}
`

const AddNewDeckText = styled.Text`
	flex: 0.5;
	color: white;
	font-weight: bold;
	font-size: 20;
`

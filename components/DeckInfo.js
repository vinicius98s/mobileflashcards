import React from 'react'
import styled from 'styled-components/native'

import { ColorContext } from '../App'

export default function DeckInfo(props) {
	return (
		<ColorContext.Consumer>
			{(mainColor) => (
				<StyledDeckInfo mainColor={mainColor} onPress={props.handleNavigation}>
					<StyledDeckTitle>{props.title}</StyledDeckTitle>
					<StyledDeckCardsInfo>{props.numCards} cards</StyledDeckCardsInfo>
				</StyledDeckInfo>
			)}
		</ColorContext.Consumer>
	)
}

const StyledDeckInfo = styled.TouchableOpacity`
	${(props) => (props.mainColor ? `border: 3px solid ${props.mainColor};` : 'border: 3px solid black')}
	border-radius: 13;
	width: 48%;
	height: 120;
	align-items: center;
	justify-content: center;
	padding: 10px;
	margin-top: 20;
`
const StyledDeckTitle = styled.Text`
	font-weight: bold;
	font-size: 20;
	color: #585858;
	text-align: center;
`

const StyledDeckCardsInfo = styled.Text`
	color: #c1c1c1;
	font-size: 14;
`

import React from 'react'
import styled from 'styled-components/native'

const mainColor = 'tomato'
import { ColorContext } from '../App'

const StyledButton = styled.TouchableOpacity`
	font-size: 12;
	border-radius: 4;
	padding: 8px 12px;
	align-items: center;
	justify-content: center;

	${(props) => (props.mainColor ? `border: 1px solid ${props.mainColor};` : 'border: 1px solid black;')}

	${(props) =>
		props.primary
			? `
			${props.mainColor ? `background: ${props.mainColor};` : 'background: black;'}
    `
			: false};

	${(props) =>
		props.big
			? `
			padding: 10px 0;
			flex: 0.3
		`
			: false};
`

const StyledTitle = styled.Text`
	${(props) =>
		props.primary
			? `
        color: white;
    `
			: false}

	${(props) =>
		props.secondary
			? `
		${props.mainColor ? `color: ${props.mainColor};` : 'color: black;'}
    `
			: false}
`

export default function Button(props) {
	return (
		<ColorContext>
			{(mainColor) => (
				<StyledButton {...props} mainColor={mainColor}>
					<StyledTitle primary={props.primary} secondary={props.secondary} mainColor={mainColor}>
						{props.title}
					</StyledTitle>
				</StyledButton>
			)}
		</ColorContext>
	)
}

import React, { Fragment } from 'react'
import { Modal, View } from 'react-native'
import styled from 'styled-components/native'

import Button from './Button'

import { saveDeckTitle, addCardToDeck } from '../helpers/API'

import { ColorContext } from '../App'

export default class CustomModal extends React.Component {
	state = {
		deckTitle: '',
		cardQuestion: '',
		cardAnswer: ''
	}

	handleInput = (e, state) => {
		this.setState({ [state]: e.nativeEvent.text })
	}

	addDeck = () => {
		saveDeckTitle(this.state.deckTitle).then(() => {
			this.props.handleModalVisibility()
			this.props.handleDecks()
			this.props.navigateToDeck(this.state.deckTitle)
		})
	}

	addCard = () => {
		addCardToDeck(this.props.deckTitle, {
			question: this.state.cardQuestion,
			answer: this.state.cardAnswer
		}).then(() => {
			this.props.handleModalVisibility()
			this.props.handleDeck()
		})
	}

	render() {
		return (
			<ColorContext.Consumer>
				{(mainColor) => (
					<Modal
						animationType="fade"
						transparent={true}
						visible={this.props.modal}
						onRequestClose={this.props.handleModalVisibility}
					>
						<Container>
							<StyledModal home={this.props.home} deck={this.props.deck} mainColor={mainColor}>
								{this.props.home && (
									<Fragment>
										<StyledModalTitle>Add a new Deck</StyledModalTitle>
										<StyledInput
											placeholder="Title"
											onChange={(e) => this.handleInput(e, 'deckTitle')}
											style={{ marginBottom: 20 }}
											mainColor={mainColor}
										/>
									</Fragment>
								)}

								{this.props.deck && (
									<Fragment>
										<StyledModalTitle>Add a new Card</StyledModalTitle>
										<View style={{ width: '100%', marginBottom: 10 }}>
											<StyledInput
												placeholder="What is your question?"
												onChange={(e) => this.handleInput(e, 'cardQuestion')}
												mainColor={mainColor}
											/>
											<StyledInput
												placeholder="And the answer is..."
												onChange={(e) => this.handleInput(e, 'cardAnswer')}
												mainColor={mainColor}
											/>
										</View>
									</Fragment>
								)}

								<Button secondary title="Cancel" onPress={this.props.handleModalVisibility} />
								<View style={{ width: 10 }} />
								<Button
									primary
									title="Submit"
									onPress={this.props.home ? this.addDeck : this.addCard}
								/>
							</StyledModal>
						</Container>
					</Modal>
				)}
			</ColorContext.Consumer>
		)
	}
}

const Container = styled.View`
	flex: 1;
	background-color: rgba(0, 0, 0, 0.65);
`

const StyledModal = styled.View`
	background: white;
	border-top-width: 6;
	position: absolute;
	bottom: 0;
	left: 0;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	padding: 20px;
	
	${(props) => (props.mainColor ? `border-top-color: ${props.mainColor};` : 'border-top-color: black;')}

	${(props) =>
		props.home
			? `
		height: 200;
	`
			: false}

	${(props) =>
		props.deck
			? `
		height: 260;
	`
			: false}
`

const StyledModalTitle = styled.Text`
	font-size: 24;
	margin-bottom: 10;
`

const StyledInput = styled.TextInput`
	padding: 4px 8px;
	width: 100%;
	border-radius: 5;
	margin-bottom: 10;

	${(props) => (props.mainColor ? `border: 1px solid ${props.mainColor};` : 'border: 1px solid black;')}
`

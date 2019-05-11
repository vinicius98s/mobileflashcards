import React, { Fragment } from 'react'
import styled from 'styled-components/native'
import { ScrollView, ActivityIndicator, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import DeckInfo from '../components/DeckInfo'
import Modal from '../components/Modal'
import StyledCardButton from '../components/StyledCardButton'

import { ColorContext } from '../App'

import { getDecks } from '../helpers/API'
import { getMainColor } from '../helpers/colors'

export default class Home extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Mobile FlashCards',
		headerTitleStyle: {
			flex: 1
		},
		headerStyle: {
			backgroundColor: navigation.getParam('mainColor')
		},
		headerRight: (
			<Ionicons
				name="md-color-palette"
				size={25}
				color="white"
				style={{ marginRight: 10 }}
				onPress={() => {
					navigation.navigate('Color', {
						mainColor: navigation.getParam('mainColor')
					})
				}}
			/>
		)
	})

	state = {
		modalVisible: false,
		decks: false
	}

	componentDidMount() {
		this.handleDecks()

		getMainColor().then((color) => {
			this.props.navigation.setParams({ mainColor: color })
		})
	}

	componentDidUpdate() {
		this.handleDecks()
	}

	handleDecks = () => {
		getDecks()
			.then((decks) => this.setState({ decks }))
			.catch((e) => this.setState({ decks: e }))
	}

	handleModalVisibility = () => {
		this.setState((prevState) => ({
			modalVisible: !prevState.modalVisible
		}))
	}

	render() {
		const { decks, modalVisible } = this.state

		if (!decks) {
			return (
				<ColorContext.Consumer>
					{(mainColor) => (
						<Wrapper>
							<ActivityIndicator size="large" color={mainColor} />
						</Wrapper>
					)}
				</ColorContext.Consumer>
			)
		}

		return (
			<ColorContext.Consumer>
				{(mainColor) => (
					<Fragment>
						{modalVisible && (
							<Modal
								modal={modalVisible}
								handleModalVisibility={this.handleModalVisibility}
								handleDecks={this.handleDecks}
								navigateToDeck={(title) => {
									this.props.navigation.navigate('Deck', {
										title: title,
										numCards: 0,
										mainColor: mainColor
									})
								}}
								home
							/>
						)}

						<ScrollView>
							<Container>
								{typeof decks === 'string' && (
									<Text style={{ fontSize: 20, fontWeight: 'bold' }}>{decks}</Text>
								)}

								{typeof decks !== 'string' &&
									Object.values(decks).map((deck) => {
										return (
											<DeckInfo
												title={deck.title}
												numCards={deck.questions.length}
												key={deck.title}
												handleNavigation={() =>
													this.props.navigation.navigate('Deck', {
														title: deck.title,
														numCards: deck.questions.length,
														mainColor: mainColor
													})
												}
											/>
										)
									})}

								<StyledCardButton title="Add new Deck" handleOnPress={this.handleModalVisibility} />
							</Container>
						</ScrollView>
					</Fragment>
				)}
			</ColorContext.Consumer>
		)
	}
}

const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`

const Container = styled.View`
	padding: 0 20px;
	flex: 1;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 10;
`

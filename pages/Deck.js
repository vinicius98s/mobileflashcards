import React, { Fragment } from 'react'
import styled from 'styled-components/native'
import { View, ActivityIndicator, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Button from '../components/Button'
import Modal from '../components/Modal'

import { ColorContext } from '../App'

import { getDeck, removeDeck } from '../helpers/API'

export default class Deck extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title,
		headerStyle: {
			backgroundColor: navigation.getParam('mainColor')
		},
		headerRight: (
			<MaterialCommunityIcons
				name="delete"
				size={25}
				color="white"
				style={{ marginRight: 10 }}
				onPress={() => {
					Alert.alert(
						'Are you sure?',
						"If you delete this deck you won't be able to recover!",
						[
							{
								text: 'Cancel',
								style: 'cancel'
							},
							{
								text: 'OK',
								onPress: () => {
									removeDeck(navigation.state.params.title).then(navigation.navigate('Home'))
								}
							}
						],
						{ cancelable: false }
					)
				}}
			/>
		)
	})

	state = {
		modalVisible: false,
		deck: false
	}

	componentDidMount() {
		this.handleDeck()
	}

	handleModalVisibility = () => {
		this.setState((prevState) => ({
			modalVisible: !prevState.modalVisible
		}))
	}

	handleDeck = () => {
		getDeck(this.props.navigation.state.params.title)
			.then((deck) => this.setState({ deck }))
			.catch((e) => this.setState({ deck: e }))
	}

	render() {
		const { modalVisible, deck } = this.state

		if (!deck) {
			return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator size="large" color={'black'} />
				</View>
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
								handleDeck={this.handleDeck}
								deckTitle={this.state.deck.title}
								deck
							/>
						)}

						<Container>
							<Title>{this.state.deck.title}</Title>
							<Cards>{this.state.deck.questions.length} cards</Cards>
							<View style={{ flexDirection: 'row' }}>
								<Button secondary big title="Add card" onPress={this.handleModalVisibility} />
								<View style={{ width: 10 }} />
								<Button
									primary
									big
									title="Start Quiz"
									onPress={() =>
										this.props.navigation.navigate('Quiz', {
											deck: this.state.deck,
											mainColor: mainColor
										})
									}
								/>
							</View>
						</Container>
					</Fragment>
				)}
			</ColorContext.Consumer>
		)
	}
}

const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	padding: 0 20px;
`

const Title = styled.Text`
	font-size: 40;
	font-weight: bold;
	color: #585858;
	text-align: center;
`

const Cards = styled.Text`
	font-size: 20;
	color: #c5c5c5;
	margin: 5px 0 20px 0;
`

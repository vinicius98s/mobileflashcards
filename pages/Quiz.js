import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'

import Button from '../components/Button'
import StyledCardButton from '../components/StyledCardButton'

import { getMainColor } from '../helpers/colors'

import { ColorContext } from '../App'

export default class Quiz extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: `Quiz - ${navigation.state.params.deck.title}`,
		headerStyle: {
			backgroundColor: navigation.getParam('mainColor')
		},
		headerRight: <View />
	})

	state = {
		questionsCounter: 0,
		points: 0,
		showAnswer: false,
		isFinished: false
	}

	componentDidMount() {
		getMainColor().then((color) => {
			this.props.navigation.setParams({ mainColor: color })
		})
	}

	handleShowAnser = () => {
		this.setState((prevState) => ({
			showAnswer: !prevState.showAnswer
		}))
	}

	nextQuestion = (isRight) => {
		const { deck } = this.props.navigation.state.params

		this.setState((prevState) => ({
			questionsCounter: prevState.questionsCounter + 1,
			points: isRight ? prevState.points + 1 : prevState.points,
			showAnswer: false,
			isFinished: prevState.questionsCounter + 1 === deck.questions.length ? true : false
		}))
	}

	render() {
		const { deck } = this.props.navigation.state.params
		const { questionsCounter, points, showAnswer, isFinished } = this.state

		if (deck.questions.length === 0) {
			return (
				<Container>
					<Question>You must have at least one question to start the quiz!</Question>
				</Container>
			)
		}

		if (isFinished) {
			return (
				<ColorContext.Consumer>
					{(mainColor) => (
						<Container>
							<Final mainColor={mainColor}>
								{deck.questions.length === points && 'Congratulations!\n😎'}
								{points > 0 && points < deck.questions.length && 'Keep going!\n🙂'}
								{points === 0 && 'Well...\n😐'}
							</Final>
							<Description>
								{deck.questions.length === points && 'You got all the questions right.'}
								{points > 0 && points < deck.questions.length && 'You got some questions. Nice one!'}
								{points === 0 && "That's not a good one. You can try again."}
							</Description>
							<Button
								primary
								title="Go to home"
								onPress={() => this.props.navigation.navigate('Home')}
								style={{ marginTop: 20 }}
							/>
						</Container>
					)}
				</ColorContext.Consumer>
			)
		}

		return (
			<ColorContext.Consumer>
				{(mainColor) => (
					<Container>
						<TopWrapper>
							<NumQuestions>
								{`${
									questionsCounter === deck.questions.length ? questionsCounter : questionsCounter + 1
								}/${deck.questions.length}`}
							</NumQuestions>
							<Points mainColor={mainColor}>{points} points</Points>
						</TopWrapper>
						<Question>{deck.questions[questionsCounter].question}</Question>
						<StyledCardButton title="Check answer" handleOnPress={this.handleShowAnser} />

						{showAnswer && <Answer>{deck.questions[questionsCounter].answer}</Answer>}

						<View style={{ flexDirection: 'row', marginTop: 30 }}>
							<Button secondary big title="Incorrect" onPress={() => this.nextQuestion(false)} />
							<View style={{ width: 10 }} />
							<Button primary big title="Correct" onPress={() => this.nextQuestion(true)} />
						</View>
					</Container>
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

const TopWrapper = styled.View`
	flex-direction: row;
	position: absolute;
	top: 20;
	left: 20;
	justify-content: space-between;
	width: 100%;
`

const NumQuestions = styled.Text`
	font-size: 15;
	color: #414141;
	font-weight: bold;
`

const Points = styled.Text`
	font-size: 15;
	font-weight: bold;

	${(props) => (props.mainColor ? `color: ${props.mainColor};` : 'color: black;')}
`

const Question = styled.Text`
	font-size: 30;
	font-weight: bold;
	color: #414141;
	text-align: center;
`

const Answer = styled.Text`
	font-size: 20;
	font-weight: bold;
	color: #414141;
	margin-top: 20;
`

const Final = styled.Text`
	font-size: 30;
	font-weight: bold;
	text-align: center;
	margin-bottom: 10;

	${(props) => (props.mainColor ? `color: ${props.mainColor};` : 'color: black;')}
`

const Description = styled.Text`
	font-size: 20;
	color: #414141;
	text-align: center;
`

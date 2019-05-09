import { AsyncStorage } from 'react-native'

const DECKS_KEY = '@MobileFlashCards:Decks'

export async function getDecks() {
	try {
		const decks = await AsyncStorage.getItem(DECKS_KEY)
		if (decks) {
			return JSON.parse(decks)
		}
		return 'You have no decks, please add one!'
	} catch (e) {
		return 'Something went wrong, please try again!'
	}
}

export async function getDeck(key) {
	try {
		const decks = await AsyncStorage.getItem(DECKS_KEY).then(JSON.parse)
		if (decks[key]) {
			return decks[key]
		}
		return 'Invalid key, please try again!'
	} catch (e) {
		return 'Something went wrong, please try again!'
	}
}

export async function saveDeckTitle(key) {
	try {
		return AsyncStorage.mergeItem(
			DECKS_KEY,
			JSON.stringify({
				[key]: {
					title: key,
					questions: []
				}
			})
		)
	} catch (e) {
		return 'Something went wrong, please try again!'
	}
}

export async function removeDeck(key) {
	try {
		const decks = await AsyncStorage.getItem(DECKS_KEY).then(JSON.parse)

		const newDecks = Object.keys(decks).reduce((object, deckKey) => {
			if (deckKey !== key) {
				object[deckKey] = decks[deckKey]
			}
			return object
		}, {})

		return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(newDecks))
	} catch (e) {
		return 'Something went wrong, please try again!'
	}
}

export async function addCardToDeck(key, card) {
	try {
		const decks = await AsyncStorage.getItem(DECKS_KEY).then(JSON.parse)

		if (decks[key]) {
			decks[key].questions = [...decks[key].questions, card]
		}

		return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(decks))
	} catch (e) {
		return 'Something went wrong, please try again!'
	}
}

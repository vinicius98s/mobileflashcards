import { AsyncStorage } from 'react-native'

const COLOR_KEY = '@MobileFlashCards:Color'

export async function getMainColor() {
	try {
		const color = await AsyncStorage.getItem(COLOR_KEY)
		if (color) {
			return color
		}
		return '#02B3E4'
	} catch (e) {
		return '#02B3E4'
	}
}

export async function setMainColor(color) {
	try {
		const newColor = color ? color : '#02B3E4'
		return await AsyncStorage.setItem(COLOR_KEY, newColor)
	} catch (e) {
		return '#02B3E4'
	}
}

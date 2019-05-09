import { Notifications, Permissions } from 'expo'

function createNotification() {
	return {
		title: 'Study time!',
		body: "🖐 Don't to study today!",
		ios: {
			sound: true
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		}
	}
}

export function setNotification() {
	Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
		if (status === 'granted') {
			Notifications.cancelAllScheduledNotificationsAsync()

			let tomorrow = new Date()

			tomorrow.setDate(tomorrow.getDate() + 1)
			tomorrow.setHours(20)
			tomorrow.setMinutes(0)

			Notifications.scheduleLocalNotificationAsync(createNotification(), {
				time: tomorrow,
				repeat: 'day'
			})
		}
	})
}

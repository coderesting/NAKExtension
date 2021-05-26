chrome.runtime.onInstalled.addListener((reason) => {
  // Register an alarm that will wake my background page every half hour.
  chrome.alarms.create("nak-exam-notifier", { periodInMinutes: 1 })

  chrome.notifications.onClicked.addListener(function (notificationId) {
    chrome.tabs.create({ url: notificationId })
    chrome.notifications.clear(notificationId)
  })
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "nak-exam-notifier") {
    checkNakExams()
  }
})

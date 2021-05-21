chrome.runtime.onInstalled.addListener((reason) => {
  // Register an alarm that will wake my background page every hour.
  chrome.alarms.create("nak-exam-notifier", { periodInMinutes: 1 })
  checkNakExams()
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "nak-exam-notifier") {
    checkNakExams()
  }
})

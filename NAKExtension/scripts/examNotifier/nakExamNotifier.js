pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker
//first exam entry in pdfArray
const pdfItemsExamArrayOffset = 9

const getCisCookie = async () => {
  const { username, password } = await getData({
    username: "",
    password: "",
  })

  fetch("https://cis.nordakademie.de/?no_cache=1", {
    origin: "https://cis.nordakademie.de",
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    referrer: "https://cis.nordakademie.de/?no_cache=1",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `user=${username}&pass=${password}&submit=Anmelden&logintype=login&pid=706&redirect_url=%2F%3Fno_cache%3D1&tx_felogin_pi1%5Bnoredirect%5D=0&referer=https%3A%2F%2Fcis.nordakademie.de%2F%3Fno_cache%3D1`,
    method: "POST",
    mode: "no-cors",
    credentials: "include",
  })
}

const getExamGrades = async () => {
  let examGradesString
  await fetch(
    "https://cis.nordakademie.de/studium/pruefungen/pruefungsergebnisse/?tx_nagrades_nagradesmodules%5Blang%5D=de&tx_nagrades_nagradesmodules%5BcurriculumId%5D=56&tx_nagrades_nagradesmodules%5Baction%5D=transcript&tx_nagrades_nagradesmodules%5Bcontroller%5D=Notenverwaltung&cHash=6966ddcc530a48a5bc3c9f277fb4b6a8",
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrer: "https://cis.nordakademie.de/studium/pruefungen/pruefungsergebnisse/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  )
    .then((res) => {
      if (!res.ok || res.status !== 200) {
        throw new Error("ExamFetchError")
      }
      return res
    })
    .then((res) =>
      pdfjsLib
        .getDocument(res)
        .promise.then((doc) => doc.getPage(1))
        .then((page) => page.getTextContent())
        .then((content) => {
          const strings = content.items.map((item) => item.str)
          const examGrades = pdfItemsToGradesObjectMapper(strings)
          examGradesString = examGrades.join()
        })
    )
    .catch((e) => {
      if (e.message === "ExamFetchError") {
        console.log("Could not fetch Exam Grades. Check your credentials")
      } else console.log("Failed to check exam grades. Please check your extension permissions")
    })
  return examGradesString
}

const pdfItemsToGradesObjectMapper = (strings) => {
  const pdfItemExamArrayEnd = strings.indexOf(
    "Dieser Notenauszug ist kein Zeugnis. Er wird elektronisch erstellt und trägt daher weder Unterschrift noch Siegel."
  )
  const gradeItems = strings.slice(pdfItemsExamArrayOffset, pdfItemExamArrayEnd)
  return gradeItems
}

const areExamStringsEqual = (oldExamGrades, newExamGrades) => {
  return oldExamGrades.localeCompare(newExamGrades) === 0
}

const checkNakExams = async () => {
  await getCisCookie()
  await delay(5000)
  const newExamGradesString = await getExamGrades()
  const { nakExamGrades: oldExamGradesString } = await getData({ nakExamGrades: "" })

  if (!oldExamGradesString) {
    await setData({ nakExamGrades: newExamGradesString })
    return
  }
  if (newExamGradesString && !areExamStringsEqual(oldExamGradesString, newExamGradesString)) {
    chrome.notifications.create(
      {
        type: "basic",
        title: "Exam-Notifier Update",
        priority: 1,
        iconUrl: "chrome-extension://clhmmjpagpkmahndapbciimoaelbmcab/NAKExtension-128x128.png",
        message: "Deine Prüfungsergebnisse wurden aktualisiert!",
      },
      () => {
        setData({ nakExamGrades: newExamGradesString })
      }
    )
  }
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

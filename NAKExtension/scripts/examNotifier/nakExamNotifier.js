pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker
//first exam entry in pdfArray
const pdfItemsExamArrayOffset = 9

const getCisCookie = async () => {
  const { username, password } = await getData({
    username: "",
    password: "",
  })

  fetch("https://cis.nordakademie.de/?no_cache=1", {
    Origin: "https://cis.nordakademie.de",
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
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    referrer: "https://cis.nordakademie.de/?no_cache=1",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `user=${username}pass=${password}&submit=Anmelden&logintype=login&pid=706&redirect_url=%2F%3Fno_cache%3D1&tx_felogin_pi1%5Bnoredirect%5D=0&referer=https%3A%2F%2Fcis.nordakademie.de%2F%3Fno_cache%3D1`,
    method: "POST",
    mode: "no-cors",
    credentials: "include",
  })
}

const checkExamGrades = async () => {
  await fetch(
    "https://cis.nordakademie.de/studium/pruefungen/pruefungsergebnisse/?tx_nagrades_nagradesmodules%5Blang%5D=de&tx_nagrades_nagradesmodules%5BcurriculumId%5D=56&tx_nagrades_nagradesmodules%5Baction%5D=transcript&tx_nagrades_nagradesmodules%5Bcontroller%5D=Notenverwaltung&cHash=6966ddcc530a48a5bc3c9f277fb4b6a8",
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
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
      if (!res.ok) {
        throw new Error("Could not fetch Exam Grades")
      }
    })
    .then((res) =>
      pdfjsLib
        .getDocument(res)
        .promise.then((doc) => doc.getPage(1))
        .then((page) => page.getTextContent())
        .then((content) => {
          const strings = content.items.map((item) => item.str)
          const examGrades = pdfItemsToGradesObjectMapper(strings)

          console.log(examGrades)
        })
    )
    .catch((e) => {
      console.log()
      if (e.message === "Could not fetch Exam Grades") {
        console.log("Could not fetch Exam Grades. Check your credentials")
      } else console.log("Failed to check exam grades. Please check your extension permissions")
    })
}

const pdfItemsToGradesObjectMapper = (strings) => {
  const pdfItemExamArrayEnd = strings.indexOf(
    "Dieser Notenauszug ist kein Zeugnis. Er wird elektronisch erstellt und trägt daher weder Unterschrift noch Siegel."
  )
  const gradeItems = strings.slice(pdfItemsExamArrayOffset, pdfItemExamArrayEnd)
  return gradeItems
}

const checkNakExams = async () => {
  await getCisCookie()
  checkExamGrades()
}
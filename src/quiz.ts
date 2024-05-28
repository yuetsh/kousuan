export type QuizConfig = {
  count: number
  groups: number
}

export type Quiz = {
  quiz: string
  answer: string
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function quiz(): Quiz {
  const f1 = random(1, 99)
  const operators = [
    { label: "+", value: "+" },
    { label: "-", value: "-" },
    { label: "×", value: "*" },
    { label: "÷", value: "/" },
  ]
  const op1 = operators[Math.floor(Math.random() * operators.length)]
  const f2 = random(1, 99)
  let answer = ""
  if (op1.value !== "/") {
    answer = eval(`${f1}${op1.value}${f2}`)
  } else {
    answer = parseInt(eval(`${f1}${op1.value}${f2}`)).toString()
    if (parseInt(eval(`${f1}%${f2}`)) !== 0) {
      answer += "......"
      answer += parseInt(eval(`${f1}%${f2}`)).toString()
    }
  }
  return {
    quiz: `${f1}${op1.label}${f2}=`,
    answer: `${f1}${op1.label}${f2}=${answer}`,
  }
}

export function listQuiz(config: QuizConfig): Quiz[][] {
  let arr = []
  let baseSize = Math.floor(config.count / config.groups)
  let remainder = config.count % config.groups

  for (let i = 0; i < config.groups; i++) {
    let groupSize = baseSize + (remainder > 0 ? 1 : 0)
    remainder--
    arr.push(new Array(groupSize).fill(null).map(quiz))
  }
  return arr
}

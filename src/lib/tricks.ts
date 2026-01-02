'use client'

import { Difficulty } from './store'

export type Trick = {
  id: string
  title: string
  description: string
  examples: string[]
  subject: 'addition' | 'subtraction' | 'multiplication' | 'division'
  generateQuestion: (difficulty: Difficulty) => Question
}

export type Question = {
  firstNumber: number
  secondNumber: number
  answer: number
  display: string
  key: string
}

const ranges: Record<Difficulty, { min: number; max: number; addMin: number; addMax: number }> = {
  scratch: { min: 1, max: 50, addMin: 1, addMax: 10 },
  beginner: { min: 1, max: 100, addMin: 1, addMax: 20 },
  medium: { min: 1, max: 500, addMin: 1, addMax: 50 },
  advanced: { min: 1, max: 999, addMin: 1, addMax: 99 },
}

// ADDITION TRICKS
const additionTricks: Trick[] = [
  {
    id: 'add-ending-9',
    title: 'Adding to Numbers Ending in 9',
    description: 'Add 1 to make it 10, then add the rest',
    subject: 'addition',
    examples: [
      '19 + 4 = (19 + 1) + 3 = 20 + 3 = 23',
      '29 + 6 = (29 + 1) + 5 = 30 + 5 = 35',
      '49 + 8 = (49 + 1) + 7 = 50 + 7 = 57',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const base = Math.floor(Math.random() * (range.max / 10)) * 10
      const firstNumber = base + 9
      const secondNumber = Math.floor(Math.random() * (range.addMax - range.addMin + 1)) + range.addMin
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-ending-8',
    title: 'Adding to Numbers Ending in 8',
    description: 'Add 2 to make it 10, then add the rest',
    subject: 'addition',
    examples: [
      '18 + 5 = (18 + 2) + 3 = 20 + 3 = 23',
      '28 + 7 = (28 + 2) + 5 = 30 + 5 = 35',
      '38 + 9 = (38 + 2) + 7 = 40 + 7 = 47',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const base = Math.floor(Math.random() * (range.max / 10)) * 10
      const firstNumber = base + 8
      const secondNumber = Math.floor(Math.random() * (range.addMax - range.addMin + 1)) + range.addMin
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-ending-7',
    title: 'Adding to Numbers Ending in 7',
    description: 'Add 3 to make it 10, then add the rest',
    subject: 'addition',
    examples: [
      '17 + 6 = (17 + 3) + 3 = 20 + 3 = 23',
      '27 + 8 = (27 + 3) + 5 = 30 + 5 = 35',
      '37 + 9 = (37 + 3) + 6 = 40 + 6 = 46',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const base = Math.floor(Math.random() * (range.max / 10)) * 10
      const firstNumber = base + 7
      const secondNumber = Math.floor(Math.random() * (range.addMax - range.addMin + 1)) + range.addMin
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-ending-6',
    title: 'Adding to Numbers Ending in 6',
    description: 'Add 4 to make it 10, then add the rest',
    subject: 'addition',
    examples: [
      '16 + 7 = (16 + 4) + 3 = 20 + 3 = 23',
      '26 + 9 = (26 + 4) + 5 = 30 + 5 = 35',
      '36 + 8 = (36 + 4) + 4 = 40 + 4 = 44',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const base = Math.floor(Math.random() * (range.max / 10)) * 10
      const firstNumber = base + 6
      const secondNumber = Math.floor(Math.random() * (range.addMax - range.addMin + 1)) + range.addMin
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-ending-5',
    title: 'Adding to Numbers Ending in 5',
    description: 'Add 5 to make it 10, then add the rest',
    subject: 'addition',
    examples: [
      '15 + 8 = (15 + 5) + 3 = 20 + 3 = 23',
      '25 + 9 = (25 + 5) + 4 = 30 + 4 = 34',
      '35 + 7 = (35 + 5) + 2 = 40 + 2 = 42',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const base = Math.floor(Math.random() * (range.max / 10)) * 10
      const firstNumber = base + 5
      const secondNumber = Math.floor(Math.random() * (range.addMax - range.addMin + 1)) + range.addMin
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-ending-4',
    title: 'Adding to Numbers Ending in 4',
    description: 'Add 6 to make it 10, then add the rest',
    subject: 'addition',
    examples: [
      '14 + 9 = (14 + 6) + 3 = 20 + 3 = 23',
      '24 + 8 = (24 + 6) + 2 = 30 + 2 = 32',
      '34 + 7 = (34 + 6) + 1 = 40 + 1 = 41',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const base = Math.floor(Math.random() * (range.max / 10)) * 10
      const firstNumber = base + 4
      const secondNumber = Math.floor(Math.random() * (range.addMax - range.addMin + 1)) + range.addMin
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-ending-3',
    title: 'Adding to Numbers Ending in 3',
    description: 'Add 7 to make it 10, then add the rest',
    subject: 'addition',
    examples: [
      '13 + 8 = (13 + 7) + 1 = 20 + 1 = 21',
      '23 + 9 = (23 + 7) + 2 = 30 + 2 = 32',
      '33 + 9 = (33 + 7) + 2 = 40 + 2 = 42',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const base = Math.floor(Math.random() * (range.max / 10)) * 10
      const firstNumber = base + 3
      const secondNumber = Math.floor(Math.random() * (range.addMax - range.addMin + 1)) + range.addMin
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-ending-2',
    title: 'Adding to Numbers Ending in 2',
    description: 'Add 8 to make it 10, then add the rest',
    subject: 'addition',
    examples: [
      '12 + 9 = (12 + 8) + 1 = 20 + 1 = 21',
      '22 + 9 = (22 + 8) + 1 = 30 + 1 = 31',
      '32 + 8 = (32 + 8) + 0 = 40 + 0 = 40',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const base = Math.floor(Math.random() * (range.max / 10)) * 10
      const firstNumber = base + 2
      const secondNumber = Math.floor(Math.random() * (range.addMax - range.addMin + 1)) + range.addMin
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-ending-1',
    title: 'Adding to Numbers Ending in 1',
    description: 'Add 9 to make it 10, then add the rest',
    subject: 'addition',
    examples: [
      '11 + 8 = (11 + 9) + (-1) = 20 - 1 = 19',
      '21 + 9 = (21 + 9) + 0 = 30 + 0 = 30',
      '31 + 9 = (31 + 9) + 0 = 40 + 0 = 40',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const base = Math.floor(Math.random() * (range.max / 10)) * 10
      const firstNumber = base + 1
      const secondNumber = Math.floor(Math.random() * (range.addMax - range.addMin + 1)) + range.addMin
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-double-digits',
    title: 'Adding Double Digit Numbers',
    description: 'Break into tens and ones, then combine',
    subject: 'addition',
    examples: [
      '23 + 45 = (20 + 40) + (3 + 5) = 60 + 8 = 68',
      '34 + 25 = (30 + 20) + (4 + 5) = 50 + 9 = 59',
      '41 + 37 = (40 + 30) + (1 + 7) = 70 + 8 = 78',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const firstNumber = Math.floor(Math.random() * (range.max - 10)) + 10
      const secondNumber = Math.floor(Math.random() * (range.max - 10)) + 10
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-round-numbers',
    title: 'Adding to Round Numbers',
    description: 'Use round numbers as anchor points',
    subject: 'addition',
    examples: [
      '50 + 23 = 73',
      '100 + 45 = 145',
      '200 + 78 = 278',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const roundNum = Math.floor(Math.random() * 10) * 100
      const firstNumber = roundNum || 50
      const secondNumber = Math.floor(Math.random() * (range.addMax - range.addMin + 1)) + range.addMin
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-11s',
    title: 'Quick Add 11 Trick',
    description: 'Add the digits then put it in the middle',
    subject: 'addition',
    examples: [
      '23 + 11 = 34 (2+3=5, put between)',
      '45 + 11 = 56 (4+5=9, put between)',
      '34 + 11 = 45 (3+4=7, put between)',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const firstNumber = Math.floor(Math.random() * (range.max - 10)) + 10
      const secondNumber = 11
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-complement-10',
    title: 'Using 10s Complement',
    description: 'Find numbers that make 10, add separately',
    subject: 'addition',
    examples: [
      '8 + 7 = 8 + 2 + 5 = 10 + 5 = 15',
      '9 + 6 = 9 + 1 + 5 = 10 + 5 = 15',
      '7 + 8 = 7 + 3 + 5 = 10 + 5 = 15',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const firstNumber = Math.floor(Math.random() * 9) + 1
      const secondNumber = Math.floor(Math.random() * 9) + 1
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-near-100',
    title: 'Adding Numbers Near 100',
    description: 'How much from 100, add separately',
    subject: 'addition',
    examples: [
      '97 + 98 = (100-3) + (100-2) = 200 - 5 = 195',
      '96 + 95 = (100-4) + (100-5) = 200 - 9 = 191',
      '99 + 99 = (100-1) + (100-1) = 200 - 2 = 198',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const firstNumber = Math.floor(Math.random() * 20) + 80
      const secondNumber = Math.floor(Math.random() * 20) + 80
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-multiples-5',
    title: 'Adding Multiples of 5',
    description: 'Divide by 5, add, multiply back',
    subject: 'addition',
    examples: [
      '25 + 35 = (5+7) × 5 = 12 × 5 = 60',
      '45 + 55 = (9+11) × 5 = 20 × 5 = 100',
      '15 + 20 = (3+4) × 5 = 7 × 5 = 35',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const a = Math.floor(Math.random() * 20) + 1
      const b = Math.floor(Math.random() * 20) + 1
      const firstNumber = a * 5
      const secondNumber = b * 5
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-simple-practice',
    title: 'Basic Addition Practice',
    description: 'Standard addition, build speed and accuracy',
    subject: 'addition',
    examples: [
      '12 + 13 = 25',
      '23 + 24 = 47',
      '34 + 35 = 69',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const firstNumber = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
      const secondNumber = Math.floor(Math.random() * (range.addMax - range.addMin + 1)) + range.addMin
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
  {
    id: 'add-left-to-right',
    title: 'Left to Right Addition',
    description: 'Add hundreds first, then tens, then ones',
    subject: 'addition',
    examples: [
      '234 + 156 = (200+100) + (30+50) + (4+6) = 300 + 80 + 10 = 390',
      '345 + 267 = (300+200) + (40+60) + (5+7) = 500 + 100 + 12 = 612',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const firstNumber = Math.floor(Math.random() * 900) + 100
      const secondNumber = Math.floor(Math.random() * 900) + 100
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber + secondNumber,
        display: `${firstNumber} + ${secondNumber}`,
        key: `${firstNumber}+${secondNumber}`,
      }
    },
  },
]

// SUBTRACTION TRICKS
const subtractionTricks: Trick[] = [
  {
    id: 'sub-ending-0',
    title: 'Subtracting from Round Numbers',
    description: 'Easy with multiples of 10',
    subject: 'subtraction',
    examples: [
      '30 - 7 = 23 (30 - 10 + 3)',
      '50 - 12 = 38',
      '100 - 23 = 77',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const range = ranges[_difficulty]
      const base = Math.floor(Math.random() * 10) * 10 || 10
      const firstNumber = base
      const secondNumber = Math.floor(Math.random() * (range.addMax - range.addMin + 1)) + range.addMin
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber - secondNumber,
        display: `${firstNumber} - ${secondNumber}`,
        key: `${firstNumber}-${secondNumber}`,
      }
    },
  },
  {
    id: 'sub-complement',
    title: 'Using Complement Method',
    description: 'Find what you need to add to make the goal',
    subject: 'subtraction',
    examples: [
      '50 - 23 = ? (23 + ? = 50, so ? = 27)',
      '100 - 34 = ? (34 + ? = 100, so ? = 66)',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const firstNumber = Math.floor(Math.random() * (range.max - 50)) + 50
      const secondNumber = Math.floor(Math.random() * (firstNumber - 1)) + 1
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber - secondNumber,
        display: `${firstNumber} - ${secondNumber}`,
        key: `${firstNumber}-${secondNumber}`,
      }
    },
  },
  {
    id: 'sub-near-numbers',
    title: 'Subtracting Close Numbers',
    description: 'When subtrahend is close to minuend',
    subject: 'subtraction',
    examples: [
      '100 - 98 = 2',
      '50 - 48 = 2',
      '73 - 71 = 2',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const firstNumber = Math.floor(Math.random() * (range.max - 20)) + 20
      const secondNumber = firstNumber - Math.floor(Math.random() * 10) - 1
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber - secondNumber,
        display: `${firstNumber} - ${secondNumber}`,
        key: `${firstNumber}-${secondNumber}`,
      }
    },
  },
  {
    id: 'sub-simple-practice',
    title: 'Basic Subtraction Practice',
    description: 'Standard subtraction, build speed',
    subject: 'subtraction',
    examples: [
      '25 - 12 = 13',
      '47 - 23 = 24',
      '69 - 34 = 35',
    ],
    generateQuestion: (difficulty: Difficulty) => {
      const range = ranges[difficulty]
      const firstNumber = Math.floor(Math.random() * (range.max - 20)) + 20
      const secondNumber = Math.floor(Math.random() * firstNumber)
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber - secondNumber,
        display: `${firstNumber} - ${secondNumber}`,
        key: `${firstNumber}-${secondNumber}`,
      }
    },
  },
]

// MULTIPLICATION TRICKS
const multiplicationTricks: Trick[] = [
  {
    id: 'mult-11',
    title: 'Multiplying by 11',
    description: 'Add digits together in the middle',
    subject: 'multiplication',
    examples: [
      '23 × 11 = 253 (2_3 → 2+3=5 → 253)',
      '45 × 11 = 495 (4_5 → 4+5=9 → 495)',
      '34 × 11 = 374 (3_4 → 3+4=7 → 374)',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const firstNumber = Math.floor(Math.random() * 89) + 10
      const secondNumber = 11
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber * secondNumber,
        display: `${firstNumber} × ${secondNumber}`,
        key: `${firstNumber}*${secondNumber}`,
      }
    },
  },
  {
    id: 'mult-5',
    title: 'Quick Multiply by 5',
    description: 'Multiply by 10, then divide by 2',
    subject: 'multiplication',
    examples: [
      '24 × 5 = 240 ÷ 2 = 120',
      '46 × 5 = 460 ÷ 2 = 230',
      '38 × 5 = 380 ÷ 2 = 190',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const firstNumber = Math.floor(Math.random() * 90) + 10
      const secondNumber = 5
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber * secondNumber,
        display: `${firstNumber} × ${secondNumber}`,
        key: `${firstNumber}*${secondNumber}`,
      }
    },
  },
  {
    id: 'mult-9',
    title: 'Multiply by 9 Using Fingers',
    description: 'Subtract 1 from the number, then complement to 9',
    subject: 'multiplication',
    examples: [
      '4 × 9 = 36 (4-1=3, 9-3=6 → 36)',
      '7 × 9 = 63 (7-1=6, 9-6=3 → 63)',
      '8 × 9 = 72 (8-1=7, 9-7=2 → 72)',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const firstNumber = Math.floor(Math.random() * 8) + 2
      const secondNumber = 9
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber * secondNumber,
        display: `${firstNumber} × ${secondNumber}`,
        key: `${firstNumber}*${secondNumber}`,
      }
    },
  },
  {
    id: 'mult-10-100',
    title: 'Multiply by 10 and 100',
    description: 'Just add zeros',
    subject: 'multiplication',
    examples: [
      '23 × 10 = 230',
      '45 × 100 = 4500',
      '12 × 10 = 120',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const firstNumber = Math.floor(Math.random() * 90) + 10
      const multiplier = Math.random() > 0.5 ? 10 : 100
      return {
        firstNumber,
        secondNumber: multiplier,
        answer: firstNumber * multiplier,
        display: `${firstNumber} × ${multiplier}`,
        key: `${firstNumber}*${multiplier}`,
      }
    },
  },
  {
    id: 'mult-square-near-50',
    title: 'Squaring Numbers Near 50',
    description: 'Use (50+x)² = 2500 + 100x + x²',
    subject: 'multiplication',
    examples: [
      '48² = 2304 (48 = 50-2, so 2500 - 200 + 4)',
      '52² = 2704 (52 = 50+2, so 2500 + 200 + 4)',
      '51² = 2601 (51 = 50+1, so 2500 + 100 + 1)',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const offset = Math.floor(Math.random() * 9) - 4
      const firstNumber = 50 + offset
      return {
        firstNumber,
        secondNumber: firstNumber,
        answer: firstNumber * firstNumber,
        display: `${firstNumber} × ${firstNumber}`,
        key: `${firstNumber}*${firstNumber}`,
      }
    },
  },
  {
    id: 'mult-simple-practice',
    title: 'Basic Multiplication Practice',
    description: 'Standard multiplication, build tables',
    subject: 'multiplication',
    examples: [
      '12 × 3 = 36',
      '23 × 4 = 92',
      '15 × 5 = 75',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const firstNumber = Math.floor(Math.random() * 89) + 11
      const secondNumber = Math.floor(Math.random() * 9) + 2
      return {
        firstNumber,
        secondNumber,
        answer: firstNumber * secondNumber,
        display: `${firstNumber} × ${secondNumber}`,
        key: `${firstNumber}*${secondNumber}`,
      }
    },
  },
]

// DIVISION TRICKS
const divisionTricks: Trick[] = [
  {
    id: 'div-by-5',
    title: 'Dividing by 5',
    description: 'Multiply by 2, then divide by 10',
    subject: 'division',
    examples: [
      '120 ÷ 5 = 120 × 2 ÷ 10 = 240 ÷ 10 = 24',
      '250 ÷ 5 = 250 × 2 ÷ 10 = 500 ÷ 10 = 50',
      '35 ÷ 5 = 35 × 2 ÷ 10 = 70 ÷ 10 = 7',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const divisor = 5
      const quotient = Math.floor(Math.random() * 50) + 1
      const firstNumber = divisor * quotient
      return {
        firstNumber,
        secondNumber: divisor,
        answer: quotient,
        display: `${firstNumber} ÷ ${divisor}`,
        key: `${firstNumber}/${divisor}`,
      }
    },
  },
  {
    id: 'div-by-10-100',
    title: 'Dividing by 10 and 100',
    description: 'Just move the decimal point',
    subject: 'division',
    examples: [
      '230 ÷ 10 = 23',
      '4500 ÷ 100 = 45',
      '1200 ÷ 10 = 120',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const quotient = Math.floor(Math.random() * 90) + 10
      const divisor = Math.random() > 0.5 ? 10 : 100
      const firstNumber = quotient * divisor
      return {
        firstNumber,
        secondNumber: divisor,
        answer: quotient,
        display: `${firstNumber} ÷ ${divisor}`,
        key: `${firstNumber}/${divisor}`,
      }
    },
  },
  {
    id: 'div-simple-practice',
    title: 'Basic Division Practice',
    description: 'Standard division, build tables',
    subject: 'division',
    examples: [
      '36 ÷ 3 = 12',
      '92 ÷ 4 = 23',
      '75 ÷ 5 = 15',
    ],
    generateQuestion: (_difficulty: Difficulty) => {
      const divisor = Math.floor(Math.random() * 9) + 2
      const quotient = Math.floor(Math.random() * 50) + 1
      const firstNumber = divisor * quotient
      return {
        firstNumber,
        secondNumber: divisor,
        answer: quotient,
        display: `${firstNumber} ÷ ${divisor}`,
        key: `${firstNumber}/${divisor}`,
      }
    },
  },
]

export const tricks: Trick[] = [...additionTricks, ...subtractionTricks, ...multiplicationTricks, ...divisionTricks]

export const tricksBySubject = {
  addition: additionTricks,
  subtraction: subtractionTricks,
  multiplication: multiplicationTricks,
  division: divisionTricks,
}

export const tricksBySubjectWithNames = {
  '➕ Addition': additionTricks,
  '➖ Subtraction': subtractionTricks,
  '✕ Multiplication': multiplicationTricks,
  '÷ Division': divisionTricks,
}

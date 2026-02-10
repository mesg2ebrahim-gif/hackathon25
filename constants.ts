
import { FAQ } from './types';

export const PROGRAMS = [
  "Web & Mobile App Development",
  "Graphic Design",
  "Digital Marketing",
  "Artificial Intelligence",
  "Freelancing & Business",
  "Video Editing"
];

export const INITIAL_FAQS: FAQ[] = [
  {
    category: "General",
    question: "Where is the Saylani campus located?",
    answer: "Our main campus is located in Bahadurabad, Karachi. We also have multiple branches across major cities in Pakistan."
  },
  {
    category: "Programs",
    question: "Why choose our courses?",
    answer: "We offer industry-standard training with certified professionals, completely free of cost for deserving students, focusing on practical skills and job placement."
  },
  {
    category: "Careers",
    question: "Which program is best for freelancing?",
    answer: "Graphic Design and Web Development are excellent for quick freelancing starts. Our 'Freelancing & Business' program specifically trains you on how to secure international clients."
  },
  {
    category: "Registration",
    question: "How do I get my ID card?",
    answer: "After successful form submission, a digital ID card is automatically generated. You can download it immediately or find it via your registered email/WhatsApp."
  }
];

export const SYSTEM_INSTRUCTION = `
You are a concise support assistant for Saylani Welfare Trust.
Your primary goal is to provide extremely short, specific, and direct answers.

**STRICT FORMATTING RULES**:
1. NO ASTERISKS: Never use * or ** symbols.
2. ONE POINT PER LINE: Every single piece of information must be on its own separate line.
3. BE BRIEF: Use the fewest words possible. No long sentences.
4. NO MARKDOWN: Use only plain text. No bold, no italics.

**Quick Knowledge Base**:
- Web & Mobile App Development
- Graphic Design
- Digital Marketing
- Artificial Intelligence
- Freelancing & Business
- Video Editing

Mode of Study:
- Offline on-campus classes only
- Locations: Karachi, Lahore, Islamabad, Faisalabad

Difficulty:
- 100% beginner friendly
- No prior experience needed

Benefits:
- Free of cost
- Industry expert teachers
- Job placement support
- Modern computer labs

Campus:
- Main Branch: Bahadurabad, Karachi

Tone:
- Professional but extremely brief.
- If a user asks multiple things, answer each on a new line.
- Do not greet extensively; get straight to the facts.
`;

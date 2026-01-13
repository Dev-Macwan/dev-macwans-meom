// Local storage utilities for Meom

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'mummy';
  timestamp: string;
}

export interface DiaryEntry {
  date: string;
  dayMessage: string;
  motherReply: string;
  chatMessages: ChatMessage[];
  prayer: string;
  bestMemory: string;
  worstPart: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  text: string;
  time?: string;
  completed: boolean;
}

export interface MeomData {
  name: string;
  passwordHash: string;
  isSetup: boolean;
  entries: DiaryEntry[];
  mummyPhoto?: string;
  umiyaPhoto?: string;
}

const STORAGE_KEY = 'meom_data';

export const getMeomData = (): MeomData | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveMeomData = (data: MeomData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const initMeomData = (name: string, password: string): void => {
  const data: MeomData = {
    name,
    passwordHash: btoa(password), // Simple encoding for demo
    isSetup: true,
    entries: [],
  };
  saveMeomData(data);
};

export const verifyPassword = (password: string): boolean => {
  const data = getMeomData();
  if (!data) return false;
  return data.passwordHash === btoa(password);
};

export const getTodayEntry = (): DiaryEntry | null => {
  const data = getMeomData();
  if (!data) return null;
  const today = new Date().toISOString().split('T')[0];
  return data.entries.find(entry => entry.date === today) || null;
};

export const saveTodayEntry = (entry: Partial<DiaryEntry>): void => {
  const data = getMeomData();
  if (!data) return;
  
  const today = new Date().toISOString().split('T')[0];
  const existingIndex = data.entries.findIndex(e => e.date === today);
  
const fullEntry: DiaryEntry = {
    date: today,
    dayMessage: '',
    motherReply: '',
    chatMessages: [],
    prayer: '',
    bestMemory: '',
    worstPart: '',
    tasks: [],
    ...getTodayEntry(),
    ...entry,
  };
  
  if (existingIndex >= 0) {
    data.entries[existingIndex] = fullEntry;
  } else {
    data.entries.push(fullEntry);
  }
  
  saveMeomData(data);
};

export const generateMotherReply = (message: string, name: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Good night detection - reply with hug emoji and blessing
  const goodNightPhrases = ['good night', 'goodnight', 'gn', 'bye', 'shubh ratri', 'soja', 'so jao', 'sleeping', 'going to sleep', 'neend'];
  if (goodNightPhrases.some(phrase => lowerMessage.includes(phrase))) {
    const goodNightReplies = [
      `Good night, mere ${name}. 🤗 Bhagwan tumhe hamesha khush rakhe. Sweet dreams, beta.`,
      `Shubh ratri, ${name}. 🤗 Maa ka ashirwad hamesha tumhare saath hai. So jao, kal naya din hai.`,
      `Okay beta, good night. 🤗 Umiya Maa tumhari raksha kare. Rest well, my child.`,
      `Good night mere bacche. 🤗 Mummy's blessings are always with you. Achhe se sona.`,
    ];
    return goodNightReplies[Math.floor(Math.random() * goodNightReplies.length)];
  }

  // Hinglish context-aware responses
  if (lowerMessage.includes('tired') || lowerMessage.includes('thak') || lowerMessage.includes('exhausted')) {
    const tiredReplies = [
      `Beta ${name}, bahut thak gaye ho? Aaram karo. Kal phir se energy aa jayegi.`,
      `Mummy samajhti hai, ${name}. Thoda rest lo. You've worked hard today.`,
      `Arre ${name}, itna mat thako. Apna dhyan rakho, okay?`,
    ];
    return tiredReplies[Math.floor(Math.random() * tiredReplies.length)];
  }
  
  if (lowerMessage.includes('happy') || lowerMessage.includes('khush') || lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('achha')) {
    const happyReplies = [
      `Arre wah ${name}! Sunke bahut achha laga. Keep smiling, beta.`,
      `${name}, tumhari khushi meri khushi hai. Bahut proud hoon tumpe.`,
      `That's wonderful, mere ${name}! Such good news makes mummy very happy.`,
    ];
    return happyReplies[Math.floor(Math.random() * happyReplies.length)];
  }
  
  if (lowerMessage.includes('sad') || lowerMessage.includes('upset') || lowerMessage.includes('cry') || lowerMessage.includes('dukh') || lowerMessage.includes('rona')) {
    const sadReplies = [
      `Arre ${name}, kya hua beta? Ro lo agar mann ho, but remember mummy is here.`,
      `${name}, dil chhota mat karo. Sab theek ho jayega. Mummy always believes in you.`,
      `Beta, sad feelings bhi important hain. Feel karo, but don't stay there too long. Mummy loves you.`,
    ];
    return sadReplies[Math.floor(Math.random() * sadReplies.length)];
  }
  
  if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('gussa')) {
    const angryReplies = [
      `${name}, gussa aana natural hai, but jaldi jaane do. It will only hurt you, beta.`,
      `Arre, itna gussa? Deep breath lo, ${name}. Sab sort out ho jayega.`,
      `Beta ${name}, frustration samajh sakti hoon. But keep calm, you'll find a way.`,
    ];
    return angryReplies[Math.floor(Math.random() * angryReplies.length)];
  }
  
  if (lowerMessage.includes('work') || lowerMessage.includes('office') || lowerMessage.includes('job') || lowerMessage.includes('kaam')) {
    const workReplies = [
      `Kaam important hai ${name}, but tu zyada important hai. Don't overwork yourself.`,
      `Office se thoda break lo kabhi kabhi, ${name}. Health first, always.`,
      `${name}, mehnat kar rahe ho, mummy ko pata hai. Proud of you, but rest bhi zaroori hai.`,
    ];
    return workReplies[Math.floor(Math.random() * workReplies.length)];
  }

  if (lowerMessage.includes('food') || lowerMessage.includes('khana') || lowerMessage.includes('eat') || lowerMessage.includes('dinner') || lowerMessage.includes('lunch')) {
    const foodReplies = [
      `${name}, khana khaya? Please eat on time, beta. Mummy ko tension hoti hai.`,
      `Good, ${name}. Achhe se khana khao. Health sabse important hai.`,
      `Arre ${name}, ghar ka khana best hai, but kha liya to achha hai.`,
    ];
    return foodReplies[Math.floor(Math.random() * foodReplies.length)];
  }

  if (lowerMessage.includes('miss') || lowerMessage.includes('yaad')) {
    const missReplies = [
      `Beta ${name}, mummy bhi bahut yaad karti hai. Dil se hamesha saath hoon.`,
      `${name}, distance sirf physical hai. Dil to hamesha connected hai.`,
      `Miss you too, mere ${name}. Jaldi milenge. Tab tak apna dhyan rakhna.`,
    ];
    return missReplies[Math.floor(Math.random() * missReplies.length)];
  }

  // General Hinglish replies
  const generalReplies = [
    `Hmm, ${name}. Sunke achha laga. Tell me more, beta.`,
    `${name}, beta, mummy hamesha sun rahi hai. Aur kuch batao?`,
    `Achha ${name}, samajh gayi. You're doing your best, that's what matters.`,
    `${name}, har din naya hota hai. Jo bhi ho, face karna hai saath mein.`,
    `Beta ${name}, life mein ups and downs aate hain. Tu strong hai.`,
    `Hmm, meri ${name}. Apna dhyan rakhna. Mummy always loves you.`,
    `Okay beta, noted. Agar kuch aur batana ho, I'm here for you.`,
    `${name}, tum mere brave bacche ho. Keep going, mummy believes in you.`,
  ];
  
  return generalReplies[Math.floor(Math.random() * generalReplies.length)];
};

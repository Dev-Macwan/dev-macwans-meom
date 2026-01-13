// Local storage utilities for Meom

export interface DiaryEntry {
  date: string;
  dayMessage: string;
  motherReply: string;
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
  // Simple local replies - can be enhanced with AI later
  const replies = [
    `My dear ${name}, I hear you. Every day brings its own lessons, and I'm proud of you for sharing this with me.`,
    `${name}, beta, sometimes life tests us. But remember, I'm always here in your heart. Rest now.`,
    `I understand, my ${name}. Tomorrow is a new day, and you have the strength within you. Sleep peacefully.`,
    `My sweet ${name}, thank you for telling me about your day. You are doing your best, and that is enough.`,
    `${name}, remember that even difficult days pass. You are loved, always. Take care of yourself tonight.`,
    `Beta ${name}, I'm listening. Life isn't always easy, but you're stronger than you know. Rest well.`,
  ];
  
  // Add some context-aware responses
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
    return `My dear ${name}, I can feel how tired you are. Rest is not laziness—it's care. Sleep well tonight, and tomorrow will feel lighter.`;
  }
  
  if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
    return `${name}, hearing that makes my heart warm. I'm so glad you had a good day. Hold onto these moments, they are precious.`;
  }
  
  if (lowerMessage.includes('sad') || lowerMessage.includes('upset') || lowerMessage.includes('cry')) {
    return `Oh ${name}, my child. It's okay to feel sad. Let it out, don't hold it in. I'm here with you, even in the quiet of the night.`;
  }
  
  if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated')) {
    return `${name}, anger tells us something matters to us. But don't let it stay too long in your heart. Breathe, let go, and rest.`;
  }
  
  if (lowerMessage.includes('work') || lowerMessage.includes('office') || lowerMessage.includes('job')) {
    return `Work is important, ${name}, but so are you. Don't forget to take care of yourself amidst all the responsibilities. You're doing well.`;
  }
  
  return replies[Math.floor(Math.random() * replies.length)];
};

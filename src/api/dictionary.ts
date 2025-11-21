import axios from "axios";

// Type for phonetics
export interface Phonetic {
  text?: string;
  audio?: string;
}

// Type for each definition
export interface Definition {
  definition: string;
  example?: string;
  synonyms?: string[];
}

// Type for meaning
export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

// Type for the word data
export interface WordData {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}

// Fetch word definition from API
export async function getWordDefinition(word: string): Promise<WordData[]> {
  if (!word) return [];
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.data as WordData[];
  } catch (error) {
    throw new Error("Word not found");
  }
}

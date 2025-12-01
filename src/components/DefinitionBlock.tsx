import { Button } from "./ui/button";
import {type  WordData } from "../api/dictionary";

interface DefinitionBlockProps {
  wordData: WordData[];
}

export const DefinitionBlock = ({ wordData }: DefinitionBlockProps) => {
  if (wordData.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Phonetics with audio */}
      {wordData[0].phonetics.map((phonetic, index) =>
        phonetic.audio ? (
          <Button
            key={index}
            onClick={() => new Audio(phonetic.audio).play()}
            className="mb-2"
          >
            ▶ Play Pronunciation {phonetic.text ? `(${phonetic.text})` : ""}
          </Button>
        ) : null
      )}

      {/* Meanings */}
      {wordData[0].meanings.map((meaning, i) => (
        <div
          key={i}
          className="border p-4 rounded-xl bg-gray-50"
        >
          <p className="italic font-medium">{meaning.partOfSpeech}</p>
          {meaning.definitions.map((def, j) => (
            <div key={j} className="text-sm mt-2">
              • {def.definition}
              {def.example && <span className="text-gray-500"> — "{def.example}"</span>}
              {def.synonyms && def.synonyms.length > 0 && (
                <span className="text-blue-500"> (Synonyms: {def.synonyms.join(", ")})</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

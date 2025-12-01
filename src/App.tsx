import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useWordStore } from "./store/wordStore";
import { getWordDefinition, type WordData } from "./api/dictionary";
import { SearchBar } from "./components/SearchBar";
import { DefinitionBlock } from "./components/DefinitionBlock";
import { Card, CardHeader, CardContent } from "./components/Card";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DictionaryPage />
    </QueryClientProvider>
  );
}

function DictionaryPage() {
  const { currentWord, addToHistory, searchHistory } = useWordStore();

  const { data, isLoading, isError, refetch, isSuccess } = useQuery<WordData[]>({
    queryKey: ["word", currentWord],
    queryFn: () => getWordDefinition(currentWord),
    enabled: false,
  });

  // Save successful searches to history
  useEffect(() => {
    if (isSuccess && currentWord) addToHistory(currentWord);
  }, [isSuccess, currentWord, addToHistory]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6 text-black">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4">
        
        {/* Header */}
        <CardHeader>
          <h1 className="text-xl font-bold text-center w-full">Simple Dictionary</h1>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="flex flex-col gap-4">

          {/* Search Bar */}
          <SearchBar onSearch={refetch} />

          {/* Status Messages */}
          {isLoading && <p className="text-gray-500">Looking for the word...</p>}
          {isError && <p className="text-red-500">Oops! Word not found.</p>}

          {/* Word Definitions */}
          {data && <DefinitionBlock wordData={data} />}

          {/* Recent Searches */}
          {searchHistory.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">Recent Words:</p>
              <ul className="list-disc pl-5">
                {searchHistory.map((word, idx) => (
                  <li key={idx}>{word}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

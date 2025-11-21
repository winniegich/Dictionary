import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWordStore } from "@/store/wordStore";

interface Props {
  onSearch: () => void;
}

export const SearchBar = ({ onSearch }: Props) => {
  const { currentWord, setCurrentWord } = useWordStore();

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Type a word..."
        value={currentWord}
        onChange={(e) => setCurrentWord(e.target.value)}
      />
      <Button onClick={() => currentWord && onSearch()}>Search</Button>
    </div>
  );
};

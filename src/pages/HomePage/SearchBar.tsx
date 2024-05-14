import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="flex flex-start bg-background w-[80%] rounded-3xl h-20">
      <div className="flex items-center w-1/2 h-full">
        <Search className="w-7 h-7 ml-4 mr-2" strokeWidth={2} />
        <input
          type="text"
          placeholder="Ara..."
          className="flex-1 h-full bg-transparent outline-none"
        />
      </div>
      <div className="flex items-center justify-center w-1/2">
        <div className="flex items-center justify-center w-1/3"></div>
        <div className="flex items-center justify-center w-1/3"></div>
        <div className="flex items-center justify-center w-1/3"></div>
      </div>
    </div>
  );
}

export default SearchBar;

import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { EmploymentTypeArray, workTypesArray } from "@/const";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

export interface PostingFilters {
  matchQuery?: string;
  workType?: string;
  employmentType?: string;
  hasSalary?: string;
}

export interface SearchbarProps {
  filters: PostingFilters;
  setFilters: (filters: PostingFilters) => void;
}

function SearchBar({ filters, setFilters }: SearchbarProps) {
  const debounced = useDebouncedCallback((value) => {
    setFilters({ ...filters, matchQuery: value });
  }, 1000);

  return (
    <div className="flex flex-col md:flex-row flex-start bg-background w-[90%] rounded-3xl h-28 md:h-20 border-2 hover:ease-in hover:duration-500 hover:border-orange-500">
      <div className="flex items-center w-full md:w-2/5 h-full">
        <Search className="w-7 h-7 ml-4 mr-2" strokeWidth={2} />
        <input
          type="text"
          placeholder="Ara..."
          className="flex-1 h-full bg-transparent outline-none"
          onChange={(event) => debounced(event.target.value)}
        />
      </div>
      <div className="flex items-center justify-start md:justify-end w-[90%] pl-2 mx-4 md:w-3/5 overflow-x-auto h-full">
        <Combobox
          value={filters?.workType}
          data={workTypesArray}
          onSelect={(value) => {
            setFilters({ ...filters, workType: value });
          }}
          title="Çalışma Türü"
          className="m-0 mr-2"
          cleanable
        />
        <Combobox
          data={EmploymentTypeArray}
          value={filters?.employmentType}
          onSelect={(value) => {
            setFilters({ ...filters, employmentType: value });
          }}
          title="İstihtam Türü"
          className="m-0 mr-2"
          cleanable
        />
        <Combobox
          value={filters?.hasSalary}
          data={[
            { label: "Maaş Ödemesi Var", value: "true" },
            { label: "Maaş Ödemesi Yok", value: "false" },
          ]}
          onSelect={(value) => {
            setFilters({ ...filters, hasSalary: value });
          }}
          title="Maaş Bilgisi"
          className="m-0 mr-2"
          cleanable
        />
      </div>
    </div>
  );
}

export default SearchBar;

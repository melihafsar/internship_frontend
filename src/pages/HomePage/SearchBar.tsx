import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { EmploymentTypeArray, workTypesArray } from "@/const";
import { Search } from "lucide-react";
import { useDebouncedCallback } from 'use-debounce';

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
  const debounced = useDebouncedCallback(
    (value) => {
      setFilters({ ...filters, matchQuery: value });
    },
    1000
  );

  return (
    <div className="flex flex-start bg-background w-[80%] rounded-3xl h-20">
      <div className="flex items-center w-1/2 h-full">
        <Search className="w-7 h-7 ml-4 mr-2" strokeWidth={2} />
        <input
          type="text"
          placeholder="Ara..."
          className="flex-1 h-full bg-transparent outline-none"
          onChange={(event) => debounced(event.target.value)}
        />

      </div>
      <div className="flex items-center justify-center w-1/2">
        <div className="flex items-center justify-center w-1/3">
          <Combobox
            value={filters?.workType}
            data={workTypesArray}
            onSelect={(value) => { setFilters({ ...filters, workType: value }) }}
            title="Çalışma Türü"
            cleanable
          />
        </div>
        <div className="flex items-center justify-center w-1/3">
          <Combobox
            data={EmploymentTypeArray}
            value={filters?.employmentType}
            onSelect={(value) => { setFilters({ ...filters, employmentType: value }) }}
            title="İstihtam Türü"
            cleanable
          />
        </div>
        <div className="flex items-center justify-center w-1/3">
          <Combobox
            value={filters?.hasSalary}
            data={[{ label: "Maaş Ödemesi Var", value: "true" }, { label: "Maaş Ödemesi Yok", value: "false" }]}
            onSelect={(value) => { setFilters({ ...filters, hasSalary: value }) }}
            title="Maaş Bilgisi"
            cleanable
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;




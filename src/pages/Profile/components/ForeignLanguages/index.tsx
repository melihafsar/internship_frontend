import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function ForeignLanguages() {
  const [selectedDegree, setSelectedDegree] = useState(0);

  const LanguageDegree = [
    { key: 0, label: "A1 - Başlangıç" },
    { key: 1, label: "A2 - Temel" },
    { key: 2, label: "B1 - Orta" },
    { key: 3, label: "B2 - İyi" },
    { key: 4, label: "C1 - Çok İyi" },
    { key: 5, label: "C2 - Ana Dil" },
  ];

  return (
    <Select onValueChange={(value) => setSelectedDegree(value)}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Yabancı dil düzeyi seçiniz" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Yabancı Dil Derecesi</SelectLabel>
          {LanguageDegree.map((degree) => (
            <SelectItem key={`${degree.key}-select-item`} value={degree.key}>
              {degree.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ForeignLanguages;

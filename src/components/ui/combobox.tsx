//@ts-nocheck
"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";



export type ComboboxData = { value: string; label: string }[] | [];
interface ComboboxProps {
  data: ComboboxData;
  title: string;
  className?: string;
  onSelect: (value: string) => void;
  value?: string;
  cleanable?: boolean;
}


export function Combobox({
  data,
  title,
  className,
  onSelect,
  value,
  cleanable,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || "");

  const handleSelect = (value: string) => {
    if (cleanable && selectedValue === value) {
      setSelectedValue(undefined);
      onSelect(undefined);
      setOpen(false);
      return;
    }
    setSelectedValue(value);
    onSelect(value);
    setOpen(false);
  };

  useEffect(() => {
    setSelectedValue(value || "");  
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          <p className="truncate">
            {selectedValue
              ? data.find((item) => item.value === selectedValue)?.label
              : title}
          </p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[230px] p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Arayın..." />
          <CommandEmpty>Üzgünüz bulamadık...</CommandEmpty>
          <CommandGroup className="h-[240px] overflow-y-auto">
            {data.map((item, index) => (
              <CommandItem
                key={`${item.label}-${index}`}
                value={item.label}
                onSelect={() => handleSelect(item.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedValue === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { templateService } from "@/services/templateService";

interface TemplateSelectorProps {
  onSelect: (templateName: string) => void;
  isLoading?: boolean;
}

export function TemplateSelector({ onSelect, isLoading }: TemplateSelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { data: templates, isLoading: isLoadingTemplates } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
         // Assuming we can fetch all or search. 
         // Integrating existing templateService
         const res = await templateService.getAll({ page: 1, limit: 100 }); 
         // Assuming res.data is the array or res is the array. Adjust based on templateService response.
         return res?.data || [];
    }
  });

  return (
    <div className="flex items-center gap-2 w-full">
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            >
            {value
                ? templates?.find((framework: any) => framework.name === value)?.name
                : "Select template..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
            <Command>
            <CommandInput placeholder="Search template..." />
            <CommandList>
                <CommandEmpty>No template found.</CommandEmpty>
                <CommandGroup>
                {isLoadingTemplates ? (
                     <div className="p-4 text-center text-sm text-slate-400">Loading...</div>
                ) : (
                    templates?.map((template: any) => (
                        <CommandItem
                        key={template.id}
                        value={template.name}
                        onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue);
                            setOpen(false);
                        }}
                        >
                        <Check
                            className={cn(
                            "mr-2 h-4 w-4",
                            value === template.name ? "opacity-100" : "opacity-0"
                            )}
                        />
                        {template.name}
                        </CommandItem>
                    ))
                )}
                </CommandGroup>
            </CommandList>
            </Command>
        </PopoverContent>
        </Popover>
        <Button 
            disabled={!value || isLoading} 
            onClick={() => onSelect(value)}
            className="shrink-0 bg-indigo-600 hover:bg-indigo-700"
        >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4" />}
        </Button>
    </div>
  );
}

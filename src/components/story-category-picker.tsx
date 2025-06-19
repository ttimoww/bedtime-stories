"use client";

import { Check } from "lucide-react";
import { useRef } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "adventure",
    name: "Adventure",
    icon: "🌟",
    description: "Exciting journeys and discoveries",
  },
  {
    id: "fantasy",
    name: "Fantasy",
    icon: "🦄",
    description: "Magical worlds and creatures",
  },
  {
    id: "nature",
    name: "Nature",
    icon: "🌳",
    description: "Stories about animals and the environment",
  },
  {
    id: "space",
    name: "Space",
    icon: "🚀",
    description: "Cosmic adventures and exploration",
  },
  {
    id: "fairytale",
    name: "Fairy Tale",
    icon: "👑",
    description: "Classic fairy tale themes",
  },
  {
    id: "educational",
    name: "Educational",
    icon: "📚",
    description: "Learning through stories",
  },
];

interface StoryCategoryPickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export function StoryCategoryPicker<T extends FieldValues>({
  control,
  name,
}: StoryCategoryPickerProps<T>) {
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const setButtonRef = (index: number) => (el: HTMLButtonElement | null) => {
    buttonsRef.current[index] = el;
  };

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    const buttons = buttonsRef.current.filter(Boolean);
    let nextIndex = index;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % buttons.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + buttons.length) % buttons.length;
        break;
      case "ArrowDown":
        nextIndex = (index + 3) % buttons.length;
        break;
      case "ArrowUp":
        nextIndex = (index - 3 + buttons.length) % buttons.length;
        break;
      default:
        return;
    }

    buttons[nextIndex]?.focus();
    event.preventDefault();
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Story Category</FormLabel>
          <FormControl>
            <div
              role="radiogroup"
              aria-label="Select a story category"
              className="grid grid-cols-2 gap-4 md:grid-cols-3"
            >
              {categories.map((category, index) => (
                <button
                  ref={setButtonRef(index)}
                  key={category.id}
                  type="button"
                  role="radio"
                  aria-checked={field.value === category.id}
                  tabIndex={
                    field.value === category.id || (!field.value && index === 0)
                      ? 0
                      : -1
                  }
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all",
                    "hover:border-primary/50 hover:bg-accent focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none",
                    field.value === category.id
                      ? "border-primary bg-accent"
                      : "border-muted",
                  )}
                  onClick={() => field.onChange(category.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  {field.value === category.id && (
                    <span
                      className="text-primary absolute top-2 right-2"
                      aria-hidden="true"
                    >
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                  <span className="mb-2 text-4xl" aria-hidden="true">
                    {category.icon}
                  </span>
                  <span className="font-medium">{category.name}</span>
                  <span className="text-muted-foreground text-center text-sm">
                    {category.description}
                  </span>
                </button>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

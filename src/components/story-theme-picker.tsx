import { Check } from "lucide-react";
import { useRef } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface Theme {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const themes: Theme[] = [
  {
    id: "dinosaurs",
    name: "Dinosaurs",
    icon: "🦖",
    description: "Stories about prehistoric creatures",
  },
  {
    id: "pirates",
    name: "Pirates",
    icon: "🏴‍☠️",
    description: "Adventures on the high seas",
  },
  {
    id: "princess",
    name: "Princess",
    icon: "👸",
    description: "Royal tales and magic",
  },
  {
    id: "space",
    name: "Space",
    icon: "🚀",
    description: "Cosmic adventures and exploration",
  },
  {
    id: "animals",
    name: "Animals",
    icon: "🦁",
    description: "Stories featuring furry friends",
  },
];

interface StoryThemePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export function StoryThemePicker<T extends FieldValues>({
  control,
  name,
}: StoryThemePickerProps<T>) {
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const setButtonRef =
    (index: number) => (element: HTMLButtonElement | null) => {
      buttonsRef.current[index] = element;
    };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const buttons = buttonsRef.current.filter(Boolean);
    let nextIndex = index;

    switch (e.key) {
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

    e.preventDefault();
    buttons[nextIndex]?.focus();
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Story Theme</FormLabel>
          <FormControl>
            <div
              role="radiogroup"
              aria-label="Select a story theme"
              className="grid grid-cols-2 gap-4 md:grid-cols-3"
            >
              {themes.map((theme, index) => (
                <button
                  ref={setButtonRef(index)}
                  key={theme.id}
                  type="button"
                  role="radio"
                  aria-checked={field.value === theme.id}
                  tabIndex={
                    field.value === theme.id || (!field.value && index === 0)
                      ? 0
                      : -1
                  }
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all",
                    "hover:border-primary/50 hover:bg-accent focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none",
                    field.value === theme.id
                      ? "border-primary bg-accent"
                      : "border-muted",
                  )}
                  onClick={() => field.onChange(theme.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  {field.value === theme.id && (
                    <span
                      className="text-primary absolute top-2 right-2"
                      aria-hidden="true"
                    >
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                  <span className="mb-2 text-4xl" aria-hidden="true">
                    {theme.icon}
                  </span>
                  <span className="font-medium">{theme.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {theme.description}
                  </span>
                </button>
              ))}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

import * as React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

const colorGradingOptions = [
  { label: 'Film Velvia', value: 'film-velvia' },
  { label: 'Film Portra', value: 'film-portra' },
  { label: 'Ektar', value: 'ektar' },
];

interface ColorGradingSelectorProps {
  value?: string;
  onChange?: (grading: string) => void;
  className?: string;
  error?: string;
}

const ColorGradingSelector: React.FC<ColorGradingSelectorProps> = ({
  value = 'film-velvia',
  onChange,
  className = '',
  error,
}) => {
  const handleValueChange = (grading: string) => {
    onChange?.(grading);
  };


  return (
    <div className="leading-0">
    <div className={cn("color-grading-selector gap-1 grid grid-cols-3 items-center", className)}>
      <label htmlFor="color-grading" className="text-gray-700 font-[400] text-sm mb-2">
        Color Grading
      </label>
      <div className="col-span-2 ml-auto bg-gray-100 rounded-full">
        <ToggleGroup.Root
          type="single"
          value={value}
          onValueChange={handleValueChange}
          className="flex space-x-2"
        >
          {colorGradingOptions.map((option, index) => (
            <ToggleGroup.Item
              key={option.value}
              value={option.value}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium leading-3",
                value === option.value ? "bg-orange-300 text-orange-900" : "text-gray-700",
                index === 1 ? 'rounded-none' : index === 0 ? 'rounded-l-full' : 'rounded-r-full'
              )}
              
            >
              {option.label}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
    </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default ColorGradingSelector;

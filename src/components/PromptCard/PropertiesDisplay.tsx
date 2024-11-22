import React from "react";
import { Prompt } from "@/types";
import { Paperclip } from "lucide-react";

interface PropertiesDisplayProps {
  prompt: Prompt;
}

type DisplayProperty = {
  key: keyof Prompt | [keyof Prompt, keyof Prompt]; // Single key or tuple for combination
  label: string;
  extraText?: string;
  link?: string;
  joiner?: string;
};

const displayProperties: DisplayProperty[] = [
  { key: "style", label: "Style" },
  { key: "cfg_scale", label: "Scale" },
  { key: "seed", label: "Seed" },
  { key: "steps", label: "Steps" },
  { key: ["w", "h"], label: "Size", joiner: "x" }, // Combined w and h with "x" as joiner
  { key: "scheduler", label: "Scheduler" },
  { key: "color_grading", label: "Color Grading" },
  { key: "film_grain", label: "Film Grain" },
  { key: "super_resolution", label: "Super-Resolution" },
  {
    key: "only_upscale",
    label: "Upscale",
    link: "https://docs.astria.ai/docs/use-cases/upscale",
  },
  {
    key: "tiled_upscale",
    label: "Tiled Upscale",
    link: "https://docs.astria.ai/docs/features/tiled-upscale",
  },
  { key: "hires_fix", label: "HiRes Fix" },
  { key: "face_correct", label: "Face Correct" },
  {
    key: "face_swap",
    label: "Face Swap",
    link: "https://docs.astria.ai/docs/features/face-swap",
  },
  {
    key: "inpaint_faces",
    label: "Inpaint Faces",
    link: "https://docs.astria.ai/docs/features/face-inpainting",
  },
  { key: "is_multiperson", label: "Multiperson" },
  { key: "prompt_expansion", label: "Prompt Expansion" },
  { key: "theme", label: "Theme" },
  { key: "mask_image", label: "Mask" },
  {
    key: "controlnet",
    label: "ControlNet",
    link: "https://docs.astria.ai/docs/use-cases/controlnet",
  },
  { key: "use_lpw", label: "Weighted" },
];

export const PropertiesDisplay: React.FC<PropertiesDisplayProps> = ({
  prompt,
}) => {
  console.log("prompt", { prompt });
  return (
    <>
      {prompt.input_image && (
        <div className="w-fit relative">
            <Paperclip className="w-5 h-4 bg-white p-[1px] rounded-tl absolute bottom-0 right-0 text-gray-800" />
          <img src={prompt.input_image} width={38} className="rounded-md" />
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {displayProperties.map(({ key, label, extraText, link, joiner }) => {
          let displayValue;

          if (Array.isArray(key)) {
            // For combined keys, join their values if both are present
            const [key1, key2] = key;
            const value1 = prompt[key1];
            const value2 = prompt[key2];
            if (value1 && value2) {
              displayValue = `${value1}${joiner || ""}${value2}`;
            }
          } else {
            // For single keys, just get the value
            displayValue = prompt[key];
          }

          if (!displayValue) return null;

          return (
            <span
              key={String(key)}
              className="text-gray-700 text-[12px] font-medium bg-slate-200 px-2 rounded-sm"
            >
              {label}: {displayValue}
              {extraText || ""}
              {link && (
                <a
                  href={link}
                  className="text-blue-500 underline ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Docs
                </a>
              )}
            </span>
          );
        })}
      </div>
    </>
  );
};

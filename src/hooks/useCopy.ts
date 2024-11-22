import { useState } from "react";
import { Prompt } from "@/types";

export const useCopy = () => {
  const [isCopied, setIsCopied] = useState(false);
  const allowedKeys = new Set([
    'controlnet', 'color_grading', 'super_resolution', 'hires_fix', 'inpaint_faces',
    'face_correct', 'face_swap', 'ar', 'denoising_strength', 'controlnet_conditioning_scale',
    'num_images', 'w', 'h' , 'input_image','controlnet_txt2img', 'film_grain', 'backend_version', 'seed', 'steps'
]);

  const handleCopy = (prompt: Prompt) => {
    let text = '';

    // Ensure prompt.text comes first
    if (prompt.text) {
      text += prompt.text;
    }

    // Add other allowed keys
    for (const key of Object.keys(prompt) as (keyof Prompt)[]) {
      if (key !== "text" && allowedKeys.has(key) && prompt[key]) {
        text += ` ${key}=${prompt[key]}`;
      }
    }

    if (text) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return { isCopied, handleCopy };
};
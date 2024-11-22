import { useState } from "react";
import { usePromptFormStore } from "@/store/promptFormStore";
import { useAPrompt } from './useAPrompt';
import { Prompt } from '@/types';

export const usePromptForm = () => {
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);
  const [showImageControls, setShowImageControls] = useState(false);
  const { handleUsePrompt } = useAPrompt();

  const {
    promptText,
    setPromptText,
    isLoading,
    setImage: setStoreImage,
    setUrlImage: setStoreUrlImage,
  } = usePromptFormStore();
  
  const handleImageUpload = (newImage: File | null, newUrlImage: string | null) => {
    setStoreImage(newImage);
    setStoreUrlImage(newUrlImage);
  };

  const toggleImageControls = () => {
    setShowAdvancedControls(false);
    setShowImageControls(!showImageControls);
  };

  const toggleAdvancedControls = () => {
    setShowImageControls(false);
    setShowAdvancedControls(!showAdvancedControls);
  };

  const handlePaste = (event: ClipboardEvent) => {
    console.log('handlePaste');
    //stop propagation to prevent the default paste behavior
    event.preventDefault();
    event.stopPropagation();
    const text = event.clipboardData?.getData('text');

    const allowedKeys = new Set([
      'controlnet', 'color_grading', 'super_resolution', 'hires_fix', 'inpaint_faces',
      'face_correct', 'face_swap', 'ar', 'denoising_strength', 'controlnet_conditioning_scale',
      'num_images', 'w', 'h', 'input_image', 'controlnet_txt2img', 'film_grain', 'backend_version', 'seed', 'steps'
    ]);

    if (text) {
      const promptObj: Partial<Record<keyof Prompt, string | number | boolean>> = {};
      promptObj.text = text;
      text.split(' ').forEach(part => {
        const [key, value] = part.split('=');
        if (allowedKeys.has(key)) {
          const numValue = Number(value);
          if (key === 'super_resolution' || key === 'hires_fix' || key === 'inpaint_faces' || key === 'face_correct' || key === 'face_swap') {
            promptObj[key as keyof Prompt] = Boolean(numValue);
          } else {
            promptObj[key as keyof Prompt] = !isNaN(numValue) ? numValue : value;
          }
        }
      });
      handleUsePrompt(promptObj as unknown as Prompt);
    }
  };


  return {
    showAdvancedControls,
    showImageControls,
    promptText,
    isLoading,
    handlePaste,
    setPromptText,
    handleImageUpload,
    toggleImageControls,
    toggleAdvancedControls,
    setShowAdvancedControls,
  };
};
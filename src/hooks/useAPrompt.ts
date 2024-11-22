import { useState } from "react";
import { Prompt } from "@/types";
import { usePromptFormStore } from "@/store/promptFormStore";

export const useAPrompt = () => {
  const [isPromptUsed, setIsPromptUsed] = useState(false);

  const { setHeight, setWidth, setPromptText, setControlNet, setColorGrading, setSuperResolution, setHiresFix, setInpaintFaces, setFaceCorrect, setFaceSwap, setDenoisingStrength, setConditioningScale, setNumImages, setUrlImage } = usePromptFormStore();

  const handleUsePrompt = async (prompt: Prompt) => {
    setHeight(prompt.h);
    setWidth(prompt.w);
    setPromptText(prompt.text);
    setControlNet(prompt.controlnet);
    setColorGrading(prompt.color_grading);
    setSuperResolution(prompt.super_resolution);
    setHiresFix(prompt.hires_fix);
    setInpaintFaces(prompt.inpaint_faces);
    setFaceCorrect(prompt.face_correct);
    setFaceSwap(prompt.face_swap);
    setDenoisingStrength(prompt.denoising_strength);
    setConditioningScale(prompt.controlnet_conditioning_scale);
    setNumImages(prompt.num_images);
    setUrlImage(prompt.input_image);
    setIsPromptUsed(true);
    setTimeout(() => {
      setIsPromptUsed(false);
    }, 2000);
  };

  return { isPromptUsed, handleUsePrompt };
};

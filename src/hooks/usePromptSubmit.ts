import { usePromptFormStore } from "@/store/promptFormStore";
import { createPrompt } from "@/api/prompts";
import { toast } from "react-toastify";
import { useStore } from "@/store/promptStore";


export const usePromptSubmit = () => {
  const {
    promptText,
    image,
    urlImage,
    controlNet,
    colorGrading,
    controlNetTXT2IMG,
    backendVersion,
    filmGrain,
    superResolution,
    hiresFix,
    inpaintFaces,
    faceCorrect,
    faceSwap,
    denoisingStrength,
    conditioningScale,
    numImages,
    seed,
    steps,
    width,
    height,
    setIsLoading,
    setError,
  } = usePromptFormStore();

  const { refreshUserPrompts } = useStore();

  const extractPromptText = (text: string) => {
    const allowedKeys = new Set([
      'controlnet', 'color_grading', 'super_resolution', 'hires_fix', 'inpaint_faces',
      'face_correct', 'face_swap', 'ar', 'denoising_strength', 'controlnet_conditioning_scale', 'controlnet_txt2img', 'num_images', 'w', 'h', 'input_image', 'film_grain', 'backend_version', 'seed', 'steps'
    ]);
    return text
      .split(' ')
      .filter(part => !allowedKeys.has(part.split('=')[0]))
      .join(' ');
  };

  const handleSubmit = async () => {
    if (!promptText.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      const promptData = {
        text: extractPromptText(promptText),
        tune_id: "1504944",
        input_image: image,
        input_image_url: urlImage,
        control_net: controlNet,
        color_grading: colorGrading,
        film_grain: filmGrain,
        super_resolution: superResolution,
        hires_fix: hiresFix,
        inpaint_faces: inpaintFaces,
        face_correct: faceCorrect,
        face_swap: faceSwap,
        denoising_strength: denoisingStrength,
        conditioning_scale: conditioningScale,
        controlnet_txt2img: controlNetTXT2IMG,
        num_images: numImages,
        w: width,
        h: height,
        backend_version: backendVersion,
        seed: seed,
        steps: steps
      };

      // Append each entry in `promptData` to formData
      Object.entries(promptData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "input_image" && value instanceof File) {
            formData.append(`prompt[${key}]`, value);
          } else {
            formData.append(`prompt[${key}]`, String(value));
          }
        }
      });

      await createPrompt(formData);
      toast.success("Prompt created successfully!");
      refreshUserPrompts();
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data || "Error creating prompt");
      toast.error("Error creating prompt: " + (error.response?.data?.base.join(', ') || "Unknown error"));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit };
};

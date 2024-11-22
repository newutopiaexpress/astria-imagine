import { create } from "zustand";
import { Prompt, PromptsState } from "@/types";
import { fetchGalleryPrompts, fetchUserPrompts, retrievePrompt } from "@/api/prompts";
import { usePromptFormStore } from "./promptFormStore";

export const useStore = create<PromptsState>((set) => ({
  galleryPrompts: [],
  userPrompts: [],
  galleryOffset: 0,
  userOffset: 0,
  limit: 20,

  addGalleryPrompts: (prompts) =>
    set((state) => ({
      galleryPrompts: [...state.galleryPrompts, ...prompts],
      galleryOffset: state.galleryOffset + prompts.length,
    })),

  addUserPrompts: (prompts) =>
    set((state) => {
      if (state.userPrompts.length === 0) {
        state.updatePromptForm(prompts[0]);
      }
      return ({
        userPrompts: [...state.userPrompts, ...prompts],
        userOffset: state.userOffset + prompts.length,
      })
    }),

  resetGalleryPrompts: () =>
    set({
      galleryPrompts: [],
      galleryOffset: 0,
    }),

  resetUserPrompts: () =>
    set({
      userPrompts: [],
      userOffset: 0,
    }),

  refreshGalleryPrompts: async () => {
    const prompts = await fetchGalleryPrompts(0, 20); // Fetch first set
    set({ galleryPrompts: prompts, galleryOffset: prompts.length }); // Update state with new prompts
  },

  refreshUserPrompts: async () => {
    const prompts = await fetchUserPrompts(0, 20); // Fetch first set
    set({ userPrompts: prompts, userOffset: prompts.length }); // Update state with new prompts
  },

  retrieveSinglePrompt: async (tuneId: number, promptId: number) => {
    const prompt = await retrievePrompt(tuneId, promptId);
    return prompt;
  },
  removeSinglePrompt: (promptId: number) => {
    set((state) => {
      const userPrompts = state.userPrompts.filter((p) => p.id !== promptId);
      return { userPrompts };
    });
  },

  updateSinglePrompt: async (tuneId: number, promptId: number) => {
    // Update the prompt in the store
    const prompt = await retrievePrompt(tuneId, promptId);
    set((state) => {
      const userPrompts = state.userPrompts.map((p) => {
        if (p.id === promptId) {
          return prompt;
        }
        return p;
      });

      return { userPrompts };
    });
  },

  updatePromptForm: (prompt: Prompt) => {
    if (prompt) {
      usePromptFormStore.getState().setPromptText(prompt.text);
      usePromptFormStore.getState().setWidth(prompt.w);
      usePromptFormStore.getState().setHeight(prompt.h);
      usePromptFormStore.getState().setUrlImage(prompt.input_image);
      usePromptFormStore.getState().setControlNet(prompt.controlnet);
      usePromptFormStore.getState().setColorGrading(prompt.color_grading);
      usePromptFormStore.getState().setFilmGrain(prompt.film_grain);
      usePromptFormStore.getState().setSuperResolution(prompt.super_resolution);
      usePromptFormStore.getState().setHiresFix(prompt.hires_fix);
      usePromptFormStore.getState().setInpaintFaces(prompt.inpaint_faces);
      usePromptFormStore.getState().setFaceCorrect(prompt.face_correct);
      usePromptFormStore.getState().setFaceSwap(prompt.face_swap);
      usePromptFormStore.getState().setDenoisingStrength(prompt.denoising_strength);
      usePromptFormStore.getState().setConditioningScale(prompt.controlnet_conditioning_scale);
      usePromptFormStore.getState().setNumImages(prompt.num_images);
    }
  }
}));

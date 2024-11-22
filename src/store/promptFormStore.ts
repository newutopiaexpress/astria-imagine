import { create } from 'zustand';
import { PromptFormState } from '@/types';

export const usePromptFormStore = create<PromptFormState>((set) => ({
  // Text and dimensions
  promptText: '',
  setPromptText: (promptText) => set({ promptText }),
  width: 1024,
  setWidth: (width) => set({ width }),
  height: 1024,
  setHeight: (height) => set({ height }),

  // Image state
  image: null,
  setImage: (image) => set({ image }),
  urlImage: null,
  setUrlImage: (urlImage) => set({ urlImage }),

  // Control settings
  controlNet: '',
  setControlNet: (controlNet) => set({ controlNet }),
  colorGrading: '',
  setColorGrading: (colorGrading) => set({ colorGrading }),
  filmGrain: false,
  setFilmGrain: (filmGrain) => set({ filmGrain }),
  controlNetTXT2IMG: false,
  setControlNetTXT2IMG: (controlNetTXT2IMG) => set({ controlNetTXT2IMG }),

  // Image enhancement settings
  superResolution: false,
  setSuperResolution: (superResolution) => set({ superResolution }),
  hiresFix: false,
  setHiresFix: (hiresFix) => set({ hiresFix }),
  inpaintFaces: false,
  setInpaintFaces: (inpaintFaces) => set({ inpaintFaces }),
  faceCorrect: false,
  setFaceCorrect: (faceCorrect) => set({ faceCorrect }),
  faceSwap: false,
  setFaceSwap: (faceSwap) => set({ faceSwap }),

  // Advanced settings
  backendVersion: '0',
  setBackendVersion: (backendVersion) => set({ backendVersion }),
  denoisingStrength: 0.8,
  setDenoisingStrength: (denoisingStrength) => set({ denoisingStrength }),
  conditioningScale: 0.8,
  setConditioningScale: (conditioningScale) => set({ conditioningScale }),
  numImages: 4,
  setNumImages: (numImages) => set({ numImages }),
  steps: null,
  setSteps: (steps) => set({ steps }),
  seed: null,
  setSeed: (seed) => set({ seed }),
  
  // Additional features
  loraTextList: [],
  setLoraTextList: (loraTextList) => set({ loraTextList }),
  
  // Status and error handling
  error: {},
  setError: (error) => set({ error }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

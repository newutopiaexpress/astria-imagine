import { useEffect, useState } from "react";
import { Prompt } from "@/types";

// Custom hook for handling prompt polling
const usePromptPolling = (
    initialPrompt: Prompt,
    retrieveSinglePrompt: (tuneId: number, promptId: number) => Promise<Prompt>,
    updateSinglePrompt: (tuneId: number, promptId: number) => void
  ) => {
    const [retrievedPrompt, setRetrievedPrompt] = useState<Prompt | null>(null);
    
    useEffect(() => {
      let pollingInterval: NodeJS.Timeout | null = null;
  
      const pollPrompt = async () => {
        try {
          const result = await retrieveSinglePrompt(initialPrompt.tune_id, initialPrompt.id);
          setRetrievedPrompt(result);
          
          // If the retrieved prompt has images, stop polling and update
          if (result.images?.length > 0) {
            if (pollingInterval) {
              clearInterval(pollingInterval);
            }
            updateSinglePrompt(initialPrompt.tune_id, initialPrompt.id);
          }
        } catch (error) {
          console.error('Error polling prompt:', error);
        }
      };
  
      // Only start polling if initial prompt has no images
      if (!initialPrompt.images?.length) {
        // Initial check
        pollPrompt();
        // Start polling every 10 seconds
        pollingInterval = setInterval(pollPrompt, 10000);
      }
  
      return () => {
        if (pollingInterval) {
          clearInterval(pollingInterval);
        }
      };
    }, [initialPrompt.id, initialPrompt.tune_id, initialPrompt.images, retrieveSinglePrompt, updateSinglePrompt]);
  
    return retrievedPrompt;
  };
  

export default usePromptPolling;
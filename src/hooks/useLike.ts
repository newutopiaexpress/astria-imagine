import { useState } from "react";
import { likePrompt } from "@/api/prompts";

export const useLike = (initialLiked: boolean) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleLike = async (promptId: number) => {
    if (promptId) {
      const response = await likePrompt(promptId);
      if (response) {
        setIsLiked(!isLiked);
      }
    }
  };

  return { isLiked, handleLike };
};

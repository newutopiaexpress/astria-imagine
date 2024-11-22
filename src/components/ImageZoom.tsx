import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DownloadIcon, CheckIcon, CopyIcon, Heart, Type } from "lucide-react";
import { useCopy } from "@/hooks/useCopy";
import { useLike } from "@/hooks/useLike";
import { useAPrompt } from "@/hooks/useAPrompt";
import { Prompt } from "@/types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ImageZoomProps = {
  src: string;
  alt: string;
  display?: boolean;
  setDisplay?: (display: boolean) => void;
  prompt: Prompt;
  prompts: Prompt[];
};

export const ImageZoom: React.FC<ImageZoomProps> = ({
  src,
  alt,
  display = false,
  setDisplay,
  prompt,
  prompts,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (display) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [display]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleClose = () => {
    if (setDisplay) {
      if (window.innerWidth < 768) {
        navigate(-1);
      } else {
        setDisplay(false);
        setIsLoading(true);
      }
    }
  };

  const { isLiked: initialIsLiked, handleLike } = useLike(prompt?.liked);
  const { isCopied, handleCopy } = useCopy();
  const { isPromptUsed, handleUsePrompt } = useAPrompt();

  // Local state to track like status and like count
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Update the like status and like count in the UI
    setIsLiked((prev) => !prev);
    // Call the hook's handleLike function to handle backend update
    handleLike(prompt.id);
  };

  // Function to handle downloading the prompt image
  const handleDownload = () => {
    if (src) {
      const element = document.createElement("a");
      element.href = src;
      element.download = `${prompt?.id || "image"}.png`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  // reduce prompt to thumbnails
  const promptThumbnails = prompts.map((p) => p.images).flat();

  // find index of current image in promptThumbnails
  const currentImageIndex = promptThumbnails.indexOf(src);

  const settings = {
    className: "center gap-1 h-full w-screen fixed top-0 left-0 z-60 md:hidden",
    centerMode: true,
    slidesToShow: 9,
    initialSlide: currentImageIndex,
    infinite: false,
    speed: 1,
    touchThreshold: 50,
  };

  if (!display) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-zoom-out"
        onClick={handleClose}
      />
      <div className="relative max-w-[100vw] max-h-[100vh] z-[51]">
        <div className="relative flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
          <div className="slider-container pt-0" onClick={handleClose}>
            <Slider
              {...settings}>
              {promptThumbnails.map((image, index) => (
                <>
                  <div className={`h-screen px-[1.5px]`}>
                    <img
                      key={index}
                      src={image}
                      alt={alt}
                      className={`object-contain h-20 w-20 mx-1 rounded-xl cursor-pointer transition-transform duration-300 ${src === image ? "scale-150 " : ""
                        }`}
                    />
                  </div>
                  {/* add dummy divs to center last slide */}
                  {index === promptThumbnails.length - 1 && (
                    <>
                    
                    </>
                  )}
                </>
              ))}
              {/* add dummy divs to center last slide */}
                {promptThumbnails.length - currentImageIndex < 9 &&
                Array.from({ length: Math.max(0, 9 - (promptThumbnails.length - currentImageIndex)) }).map((_, index) => (
                  <div key={index} className={`h-screen px-[1.5px]`}></div>
                ))}
            </Slider>
          </div>

          <img
            src={src}
            alt={alt}
            className={`max-h-[98vh] max-w-[99vw] object-contain rounded-lg transition-opacity duration-300 cursor-zoom-out
              ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImageLoad}
            loading="eager"
            onClick={handleClose}
          />
          <div className="md:hidden fixed bottom-0 w-full p-4 z-60">
            <div className="flex mb-2 justify-between items-center">
              <h2 className="text-lg font-semibold">{prompt?.id}</h2>
              <div className="p-2 flex items-center gap-1">
                <button
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={handleDownload}
                >
                  <DownloadIcon className="text-gray-600 dark:text-white w-4 h-4" />
                </button>
                <button
                  className={`p-2 rounded-full hover:bg-gray-100 ${isPromptUsed ? "text-green-500" : "text-gray-600 dark:text-white"
                    }`}
                  onClick={() => handleUsePrompt(prompt)}
                >
                  {isPromptUsed ? (
                    <CheckIcon className="w-4 h-4 text-green-500" />
                  ) : (
                    <Type className="w-4 h-4" />
                  )}
                </button>
                <button
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => handleCopy(prompt)}
                >
                  {isCopied ? (
                    <>
                      <CheckIcon className="text-green-500 w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <CopyIcon className="text-gray-600 dark:text-white w-4 h-4" />
                    </>
                  )}
                </button>
                <button
                  className={`p-2 rounded-full hover:bg-gray-100 ${isLiked ? "text-red-500" : "text-gray-600 dark:text-white"
                    }`}
                  onClick={toggleLike}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
            <div>
              <p className="text-white bg-opacity-50">
                {prompt.text && prompt?.text.slice(0, 50)}{prompt.text && prompt?.text.length > 50 && "..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageZoom;

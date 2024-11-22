import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PromptImageProps {
  imageUrl: string;
  setDisplay?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromptImage: React.FC<PromptImageProps> = ({ imageUrl, setDisplay }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex-1 relative cursor-zoom-in overflow-hidden pb-12 md:pb-0" 
      onClick={() => setDisplay && setDisplay(true)}
    >
      <div className="h-full p-6 flex justify-center items-center">
        <img
          src={imageUrl}
          alt="prompt image"
          className="object-contain max-h-full max-w-full rounded-lg"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png";
          }}
        />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(-1);
        }}
        className="absolute right-6 top-2 p-2 bg-white rounded-full hover:bg-gray-200"
      >
        <X className="text-black w-4 h-4" />
      </button>
    </div>
  );
};

export default PromptImage;
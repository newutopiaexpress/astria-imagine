import { XMarkIcon } from "@heroicons/react/24/outline";
import { useImageUpload } from "@/hooks/useImageUpload";
import { usePromptFormStore } from "@/store/promptFormStore";
import { useMemo } from "react";

interface ImageUploadProps {
  showControls: boolean;
  onImageUpload: (image: File | null, urlImage: string | null) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ showControls, onImageUpload }) => {
  const {
    uploadError,
    getRootProps,
    getInputProps,
    clearImage,
    isDragActive,
  } = useImageUpload();

  const { image, urlImage } = usePromptFormStore();
  console.log({ image, urlImage });
  const handleClear = () => {
    clearImage();
    onImageUpload(null, null);
  };

  const imageSrc = useMemo(() => {
    if (image) {
      return URL.createObjectURL(image);
    }
    return urlImage;
  }, [image, urlImage]);

  if (!showControls && !image && !urlImage) return null;

  return (
    <div className="flex mx-2 mb-2">
      <div
        {...getRootProps()}
        className={`p-1 rounded-lg cursor-pointer transition-all duration-200 h-20 flex items-center justify-center ${image || urlImage ? "w-fit" : "w-20 bg-gray-200"
          }`}
      >
        <input {...getInputProps()} />
        {image || urlImage ? (
          <div className="relative w-full h-full group">
            <img
              src={imageSrc!}
              alt="Uploaded"
              className="object-cover h-full rounded-md"
            />
            <XMarkIcon onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }} className="h-4 w-4 absolute top-1 right-1 hidden group-hover:block rounded-sm text-black group-hover:bg-gray-300" />
          </div>
        ) : (
          <p className="text-gray-500 text-center text-[12px]">
            {isDragActive ? "Drop image here" : "Select image to use"}
          </p>
        )}
      </div>
      {uploadError && <p className="text-red-600 text-sm mt-2">{uploadError}</p>}
    </div>
  );
};
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { usePromptFormStore } from '@/store/promptFormStore';
import { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

interface UseImageUploadReturn {
    uploadError: string | null;
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
    setImage: (file: File | null) => void;
    handleImagePaste: (event: ClipboardEvent) => void;
    handleUrlUpload: (url: string) => Promise<void>;
    clearImage: () => void;
    isDragActive: boolean;
}

export const useImageUpload = (): UseImageUploadReturn => {
    const { setImage, setUrlImage } = usePromptFormStore();
    const [uploadError, setUploadError] = useState<string | null>(null);

    const onDrop = (acceptedFiles: File[]) => {
        const isValid = acceptedFiles.every(file => file.type.startsWith('image/'));
        if (isValid) {
            setUploadError(null);
            setImage(acceptedFiles[0]);
            setUrlImage(null);
        } else {
            setUploadError('Only image files are accepted.');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false,
    });

    const handleImagePaste = (event: ClipboardEvent) => {
        const items = event.clipboardData?.items;
        if (items) {
            const imageItem = Array.from(items).find(item => item.type.startsWith('image/'));
            if (imageItem) {
                const file = imageItem.getAsFile();
                if (file) {
                    setUploadError(null);
                    setImage(file);
                    setUrlImage(null);
                }
            } else {
                setUploadError('Only image files are accepted from clipboard.');
            }
        }
    };

    const handleUrlUpload = async (url: string) => {
        setImage(null);
        setUrlImage(url);
        setUploadError(null);
    };

    const clearImage = () => {
        setImage(null);
        setUrlImage(null);
    };

    return {
        uploadError,
        handleImagePaste,
        getRootProps,
        getInputProps,
        setImage,
        handleUrlUpload,
        clearImage,
        isDragActive,
    };
};

import React, {useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import { PromptControls } from "./PromptControls";
import { usePromptSubmit } from "@/hooks/usePromptSubmit";
import { usePromptForm } from "@/hooks/usePromptForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdvancedControls } from "./AdvancedControls";

const PromptForm: React.FC = () => {
  const {
    showAdvancedControls,
    showImageControls,
    promptText,
    isLoading,
    handlePaste,
    setPromptText,
    handleImageUpload,
    toggleImageControls,
    toggleAdvancedControls,
    setShowAdvancedControls,
  } = usePromptForm();

  const { handleSubmit } = usePromptSubmit();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isLoading && promptText.trim()) {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [promptText, isLoading, handleSubmit]);

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const target = textareaRef.current;
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    }
  }, [promptText]);

  return (
    <div className="sticky top-0 z-10 w-full bg-gradient-to-b from-[#fafbfc] pb-4 md:pb-6 dark:from-zinc-900  ">
      <div className="px-0 pt-6 md:px-6 max-w-7xl mx-auto">
        <Card className="w-full">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row items-stretch">
              <div className="flex-1">
                <div className="flex items-center h-auto min-h-12 px-2">
                  <PromptControls
                    onImageClick={toggleImageControls}
                    onAdvancedClick={toggleAdvancedControls}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                  />

                  <Textarea
                    ref={textareaRef}
                    placeholder="Write a prompt..."
                    className="resize-none text-wrap flex-1 order-1 py-3"
                    value={promptText}
                    onChange={(e) => {
                      setPromptText(e.target.value)
                    }}
                    rows={1}
                    autoFocus={window.innerWidth > 768}
                  />
                </div>

                <ImageUpload
                  showControls={showImageControls}
                  onImageUpload={handleImageUpload}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {showAdvancedControls && (
          <>
            <div
              className="fixed inset-0 z-[-1] opacity-100"
              onClick={() => setShowAdvancedControls(false)}
            />
            <Card className="w-full mt-1">
              <CardContent className="z-20 p-1">
                <AdvancedControls />
              </CardContent>
            </Card>
          </>
        )}
      </div>
      <ToastContainer position="top-right" theme="light" />
    </div>
  );
};

export default PromptForm;
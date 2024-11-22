// components/MasonryGallery.tsx
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "@/components/LoadingSpinner";
import MasonryLayout from "@/components/MasonryLayout";
import GalleryItem from "@/components/GalleryItem";
import { Prompt } from "@/types";

interface MasonryGalleryProps {
  prompts: Prompt[];
  fetchMoreData: () => Promise<boolean>;
}

const Gallery: React.FC<MasonryGalleryProps> = ({
  prompts,
  fetchMoreData,
}) => {
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const loadMorePrompts = async () => {
    if (isLoading) return; // Prevent multiple fetches
    setIsLoading(true);
    try {
      const hasMoreData = await fetchMoreData();
      setHasMore(hasMoreData);
    } catch (error) {
      console.error("Failed to load more data", error);
      setHasMore(false); // Stop loading on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto overflow-hidden px-1 md:px-4">
      <InfiniteScroll
        dataLength={prompts.length}
        next={loadMorePrompts}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        scrollThreshold={0.8}
        style={{ overflow: "hidden" }}
      >
        <MasonryLayout>
          {prompts.map((prompt, index) => (
            <GalleryItem key={prompt.id} prompt={prompt} index={index} />
          ))}
        </MasonryLayout>
      </InfiniteScroll>
    </div>
  );
};

export default Gallery;


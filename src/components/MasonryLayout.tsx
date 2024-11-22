// components/MasonryLayout.tsx
import Masonry from "react-masonry-css";

interface MasonryLayoutProps {
  children: React.ReactNode;
}

const breakpointColumnsObj = {
  default: 4,
  2560: 5,
  1100: 4,
  700: 3,
  500: 2,
};

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ children }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto -ml-[2px] rounded-t-xl overflow-hidden"
      columnClassName="pl-[2px] bg-clip-padding"
    >
      {children}
    </Masonry>
  );
};

export default MasonryLayout;

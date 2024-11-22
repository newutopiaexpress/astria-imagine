import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BidirectionalSlider } from '@/components/ui/bidirectional-slider';
import { usePromptFormStore } from '@/store/promptFormStore';

interface AspectRatioSliderProps {
  baseSize?: number;
  className?: string;
}

const aspectRatios = [
  { ratio: '1:2', value: -5 },
  { ratio: '9:16', value: -4 },
  { ratio: '4:7', value: -3 },
  { ratio: '3:5', value: -2 },
  { ratio: '17:25', value: -1 },
  { ratio: '1:1', value: 0 },
  { ratio: '6:5', value: 1 },
  { ratio: '4:3', value: 2 },
  { ratio: '3:2', value: 3 },
  { ratio: '16:9', value: 4 },
  { ratio: '2:1', value: 5 },
];

const roundToMultipleOf8 = (num: number) => Math.round(num / 8) * 8;

const AspectRatioSlider: React.FC<AspectRatioSliderProps> = ({
  baseSize = 1024,
  className = '',
}) => {
  const { width, height, setWidth, setHeight } = usePromptFormStore();

  const initialRatio = useMemo(() => {
    if (width && height) {
      const aspectRatio = width / height;
      const closestRatio = aspectRatios.reduce((prev, curr) => {
        const currAspectRatio = Number(curr.ratio.split(':')[0]) / Number(curr.ratio.split(':')[1]);
        return Math.abs(currAspectRatio - aspectRatio) < Math.abs(prev - aspectRatio) ? currAspectRatio : prev;
      }, Infinity);
      return aspectRatios.find(
        (r) => Number(r.ratio.split(':')[0]) / Number(r.ratio.split(':')[1]) === closestRatio
      )?.value || 0;
    }
    return 0;
  }, [width, height]);

  const [sliderValue, setSliderValue] = useState(initialRatio);
  const selectedRatio = aspectRatios.find((r) => r.value === sliderValue)?.ratio || '1:1';

  const dimensions = useMemo(() => {
    const [ratioWidth, ratioHeight] = selectedRatio.split(':').map(Number)
    const aspectRatio = ratioWidth / ratioHeight
    let calculatedWidth = Math.min(baseSize, roundToMultipleOf8(baseSize * aspectRatio))
    let calculatedHeight = Math.min(baseSize, roundToMultipleOf8(baseSize / aspectRatio))

    if (calculatedWidth > baseSize) calculatedWidth = baseSize
    if (calculatedHeight > baseSize) calculatedHeight = baseSize

    return { width: calculatedWidth, height: calculatedHeight }
  }, [selectedRatio, baseSize])

  useEffect(() => {
    if (width && height) {
      const aspectRatio = width / height;
      const closestRatio = aspectRatios.reduce((prev, curr) => {
        const currAspectRatio = Number(curr.ratio.split(':')[0]) / Number(curr.ratio.split(':')[1]);
        return Math.abs(currAspectRatio - aspectRatio) < Math.abs(prev - aspectRatio) ? currAspectRatio : prev;
      }, Infinity);

      const newSliderValue = aspectRatios.find(
        (r) => Number(r.ratio.split(':')[0]) / Number(r.ratio.split(':')[1]) === closestRatio
      )?.value;
      setSliderValue(newSliderValue || initialRatio);
    }
  }, [width, height, initialRatio]);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    const selectedAspect = aspectRatios.find((r) => r.value === value)?.ratio || '1:1';
    const [ratioWidth, ratioHeight] = selectedAspect.split(':').map(Number);
    const aspectRatio = ratioWidth / ratioHeight;

    setWidth(roundToMultipleOf8(ratioHeight > ratioWidth ? Math.round(baseSize * aspectRatio) : baseSize));
    setHeight(roundToMultipleOf8(ratioHeight > ratioWidth ? baseSize : Math.round(baseSize / aspectRatio)));
  };

  const handleReset = () => handleSliderChange(0);

  return (
    <div className={`w-full ${className} p-4 bg-gray-50`}>
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-800 dark:text-white">Aspect Ratio</h2>
        <div className="flex items-center gap-2">
          <div style={{ height: `${baseSize / 25}px`, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
            <div className="border border-gray-300 rounded-md shadow-sm" style={{ width: dimensions.width / 25, height: dimensions.height / 25 }} />
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-sm text-gray-600 hover:text-gray-900 transition dark:text-white">Reset</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 mb-2 bg-gray-200 rounded-full">
        {['Portrait', 'Square', 'Landscape'].map((label, index) => {
          const value = [-4, 0, 4][index];
          return (
            <Button
              key={label}
              variant="ghost"
              size="sm"
              className={`font-bold text-sm ${index === 1 ? 'rounded-none' : index === 0 ? 'rounded-l-full' : 'rounded-r-full'} ${sliderValue === value ? 'bg-orange-300 text-orange-800' : 'text-gray-500'} hover:bg-gray-300`}
              onClick={() => handleSliderChange(value)}
            >
              {label}
            </Button>
          );
        })}
      </div>
      <hr className="my-3 border-gray-200 dark:border-gray-700" />
      <BidirectionalSlider value={sliderValue} max={5} step={1} onValueChange={handleSliderChange} className="mb-4" />
      <div className="flex justify-between text-sm text-gray-600 dark:text-white">
        <span>{`${dimensions.width} × ${dimensions.height}px`}</span>
        <span>{selectedRatio}</span>
      </div>
    </div>
  );
};

export default AspectRatioSlider;

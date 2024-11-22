import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

interface BidirectionalSliderProps {
  value?: number    // New prop to control the slider externally
  defaultValue?: number
  max?: number
  step?: number
  onValueChange?: (value: number) => void
  className?: string
}

const BidirectionalSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  BidirectionalSliderProps
>(({ 
  value: controlledValue, // renamed to avoid conflict
  defaultValue = 0, 
  max = 100, 
  step = 1, 
  onValueChange,
  className 
}, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue)

  // Determine whether we're using controlled or uncontrolled mode
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const handleValueChange = (newValue: number[]) => {
    const singleValue = newValue[0]
    if (!isControlled) {
      setInternalValue(singleValue)
    }
    onValueChange?.(singleValue)
  }

  const activeTrackWidth = `${(Math.abs(currentValue) / max) * 50}%`

  const getTrackColors = () => {
    return currentValue === 0 
      ? 'bg-gray-300 dark:bg-gray-700' 
      : currentValue > 0 
      ? 'bg-gray-700 dark:bg-gray-300' 
      : 'bg-gray-500 dark:bg-gray-500'
  }

  const getThumbColors = () => {
    return currentValue === 0 
      ? 'border-gray-400 hover:border-gray-500 dark:border-gray-500 dark:hover:border-gray-400'
      : currentValue > 0 
      ? 'border-gray-600 hover:border-gray-700 dark:border-gray-300 dark:hover:border-gray-400'
      : 'border-gray-500 hover:border-gray-600 dark:border-gray-500 dark:hover:border-gray-400'
  }

  return (
    <div className="w-full space-y-4">
      <SliderPrimitive.Root
        ref={ref}
        min={-max}
        max={max}
        step={step}
        value={[currentValue]}
        onValueChange={handleValueChange}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
      >
        {/* Background track */}
        <SliderPrimitive.Track className="relative h-2 w-full grow rounded-full bg-gray-200 dark:bg-gray-800">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -ml-px bg-gray-400 dark:bg-gray-600" />
          
          {/* Active track */}
          <SliderPrimitive.Range 
            className={cn(
              "absolute h-full rounded-full !left-1/2 transition-colors",
              getTrackColors(),
            )}
            style={{
              width: activeTrackWidth,
              transform: currentValue > 0 ? 'translateX(0)' : 'translateX(-100%)',
            }}
          />
        </SliderPrimitive.Track>

        {/* Thumb */}
        <SliderPrimitive.Thumb
          className={cn(
            "block h-6 w-6 rounded-full border-2 bg-white shadow-lg ring-offset-white dark:bg-gray-900 dark:ring-offset-gray-900",
            "transition-colors focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400",
            "focus-visible:ring-offset-2 disabled:pointer-events-none",
            "disabled:opacity-50",
            getThumbColors()
          )}
        />
      </SliderPrimitive.Root>
    </div>
  )
})
BidirectionalSlider.displayName = "BidirectionalSlider"

export { BidirectionalSlider }

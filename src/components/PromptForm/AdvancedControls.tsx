import { useState } from "react";
import AspectRatioSlider from "./AspectRatioSlider";
import ControlNetSelector from "./ControlNetSelector";
import { Switch } from "../ui/switch";
import ColorGradingSelector from "./ColorGradingSelector";
import AddLoraText from "./AddLoraText";
import { usePromptFormStore } from '@/store/promptFormStore';
import { ChevronUp, ChevronDown } from "lucide-react";
import { SelectLabel, Select, SelectItem, SelectTrigger, SelectContent, SelectValue, SelectGroup } from '../ui/select';

interface RangeInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: string;
    max?: string;
    step?: string;
    error?: string | string[] | null;
}

const RangeInput = ({ label, value, onChange, min = "0.0", max = "1.0", step = "0.01", error }: RangeInputProps) => (
    <div className="leading-0">
        <div className="flex items-center justify-between gap-1 my-2">
            <label className="text-sm font-[400] text-gray-700 dark:text-gray-200">
                {label}
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="col-span-2 w-3/5 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                style={{
                    WebkitAppearance: 'none',
                    appearance: 'none',
                }}
            />
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
);

interface SwitchInputProps {
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
}

const SwitchInput = ({ label, checked, onCheckedChange, disabled = false, error }: SwitchInputProps & { error?: string }) => (
    <div className="leading-0">
        <div className="flex items-center justify-between">
            <label className="text-sm font-[400] text-gray-700 dark:text-gray-200 gap-1">
                {label}
            </label>
            <Switch className="justify-self-end" checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
);

export const AdvancedControls = () => {
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const { controlNet, setControlNet, colorGrading, setColorGrading, filmGrain, setFilmGrain,
        superResolution, setSuperResolution, hiresFix, setHiresFix, inpaintFaces, setInpaintFaces,
        faceCorrect, setFaceCorrect, faceSwap, setFaceSwap, denoisingStrength, setDenoisingStrength,
        conditioningScale, setConditioningScale, numImages, setNumImages, promptText, setPromptText, error, image, urlImage: imageUrl, controlNetTXT2IMG, setControlNetTXT2IMG, backendVersion, setBackendVersion, steps, setSteps, seed, setSeed
    } = usePromptFormStore();

    return (
        <div className="advanced-controls grid md:grid-rows-2 grid-cols-1 md:grid-cols-2 gap-1 rounded-lg overflow-auto h-[420px] min-h-660:h-[480px] md:scrollbar dark:text-white dark:bg-zinc-900 dark:border-zinc-800">
            <AspectRatioSlider
                baseSize={1024}
                className="rounded-t-lg md:rounded-tr-none md:rounded-tl-lg dark:bg-black dark:border-zinc-800 order-1 md:order-1"
            />

            <div className={`md:relative md:row-span-2 md:overflow-auto md:scrollbar bg-gray-50 dark:bg-black px-4 rounded-bl-lg rounded-br-lg md:rounded-bl-none md:rounded-r-lg order-3 md:order-2`}>
                <div className="flex justify-between items-center mb-4 md:mb-[3px] py-2 md:sticky md:top-0 bg-gray-50 dark:bg-black z-30">
                    <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200 pt-2">Advance Settings</h2>
                </div>
                <div className="md:space-y-[4px] space-y-4">
                    <AddLoraText onSelect={(tune) => {
                        setPromptText(`<lora:${tune.id}:1> ${promptText}`);
                    }} onRemove={(loraText) => {
                        setPromptText(promptText.replace(loraText, ""));
                    }} />
                    <hr className="border-t border-gray-200 dark:border-gray-700 m-0 p-0" />
                    <SwitchInput label="Super Resolution" checked={superResolution} onCheckedChange={setSuperResolution} error={error?.super_resolution?.join(" ")} />
                    <hr className="border-t border-gray-200 dark:border-gray-700 m-0 p-0" />
                    <div className={`col-span-full justify-center flex items-center ${showAdvancedOptions ? 'pt-0' : 'pt-6'}`}>
                        <button onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm">
                            <ChevronDown className={`w-6 h-6 ${showAdvancedOptions ? 'hidden' : 'block'}`} />
                        </button>
                    </div>

                </div>

                {showAdvancedOptions && (
                    <div className="md:space-y-[4px] space-y-4">
                        <SelectGroup className="flex items-center justify-between">
                            <SelectLabel className="text-sm px-0 font-[400] text-gray-700 dark:text-gray-200 text-center">
                                Backend Version
                            </SelectLabel>
                            <Select onValueChange={(value) => setBackendVersion(value)} value={backendVersion}>
                                <SelectTrigger className="w-[37%] text-center border rounded-full h-6 py-0 px-2 text-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                                    <SelectValue placeholder="Select a version" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="0">0 - Stable</SelectItem>
                                        <SelectItem value="1">1 - BETA</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {error?.backend_version && <p className="text-red-500 text-xs ml-2">{error.backend_version.join(" ")}</p>}
                        </SelectGroup>
                        <hr className="border-t border-gray-200 dark:border-gray-700 m-0 p-0" />
                        <SwitchInput label="Inpaint Faces" checked={inpaintFaces} onCheckedChange={setInpaintFaces} disabled={!superResolution} error={error?.inpaint_faces?.join(" ")} />
                        <hr className="border-t border-gray-200 dark:border-gray-700 m-0 p-0" />
                        <SwitchInput label="Hi-Res Fix" checked={hiresFix} onCheckedChange={setHiresFix} disabled={!superResolution} error={error?.hires_fix?.join(" ")} />
                        <hr className="border-t border-gray-200 dark:border-gray-700 m-0 p-0" />
                        <ColorGradingSelector value={colorGrading} onChange={setColorGrading} error={error?.color_grading?.join(" ")} />
                        <hr className="border-t border-gray-200 dark:border-gray-700 m-0 p-0" />
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-[400] text-gray-700 dark:text-gray-200">
                                Number of Images
                            </label>
                            <input
                                type="number"
                                value={numImages}
                                onChange={(e) => setNumImages(parseInt(e.target.value, 10))}
                                className="col-span-2 border rounded-full h-6 py-1 text-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                            />
                            {error?.num_images && <p className="text-red-500 text-xs ml-2">{error.num_images.join(" ")}</p>}
                        </div>
                        <hr className="border-t border-gray-200 dark:border-gray-700 m-0 p-0" />
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-[400] text-gray-700 dark:text-gray-200">
                                Steps
                            </label>
                            <input
                                type="number"
                                placeholder="Range: 10 - 50"
                                value={steps ? steps : ""}
                                onChange={(e) => setSteps(parseInt(e.target.value, 10))}
                                className="col-span-2 border rounded-full h-6 py-1 text-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                            />
                            {error?.steps && <p className="text-red-500 text-xs ml-2">{error.steps.join(" ")}</p>}
                        </div>
                        <hr className="border-t border-gray-200 dark:border-gray-700 m-0 p-0" />
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-[400] text-gray-700 dark:text-gray-200">
                                Seed
                            </label>
                            <input
                                type="number"
                                placeholder="42"
                                value={seed ? seed : ""}
                                onChange={(e) => setSeed(parseInt(e.target.value, 10))}
                                className="col-span-2 border rounded-full h-6 py-1 text-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                            />
                            {error?.seed && <p className="text-red-500 text-xs ml-2">{error.seed.join(" ")}</p>}
                        </div>
                        <hr className="border-t border-gray-200 dark:border-gray-700 m-0 p-0" />
                        <SwitchInput label="Film Grain" checked={filmGrain} onCheckedChange={setFilmGrain} error={error?.film_grain?.join(" ")} />
                        <hr className="border-t border-gray-200 dark:border-gray-700 m-0 p-0" />
                        <SwitchInput label="Face Correct" checked={faceCorrect} onCheckedChange={setFaceCorrect} error={error?.face_correct?.join(" ")} />
                        <hr className="border-t border-gray-200 dark:border-gray-700 m-0 p-0" />
                        <SwitchInput label="Face Swap" checked={faceSwap} onCheckedChange={setFaceSwap} error={error?.face_swap?.join(" ")} />
                        <hr className="border-t border-gray-200 dark:border-gray-700 m-0 p-0" />
                        <div className="col-span-full justify-center flex items-center pt-0">
                            <button onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm">
                                <ChevronUp className={`w-6 h-6 ${showAdvancedOptions ? 'block' : 'hidden'}`} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className={`w-full grid grid-cols-1 p-4 bg-gray-50 dark:bg-black md:rounded-bl-lg md:order-3 order-2 ${!image && !imageUrl ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="flex justify-between items-center mb-7 md:mb-2">
                    <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200">ControlNet/Img2Img</h2>
                </div>
                {(!image && !imageUrl) && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Please upload an image to use these controls</p>
                )}
                <ControlNetSelector error={error?.controlnet?.join(" ")} value={controlNet} onChange={setControlNet} />
                <hr className="border-t border-gray-200 dark:border-gray-700 md:m-0 my-4 p-0" />
                <RangeInput error={error?.denoising_strength?.join(" ") || null} label="Denoising Strength" value={denoisingStrength} onChange={setDenoisingStrength} />
                <hr className="border-t border-gray-200 dark:border-gray-700 md:m-0 my-4 p-0" />
                <RangeInput error={error?.controlnet_conditioning_scale?.join(" ") || null} label="Conditioning Scale" value={conditioningScale} onChange={setConditioningScale} />
                <hr className="border-t border-gray-200 dark:border-gray-700 md:m-0 my-4 p-0" />
                <SwitchInput label="ControlNet Txt2Img" checked={controlNetTXT2IMG} onCheckedChange={setControlNetTXT2IMG} error={error?.controlnet_txt2img?.join(" ")} />
                <hr className="border-t border-gray-200 dark:border-gray-700 md:m-0 my-4 p-0" />
            </div>
        </div>
    );
};

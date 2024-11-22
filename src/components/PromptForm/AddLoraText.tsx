import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search } from 'lucide-react';
import { getTunes } from '@/api/prompts';
import { usePromptFormStore } from '@/store/promptFormStore';

interface Tune {
    id: string;
    title: string;
    orig_images: string[];
}

interface AddLoraTextProps {
    onSelect?: (tune: Tune) => void;
    onRemove?: (loraText: string) => void;
}

const ITEMS_PER_PAGE = 12;

const AddLoraText: React.FC<AddLoraTextProps> = ({
    onSelect,
    onRemove,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tunes, setTunes] = useState<Tune[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const {
        loraTextList,
        setLoraTextList
    } = usePromptFormStore();

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(1);
            setTunes([]);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchTunes = async () => {
        if (loading) return;

        try {
            setLoading(true);
            setError(null);

            const response = await getTunes(
                page,
                ITEMS_PER_PAGE,
                debouncedSearch
            );

            setTunes(prev => page === 1 ? response : [...prev, ...response]);
            setHasMore(response.length > 0 && response.length === ITEMS_PER_PAGE);
        } catch (err) {
            setError('Failed to load tunes. Please try again.');
            console.error('Error fetching tunes:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTunes();
    }, [page, debouncedSearch]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore && !loading) {
            setPage(prev => prev + 1);
        }
    };

    const handleSelect = (tune: Tune) => {
        setLoraTextList([...loraTextList, `<lora:${tune.id}:1>`]);
        onSelect?.(tune);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col gap-0">
            <div className="flex flex-wrap items-center justify-between">
                <label className="text-sm font-[400] text-gray-700 dark:text-gray-200">
                    Add Loras ({loraTextList.length})
                </label>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default" className='rounded-full'>
                            Browse Loras
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-[94%] md:max-w-3xl max-h-[90vh] px-0 pt-0 overflow-auto scrollbar">
                        <DialogHeader className='sticky top-0 z-10 bg-white shadow-sm p-3'>
                            <DialogTitle>Available Loras</DialogTitle>
                            <DialogDescription>
                                Select a lora to add to your prompt.
                            </DialogDescription>

                            <div className="mt-2 relative">
                                <Input
                                    type="search"
                                    placeholder="Search loras..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-1/2 text-gray-800 pl-10"
                                />
                                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            </div>
                        </DialogHeader>

                        <div
                            className="overflow-y-auto mt-1 p-3"
                            onScroll={handleScroll}
                            style={{ height: '100%' }}
                        >
                            {error && (
                                <div className="text-red-500 text-center p-4">
                                    {error}
                                    <Button
                                        variant="outline"
                                        onClick={fetchTunes}
                                        className="ml-2"
                                    >
                                        Retry
                                    </Button>
                                </div>
                            )}

                            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 mt-2">
                                {tunes.map((tune) => (
                                    <Card
                                        key={tune.id}
                                        className="cursor-pointer hover:scale-105 transition-all shadow-none"
                                        onClick={() => handleSelect(tune)}
                                    >
                                        <div className="aspect-square relative overflow-clip">
                                            <img
                                                src={tune.orig_images[0]}
                                                alt={tune.title}
                                                className="object-cover w-full h-full rounded-t-md"
                                                loading="lazy"
                                            />
                                        </div>
                                        <CardHeader className="p-3">
                                            <CardTitle className="text-sm line-clamp-2">
                                                {tune.title}
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>

                            {loading && (
                                <div className="flex justify-center p-4">
                                    <Loader2 className="animate-spin" />
                                </div>
                            )}
                        </div>

                        <DialogFooter className="absolute top-0 right-0">
                            <DialogClose asChild>
                                <Button variant="ghost" className="text-black rounded-full hover:text-red-500">
                                    X
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {loraTextList.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {loraTextList.map((text, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 dark:bg-gray-800 px-3 py-[1px] rounded-full text-sm flex items-center gap-2"
                        >
                            {text}
                            <button
                                onClick={() => {
                                    setLoraTextList(loraTextList.filter((_, i) => i !== index));
                                    onRemove?.(loraTextList[index]);
                                }}
                                className="hover:text-red-500"
                                aria-label="Remove lora"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddLoraText;
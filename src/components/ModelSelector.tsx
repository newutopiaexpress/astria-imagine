import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface ModelSelectorProps {
  model: string;
  setModel: (model: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ model, setModel }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{model}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {['Flux', 'Dream', 'Vivid'].map((modelOption) => (
          <DropdownMenuItem key={modelOption} onClick={() => setModel(modelOption)}>
            {modelOption}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

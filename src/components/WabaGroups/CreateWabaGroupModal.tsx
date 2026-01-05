import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wabaGroupService } from '@/services/wabaGroupService';

export default function CreateWabaGroupModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Using userId from prompt or fallback
  const userId = '27601c68-8df0-454a-8d90-76a3d5b44fb0';

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: wabaGroupService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wabaGroups'] });
      toast.success('WABA Group created successfully');
      setOpen(false);
      setName('');
      setDescription('');
    },
    onError: (error: any) => {
      toast.error(
        'Failed to create group: ' +
          (error.response?.data?.message || 'Unknown error')
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, userId });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" /> Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create WABA Group</DialogTitle>
          <DialogDescription>
            Create a new group to organize your WhatsApp numbers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="name"
                className="text-right"
              >
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sales Team"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="description"
                className="text-right"
              >
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {mutation.isPending ? 'Creating...' : 'Create Group'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

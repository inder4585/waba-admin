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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { wabaNumberService } from '@/services/wabaNumberService';
import { wabaGroupService } from '@/services/wabaGroupService';
import { useSession } from 'next-auth/react';

export default function CreateWabaNumberModal() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    number: '',
    wabaId: '',
    businessId: '',
    accessToken: '',
    description: '',
    rating: 'Low',
    vendor: 'videostori',
    groupId: '',
    groupName: '',
  });

  const userId = session?.user?.id ?? '';

  const queryClient = useQueryClient();

  // Fetch Groups for Selection
  const { data: groupsData } = useQuery({
    queryKey: ['wabaGroups'],
    queryFn: () =>
      wabaGroupService.getAll({
        page: 1,
        limit: 100,
        userId: session?.user?.id ?? '',
      }),
    enabled: open,
  });

  const groups = Array.isArray(groupsData?.data) ? groupsData.data : [];

  const mutation = useMutation({
    mutationFn: wabaNumberService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wabaNumbers'] });
      toast.success('Phone number added successfully');
      setOpen(false);
      setFormData({
        number: '',
        wabaId: '',
        businessId: '',
        accessToken: '',
        description: '',
        rating: 'Low',
        vendor: 'videostori',
        groupId: '',
        groupName: '',
      });
    },
    onError: (error: any) => {
      toast.error(
        'Failed to add number: ' +
          (error.response?.data?.message || 'Unknown error')
      );
    },
  });

  const handleGroupChange = (value: string) => {
    const selectedGroup = groups.find(
      (g: any) => g._id === value || g.id === value
    );
    setFormData((prev) => ({
      ...prev,
      groupId: value,
      groupName: selectedGroup ? selectedGroup.name : '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      userId,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" /> Add Phone Number
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Phone Number</DialogTitle>
          <DialogDescription>
            Register a new phone number to your WhatsApp Business Account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="groupId"
                className="text-right"
              >
                WABA Group
              </Label>
              <div className="col-span-3">
                <Select
                  onValueChange={handleGroupChange}
                  value={formData.groupId}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group: any) => (
                      <SelectItem
                        key={group._id || group.id}
                        value={group._id || group.id}
                      >
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="number"
                className="text-right"
              >
                Number
              </Label>
              <Input
                id="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="+15550000000"
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="wabaId"
                className="text-right"
              >
                WABA ID
              </Label>
              <Input
                id="wabaId"
                value={formData.wabaId}
                onChange={handleChange}
                placeholder="855..."
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="businessId"
                className="text-right"
              >
                Business ID
              </Label>
              <Input
                id="businessId"
                value={formData.businessId}
                onChange={handleChange}
                placeholder="112..."
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="accessToken"
                className="text-right"
              >
                Access Token
              </Label>
              <Input
                id="accessToken"
                value={formData.accessToken}
                onChange={handleChange}
                placeholder="Token"
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
                value={formData.description}
                onChange={handleChange}
                placeholder="Optional"
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
              {mutation.isPending ? 'Adding...' : 'Add Number'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

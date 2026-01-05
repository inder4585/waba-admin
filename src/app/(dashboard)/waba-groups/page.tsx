'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, MoreVertical, Smartphone, Loader2 } from 'lucide-react';
import CreateWabaGroupModal from '@/components/WabaGroups/CreateWabaGroupModal';
import { useQuery } from '@tanstack/react-query';
import { wabaGroupService } from '@/services/wabaGroupService';

export default function WabaGroups() {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: groups = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['wabaGroups'],
    queryFn: wabaGroupService.getAll,
  });
  console.log('groups', groups);
  const filteredGroups = Array.isArray(groups?.data)
    ? groups?.data.filter((group: any) =>
        group.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load WABA groups. Please ensure the backend is running.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            WABA Groups
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your WhatsApp Business Account groups.
          </p>
        </div>
        <CreateWabaGroupModal />
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search groups..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group: any) => (
          <Card
            key={group.id || group._id}
            className="hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold">
                  {group.name}
                </CardTitle>
                <CardDescription>
                  {group.description || 'No description'}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="-mr-2"
              >
                <MoreVertical className="h-4 w-4 text-slate-500" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-slate-500 mt-4">
                <Smartphone className="mr-2 h-4 w-4" />
                {group.phoneNumberCount || 0} Phone Numbers Linked
              </div>
              <div className="flex items-center mt-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800`}
                >
                  Active
                </span>
                <span className="text-xs text-slate-400 ml-auto">
                  {group.createdAt
                    ? new Date(group.createdAt).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                variant="outline"
                className="w-full"
              >
                Manage Group
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredGroups.length === 0 && (
          <div className="col-span-full text-center py-10 text-slate-500">
            No groups found. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );
}

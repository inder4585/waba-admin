'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { MoreVertical, Smartphone, Loader2 } from 'lucide-react';
import CreateWabaGroupModal from '@/components/WabaGroups/CreateWabaGroupModal';
import { useQuery } from '@tanstack/react-query';
import { wabaGroupService } from '@/services/wabaGroupService';
import TableWithPagination from '@/components/ui/TableWithPagination';
import { useSession } from 'next-auth/react';

export default function WabaGroups() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data: session } = useSession();
  const {
    data: groupsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['wabaGroups', currentPage, pageSize],
    queryFn: () =>
      wabaGroupService.getAll({
        page: currentPage + 1,
        limit: pageSize,
        userId: session?.user?.id ?? '',
      }),
  });

  const groups = groupsResponse?.data || [];
  const totalItems = groupsResponse?.meta?.totalItems || 0;
  const totalPages =
    groupsResponse?.meta?.totalPages || Math.ceil(totalItems / pageSize) || 1;

  const paginatedData = groups;

  const columns = [
    {
      accessorKey: 'name',
      header: 'Group Name',
      filter: true,
      filterType: 'input' as const,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }: any) => row.original.description || 'No description',
    },
    {
      accessorKey: 'phoneNumberCount',
      header: 'Phone Numbers',
      cell: ({ row }: any) => (
        <div className="flex items-center">
          <Smartphone className="mr-2 h-4 w-4 text-slate-500" />
          {row.original.phoneNumberCount || 0}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }: any) =>
        row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleDateString()
          : 'N/A',
    },
    {
      id: 'status',
      header: 'Status',
      cell: () => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
          >
            Manage
          </Button>
          <Button
            variant="ghost"
            size="icon"
          >
            <MoreVertical className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
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

      <div className="rounded-md border bg-white shadow-sm">
        <TableWithPagination
          data={paginatedData}
          columns={columns}
          totalPages={totalPages}
          currentPage={currentPage}
          pageSize={pageSize}
          onPaginationChange={(page: number, size?: number) => {
            setCurrentPage(page);
            if (size) setPageSize(size);
          }}
        />
      </div>
    </div>
  );
}

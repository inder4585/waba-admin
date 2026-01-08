'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TableWithPagination from '@/components/ui/TableWithPagination';
import { flowBuilderService } from '@/services/flowBuilderService';
import { wabaGroupService } from '@/services/wabaGroupService';
import { wabaNumberService } from '@/services/wabaNumberService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GitGraph, Loader2, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function FlowBuilderPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filterGroup, setFilterGroup] = useState('ALL');
  const [filterWabaNumber, setFilterWabaNumber] = useState('ALL');

  const { data: groupsResponse } = useQuery({
    queryKey: ['wabaGroups'],
    queryFn: () =>
      wabaGroupService.getAll({
        page: 1,
        limit: 100,
        userId: session?.user?.id ?? '',
      }),
    enabled: !!session?.user?.id,
  });
  const groups = Array.isArray(groupsResponse?.data) ? groupsResponse.data : [];
  console.log('groupsResponse', groups);

  const { data: wabaNumbersResponse } = useQuery({
    queryKey: ['wabaNumbers'],
    queryFn: () =>
      wabaNumberService.getAll({
        page: 1,
        limit: 100,
        userId: session?.user?.id ?? '',
      }),
    enabled: !!session?.user?.id,
  });
  const wabaNumbers = Array.isArray(wabaNumbersResponse?.data)
    ? wabaNumbersResponse.data
    : [];

  const { data: flowsResponse, isLoading } = useQuery({
    queryKey: ['flows', currentPage, pageSize, filterGroup, filterWabaNumber],
    queryFn: () => {
      const params: any = {
        page: currentPage + 1,
        limit: pageSize,
        userId: session?.user?.id,
      };
      if (filterGroup && filterGroup !== 'ALL') params.groupId = filterGroup;
      if (filterWabaNumber && filterWabaNumber !== 'ALL')
        params.wabaNumber = filterWabaNumber;
      return flowBuilderService.getAll(params);
    },
    enabled: !!session?.user?.id,
  });

  const flows = flowsResponse?.data || [];
  const totalItems = flowsResponse?.meta?.totalItems || 0;
  const totalPages =
    flowsResponse?.meta?.totalPages || Math.ceil(totalItems / pageSize) || 1;

  const columns = [
    {
      accessorKey: 'name',
      header: 'Flow Name',
      filter: true,
      filterType: 'input' as const,
    },
    {
      accessorKey: 'wabanumber',
      header: 'WABA Number',
      cell: ({ row }: any) => row.original.wabanumber || 'N/A',
    },
    {
      accessorKey: 'groupName',
      header: 'Group',
      cell: ({ row }: any) => row.original.groupName || 'N/A',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              router.push(
                `/flow-builder/${row.original.id || row.original._id}`
              )
            }
          >
            <GitGraph className="mr-2 h-3 w-3" /> Edit Flow
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
    <div className="space-y-6 h-full p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Flow Builder
          </h1>
          <p className="text-slate-500 mt-2">Manage your automation flows.</p>
        </div>
        <Button onClick={() => router.push('/waba-numbers')}>
          <Plus className="mr-2 h-4 w-4" /> Create New Flow
        </Button>
      </div>

      <Card>
        <CardContent className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="w-[200px]">
            <Select
              value={filterGroup}
              onValueChange={setFilterGroup}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Groups</SelectItem>
                {groups.map((g: any) => (
                  <SelectItem
                    key={g._id || g.id}
                    value={g.id}
                  >
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-[200px]">
            <Select
              value={filterWabaNumber}
              onValueChange={setFilterWabaNumber}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by Number" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Numbers</SelectItem>
                {wabaNumbers.map((n: any) => (
                  <SelectItem
                    key={n._id || n.id}
                    value={n.number}
                  >
                    {n.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border bg-white shadow-sm">
        <TableWithPagination
          data={flows}
          columns={columns as any}
          totalPages={totalPages}
          currentPage={currentPage}
          pageSize={pageSize}
          enableRowSelection
          onPaginationChange={(page, size) => {
            setCurrentPage(page);
            if (size) setPageSize(size);
          }}
        />
      </div>
    </div>
  );
}

'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MoreHorizontal, Loader2, GitGraph } from 'lucide-react';
import { useState, useEffect } from 'react';
import CreateWabaNumberModal from '@/components/WabaNumbers/CreateWabaNumberModal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wabaNumberService } from '@/services/wabaNumberService';
import { flowBuilderService } from '@/services/flowBuilderService';
import { wabaGroupService } from '@/services/wabaGroupService';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import TableWithPagination from '@/components/ui/TableWithPagination';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

export default function WabaNumbers() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filterGroup, setFilterGroup] = useState('');

  const { data: groupsResponse } = useQuery({
    queryKey: ['wabaGroups'],
    queryFn: () =>
      wabaGroupService.getAll({
        page: 1,
        limit: 100,
        userId: session?.user?.id ?? '',
      }),
  });
  const groups = Array.isArray(groupsResponse?.data) ? groupsResponse.data : [];
  const groupOptions = groups.map((g: any) => ({
    value: g.groupName,
    label: g.groupName,
  }));

  const { data: numbersResponse, isLoading: isLoadingNumbers } = useQuery({
    queryKey: ['wabaNumbers', currentPage, pageSize, filterGroup],
    queryFn: () => {
      const params: any = {
        page: currentPage + 1,
        limit: pageSize,
        userId: session?.user?.id ?? '',
      };
      if (filterGroup) params.groupName = filterGroup;
      return wabaNumberService.getAll(params);
    },
  });

  const numbers = numbersResponse?.data || [];
  const totalItems = numbersResponse?.meta?.totalItems || 0;
  const totalPages =
    numbersResponse?.meta?.totalPages || Math.ceil(totalItems / pageSize) || 1;

  const { data: flowsResponse, isLoading: isLoadingFlows } = useQuery({
    queryKey: ['flows', session?.user?.id],
    queryFn: () =>
      flowBuilderService.getAll({
        userId: session?.user?.id,
      }),
    enabled: !!session?.user?.id,
  });

  const flows = flowsResponse?.data || [];

  const createFlowMutation = useMutation({
    mutationFn: flowBuilderService.create,
    onSuccess: (data) => {
      toast.success('New flow created!');
      queryClient.invalidateQueries({ queryKey: ['flows'] });
      console.log('data', data);
      router.push(`/flow-builder/${data.id}`);
    },
    onError: (error: any) => {
      console.log('error.response?', error);
      toast.error(
        'Failed to create flow: ' +
          (error.response?.data?.message || 'Unknown error')
      );
    },
  });

  const handleOpenFlow = async (numberObj: any) => {
    const existingFlow = flows?.find(
      (f: any) => f.wabanumber === numberObj.number
    );

    if (existingFlow) {
      router.push(`/flow-builder/${existingFlow._id || existingFlow.id}`);
      return;
    }

    const { value: flowName } = await Swal.fire({
      title: 'Create New Flow',
      input: 'text',
      inputLabel: 'Flow Title',
      inputPlaceholder: 'e.g. Customer Support Flow',
      showCancelButton: true,
      confirmButtonText: 'Create Flow',
      confirmButtonColor: '#4f46e5',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'Flow title is required';
        }
        if (value.length < 3) {
          return 'Title must be at least 3 characters';
        }
        return null;
      },
    });

    if (!flowName) return;

    const userId = session?.user?.id;
    if (!userId) {
      toast.error('User not authenticated');
      return;
    }

    // 🚀 Create Flow
    createFlowMutation.mutate({
      name: flowName,
      userId,
      wabanumber: numberObj.number,
      groupId: numberObj.groupId,
      description: `Flow for ${numberObj.number}`,
      nodes: [],
      edges: [],
    });
  };

  const paginatedData = numbers;

  const columns = [
    {
      accessorKey: 'number',
      header: 'Phone Number',
      filter: true,
      filterType: 'input' as const,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => {
        const status = row.original.status || 'Connected';
        const isConnected = status === 'Connected';
        return (
          <div className="flex items-center gap-2">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'quality',
      header: 'Quality Rating',
      cell: ({ row }: any) => {
        const quality = row.original.quality || 'High';
        let color = 'bg-green-100 text-green-800';
        if (quality === 'Medium') color = 'bg-yellow-100 text-yellow-800';
        if (quality === 'Low') color = 'bg-red-100 text-red-800';

        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}
          >
            {row.original.rating || quality}
          </span>
        );
      },
    },
    {
      accessorKey: 'groupName',
      header: 'Assigned Group',
      filter: true,
      filterType: 'select' as const,
      filterOptions: groupOptions,
      cell: ({ row }: any) => row.original.groupName || 'Unassigned',
    },
    {
      id: 'flow',
      header: 'Flow',
      cell: ({ row }: any) => {
        const hasFlow = flows?.some(
          (f: any) => f.wabanumber === row.original.number
        );
        return (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleOpenFlow(row.original)}
            className="h-8 text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200"
          >
            <GitGraph className="mr-2 h-3 w-3" />
            {hasFlow ? 'Edit Flow' : 'Create Flow'}
          </Button>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <Button
          variant="ghost"
          size="icon"
        >
          <MoreHorizontal className="h-4 w-4 text-slate-500" />
        </Button>
      ),
    },
  ];

  if (isLoadingNumbers || isLoadingFlows) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            WABA Numbers
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your connected WhatsApp numbers.
          </p>
        </div>
        <CreateWabaNumberModal />
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <TableWithPagination
          data={paginatedData}
          columns={columns as any}
          totalPages={totalPages}
          currentPage={currentPage}
          pageSize={pageSize}
          enableRowSelection
          onPaginationChange={(page, size) => {
            setCurrentPage(page);
            if (size) setPageSize(size);
          }}
          onColumnFilterChange={(filters) => {
            const groupFilter = filters.find((f: any) => f.id === 'groupName');
            if (groupFilter) setFilterGroup(groupFilter.value);
            else setFilterGroup('');
          }}
        />
      </div>
    </div>
  );
}

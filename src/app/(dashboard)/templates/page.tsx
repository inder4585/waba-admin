'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TableWithPagination from '@/components/ui/TableWithPagination';
import { Button } from '@/components/ui/button';
import { templateService } from '@/services/templateService';
import { wabaNumberService } from '@/services/wabaNumberService';
import { WhatsAppTemplate } from '@/types/template';
import { Plus, Eye, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { TemplatePreview } from '@/components/Templates/TemplatePreview';
import { useSession } from 'next-auth/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Templates() {
  const router = useRouter();
  const { data: session } = useSession();
  const [data, setData] = useState<WhatsAppTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [filterWabaNumber, setFilterWabaNumber] = useState('ALL');

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

  const fetchTemplates = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const params: any = {
        page: currentPage + 1,
        limit: pageSize,
        userId: session.user.id,
      };
      if (filterWabaNumber && filterWabaNumber !== 'ALL') {
        params.wabaNumber = filterWabaNumber;
      }

      const response = await templateService.getAll(params);
      if (Array.isArray(response)) {
        setData(response);
        setTotalPages(Math.ceil(response.length / pageSize) || 1);
      } else if (response.data) {
        setData(response.data);
        setTotalPages(response.meta?.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to fetch templates', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [currentPage, pageSize, filterWabaNumber, session?.user?.id]);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Template Name',
      filter: true,
      filterType: 'input' as const,
      cell: ({ row }: any) => {
        return (
          <HoverCard>
            <HoverCardTrigger asChild>
              <span className="cursor-pointer hover:underline underline-offset-4 decoration-indigo-500 decoration-2">
                {row.original.name}
              </span>
            </HoverCardTrigger>
            <HoverCardContent
              className="w-[320px] p-0 border-0 bg-transparent shadow-none"
              side="right"
            >
              <div className="scale-75 origin-top-left bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-[#00a884] p-3 text-white text-sm font-medium">
                  Message Preview
                </div>
                <div className="p-4 bg-[#efeae2]">
                  <TemplatePreview template={row.original} />
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        );
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
      filter: true,
      filterType: 'select' as const,
      filterOptions: [
        { value: 'MARKETING', label: 'Marketing' },
        { value: 'UTILITY', label: 'Utility' },
        { value: 'AUTHENTICATION', label: 'Authentication' },
      ],
    },
    {
      accessorKey: 'language',
      header: 'Language',
      filter: true,
      filterType: 'select' as const,
      filterOptions: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'pt_BR', label: 'Portuguese (BR)' },
      ],
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => {
        const status = row.original.status || 'PENDING';
        let colorClass = 'bg-gray-100 text-gray-800';
        if (status === 'APPROVED') colorClass = 'bg-green-100 text-green-800';
        if (status === 'REJECTED') colorClass = 'bg-red-100 text-red-800';

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: 'wabaNumber',
      header: 'WABA Account',
      cell: ({ row }: any) => row.original.wabanumber || 'N/A',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/templates/${row.original.id}`)}
          >
            <Eye className="mr-2 h-3 w-3" /> View
          </Button>
        </div>
      ),
    },
  ];

  if (loading && !data.length) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Message Templates
          </h1>
          <p className="text-muted-foreground">
            Manage your WhatsApp message templates.
          </p>
        </div>
        <Button onClick={() => router.push('/templates/create')}>
          <Plus className="mr-2 h-4 w-4" /> Create Template
        </Button>
      </div>

      <div className="w-[200px] mb-4">
        <Select
          value={filterWabaNumber}
          onValueChange={setFilterWabaNumber}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Accounts</SelectItem>
            {wabaNumbers.map((num: any) => (
              <SelectItem
                key={num.id || num._id}
                value={num.number}
              >
                {num.number} ({num.groupName || 'No Group'})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <TableWithPagination
        data={data}
        columns={columns as any}
        totalPages={totalPages}
        currentPage={currentPage}
        pageSize={pageSize}
        onPaginationChange={(page, size) => {
          setCurrentPage(page);
          if (size) setPageSize(size);
        }}
        enableRowSelection={true}
      />
    </div>
  );
}

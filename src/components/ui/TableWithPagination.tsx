'use client';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  RowSelectionState,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash2,
  Filter,
  X,
} from 'lucide-react';

interface FilterOption {
  value: string | boolean | null;
  label: string;
}

interface ColumnFilter {
  filter: boolean;
  filterType: 'select' | 'input';
  filterOptions?: FilterOption[];
  filterPlaceholder?: string;
}

interface ExtendedColumnDef<T> extends ColumnDef<T> {
  filter?: boolean;
  filterType?: 'select' | 'input';
  filterOptions?: FilterOption[];
  filterPlaceholder?: string;
}

interface TableProps<T> {
  data: T[];
  columns: ExtendedColumnDef<T>[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  onPaginationChange: (newPage: number, newPageSize?: number) => void;
  totalRows?: number;
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selectedRowIds: string[]) => void;
  onDeleteSelected?: (selectedRowIds: string[]) => void;
  onColumnFilterChange?: (filters: Record<string, any>) => void;
  initialColumnFilters?: Record<string, any>;
}

function TableWithPagination<T>({
  data,
  columns,
  totalPages,
  currentPage,
  pageSize,
  onPaginationChange,
  totalRows = data?.length,
  enableRowSelection = false,
  onRowSelectionChange,
  onDeleteSelected,
  onColumnFilterChange,
  initialColumnFilters = {},
}: TableProps<T>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] =
    useState<Record<string, any>>(initialColumnFilters);
  const [showFilters, setShowFilters] = useState(false);

  const finalColumns = enableRowSelection
    ? [
        {
          id: 'select',
          header: ({ table }) => (
            <input
              type="checkbox"
              checked={table.getIsAllPageRowsSelected()}
              onChange={table.getToggleAllPageRowsSelectedHandler()}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          ),
          cell: ({ row }) => (
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          ),
          size: 50,
        },
        ...columns,
      ]
    : columns;

  const table = useReactTable({
    data,
    columns: finalColumns,
    onRowSelectionChange: setRowSelection,
    enableRowSelection,
    state: {
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  useEffect(() => {
    if (enableRowSelection && onRowSelectionChange) {
      const selectedIds = table.getSelectedRowModel().rows.map((row) => row.id);
      onRowSelectionChange(selectedIds);
    }
  }, [rowSelection, enableRowSelection, onRowSelectionChange, table]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages && newPage !== currentPage) {
      onPaginationChange(newPage, pageSize);
    }
  };

  const handlePageSizeChange = (newPageSize: string) => {
    const size = Number(newPageSize);
    if (!isNaN(size) && size > 0) {
      onPaginationChange(0, size);
    }
  };

  const handleDeleteSelected = () => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => (row.original as any).id);

    if (onDeleteSelected && selectedIds.length > 0) {
      onDeleteSelected(selectedIds);
      setRowSelection({});
    }
  };

  const handleColumnFilterChange = (columnKey: string, value: any) => {
    const newFilters = { ...columnFilters };

    if (value === null || value === undefined || value === '') {
      delete newFilters[columnKey];
    } else {
      newFilters[columnKey] = value;
    }

    setColumnFilters(newFilters);

    if (onColumnFilterChange) {
      onColumnFilterChange(newFilters);
    }
  };

  const clearAllColumnFilters = () => {
    setColumnFilters({});
    if (onColumnFilterChange) {
      onColumnFilterChange({});
    }
  };

  const getActiveFiltersCount = () => {
    return Object.keys(columnFilters).length;
  };

  const getFilterableColumns = () => {
    return columns.filter((col) => col.filter === true);
  };

  const renderColumnFilter = (column: ExtendedColumnDef<T>) => {
    const columnKey = (column.accessorKey as string) || column.id || '';
    const currentValue = columnFilters[columnKey];

    if (column.filterType === 'select' && column.filterOptions) {
      return (
        <Select
          value={currentValue?.toString() ?? ''}
          onValueChange={(value) => {
            const parsedValue =
              value === 'all'
                ? null
                : value === 'true'
                ? true
                : value === 'false'
                ? false
                : value;
            handleColumnFilterChange(columnKey, parsedValue);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={column.filterPlaceholder || 'Select...'}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {column.filterOptions.map((option, index) => (
              <SelectItem
                key={index}
                value={option.value?.toString() ?? ''}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (column.filterType === 'input') {
      return (
        <Input
          type="text"
          placeholder={column.filterPlaceholder || ` ${column.header}...`}
          value={currentValue || ''}
          onChange={(e) => handleColumnFilterChange(columnKey, e.target.value)}
          className="w-full"
        />
      );
    }

    return null;
  };

  const hasFilterableColumns = getFilterableColumns().length > 0;

  return (
    <div className="space-y-4">
      {/* {hasFilterableColumns && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Column Filters
              {getActiveFiltersCount() > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </Button>
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllColumnFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            )}
          </div>

          {showFilters && (
            <div className="bg-muted/50 p-4 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getFilterableColumns().map((column) => {
                  const columnKey =
                    (column.accessorKey as string) || column.id || '';
                  return (
                    <div
                      key={columnKey}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-foreground">
                        {column.header as string}
                      </label>
                      {renderColumnFilter(column)}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(columnFilters).map(([columnKey, value]) => {
                const column = columns.find(
                  (col) => ((col.accessorKey as string) || col.id) === columnKey
                );

                const displayValue =
                  column?.filterType === 'select' && column.filterOptions
                    ? column.filterOptions.find((opt) => opt.value === value)
                        ?.label || value
                    : value;

                return (
                  <div
                    key={columnKey}
                    className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    <span>
                      {column?.header as string}: {displayValue}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleColumnFilterChange(columnKey, null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )} */}

      {enableRowSelection && (
        <div className="flex items-center justify-between py-2 px-4">
          {table.getSelectedRowModel().rows.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRowSelection({})}
              >
                Clear Selection
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteSelected}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete ({table.getSelectedRowModel().rows.length})
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="w-full overflow-x-auto  rounded-lg border border-table-border bg-card shadow-sm overflow-auto">
        <table className="w-full">
          <thead className="bg-table-header border-b border-table-border">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-sm font-semibold text-foreground tracking-wider hidden sm:table-cell"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-table-border">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="bg-table-row hover:bg-table-row-hover transition-colors duration-150 ease-in-out"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-foreground"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4 px-2 py-2">
        <div className="text-sm text-muted-foreground"></div>

        <div className="flex flex-col sm:flex-row  items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Rows per page:
            </span>
            <Select
              value={pageSize.toString()}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="w-[70px] sm:w-auto max-w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 50, 100].map((size) => (
                  <SelectItem
                    key={size}
                    value={size.toString()}
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(0)}
              disabled={currentPage === 0}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex flex-col sm:flex-row  items-center gap-1 mx-2">
              <span className="text-sm text-muted-foreground">Page</span>
              <span className="text-sm font-medium">
                {currentPage + 1} of {totalPages === 0 ? 1 : totalPages}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage + 1 >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(totalPages - 1)}
              disabled={currentPage + 1 >= totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableWithPagination;

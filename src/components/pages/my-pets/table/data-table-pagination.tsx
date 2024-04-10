/* eslint-disable react/jsx-no-undef */
import { type Table } from '@tanstack/react-table';

import { Text } from '@/components/framework/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
  return (
    <>
      {/* Pagination */}
      <div className='flex items-center justify-between space-x-2 py-4'>
        <div className='flex items-center gap-4'>
          <span>
            <Text as='span'>
              Page of{' '}
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </strong>
            </Text>
          </span>
          <span className='flex items-center gap-2'>
            Go to Page{' '}
            <Input
              className='w-16 text-center'
              type='number'
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
          </span>
          <span className='flex items-center gap-2'>
            Rows Per Page{' '}
            <Select onValueChange={(val) => table.setPageSize(Number(val))}>
              <SelectTrigger className='w-[60px]'>
                <SelectValue placeholder='10' />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((item) => (
                  <SelectItem key={item} value={item.toString()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </span>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First Page
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Last Page
          </Button>
        </div>
      </div>
    </>
  );
}

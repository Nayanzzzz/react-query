'use client';

import { Button } from "@/components/ui/button"; // Assuming you're using shadcn/ui
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TablePagination({ table }) {
  // Calculate total pages
  const totalPages = table.getPageCount();
  // Get current page (0-indexed)
  const currentPage = table.getState().pagination.pageIndex;
  
  // Create array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(0);
    
    // Current page and surrounding pages
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 2); i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }
    
    // Always show last page if we have more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages - 1);
    }
    
    // Sort and return unique page numbers
    return [...new Set(pageNumbers)].sort((a, b) => a - b);
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {/* Numbered pages */}
      {pageNumbers.map((pageNum, idx) => {
        // Add ellipsis if there's a gap between page numbers
        const showEllipsisBefore = idx > 0 && pageNum > pageNumbers[idx - 1] + 1;
        
        return (
          <div key={pageNum} className="flex items-center">
            {showEllipsisBefore && (
              <span className="px-2">...</span>
            )}
            
            <Button
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => table.setPageIndex(pageNum)}
              className="min-w-[36px]"
            >
              {pageNum + 1}
            </Button>
          </div>
        );
      })}
      
      {/* Next button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
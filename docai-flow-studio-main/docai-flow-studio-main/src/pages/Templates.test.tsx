import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip'; // Assuming this is the correct path
import Templates from './Templates';

// Create a new QueryClient instance for tests
const queryClient = new QueryClient();

describe('Templates Page', () => {
  it('renders the main heading "Explore Our Templates"', () => {
    render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <TooltipProvider>
              <Templates />
            </TooltipProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>
    );

    // Check if the main heading is present
    // Using a regex to make the search case-insensitive and more flexible
    const heading = screen.getByRole('heading', { name: /Explore Our Templates/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders search input and category filter', () => {
    render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <TooltipProvider>
              <Templates />
            </TooltipProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>
    );

    expect(screen.getByPlaceholderText(/Search templates by name, description, or tag.../i)).toBeInTheDocument();
    expect(screen.getByText(/All Categories/i)).toBeInTheDocument(); // Initial value in Select
  });

  // TODO: Add more tests:
  // - Test filtering by search term
  // - Test filtering by category
  // - Test sorting (once implemented)
  // - Test rendering of TemplateCard components when templates are available
  // - Test rendering of "No templates found" message
});

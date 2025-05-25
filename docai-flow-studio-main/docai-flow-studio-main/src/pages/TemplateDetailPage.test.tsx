import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip'; // Adjust path if necessary
import TemplateDetailPage from './TemplateDetailPage'; // Adjust path as necessary
import { mockTemplates } from '@/data/mockTemplates'; // Adjust path
import { toast } from '@/components/ui/use-toast'; // Adjust path

// Create a new QueryClient instance for tests
const queryClient = new QueryClient();

// Default mock for react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ templateId: 'resume-001' }), // Default mock for a valid templateId
    Link: ({ children, to }: { children: React.ReactNode, to: string }) => <a href={to}>{children}</a>,
  };
});

// Mock mockTemplates
vi.mock('@/data/mockTemplates', () => ({
  mockTemplates: [
    {
      id: 'resume-001',
      name: 'Test Resume Template',
      description: 'A test resume template.',
      category: 'Resume',
      previewImage: 'https://via.placeholder.com/300x200?text=Test+Resume',
      creatorId: 'user123',
      creatorName: 'Test Creator',
      averageRating: 4.5,
      numberOfRatings: 100,
      downloads: 500,
      tags: ['test', 'resume'],
    },
    // Add more mock templates if needed for different scenarios
  ],
}));

// Mock use-toast
vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

describe('TemplateDetailPage', () => {
  const testTemplate = mockTemplates[0];

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders template details when a valid templateId is provided', () => {
      // useParams is mocked to 'resume-001' by default, which is in mockTemplates
      render(
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <TemplateDetailPage />
          </TooltipProvider>
        </QueryClientProvider>
      );
      expect(screen.getByText(mockTemplates[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockTemplates[0].description)).toBeInTheDocument();
      // Add more assertions for other details if necessary
      expect(screen.getByText(`Created by ${mockTemplates[0].creatorName}`)).toBeInTheDocument();
      expect(screen.getByText(`${mockTemplates[0].downloads.toLocaleString()} downloads`)).toBeInTheDocument();
    });

    it('renders "Template Not Found" when an invalid templateId is provided', async () => {
      // Override useParams mock for this specific test
      vi.doMock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom');
        return {
          ...actual,
          useParams: () => ({ templateId: 'nonexistent-id' }), // Invalid ID
          Link: ({ children, to }: { children: React.ReactNode, to: string }) => <a href={to}>{children}</a>,
        };
      });

      // Need to re-import the component to use the new mock
      const TemplateDetailPageWithInvalidId = (await import('./TemplateDetailPage')).default;

      render(
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <TemplateDetailPageWithInvalidId />
          </TooltipProvider>
        </QueryClientProvider>
      );
      expect(screen.getByText(/Template Not Found/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Back to Templates/i })).toBeInTheDocument();
      
      // Reset mocks to default for other tests
      vi.doUnmock('react-router-dom');
      vi.mock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom');
        return {
          ...actual,
          useParams: () => ({ templateId: 'resume-001' }),
          Link: ({ children, to }: { children: React.ReactNode, to: string }) => <a href={to}>{children}</a>,
        };
      });
    });
  });

  describe('Interactive Star Rating', () => {
    it('should render 5 interactive stars', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <TemplateDetailPage />
          </TooltipProvider>
        </QueryClientProvider>
      );
      const stars = screen.getAllByLabelText(/Rate \d star(s)?/);
      expect(stars.length).toBe(5);
    });

    it('should update currentRating and star appearance on click', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <TemplateDetailPage />
          </TooltipProvider>
        </QueryClientProvider>
      );
      const stars = screen.getAllByLabelText(/Rate \d star(s)?/);
      
      // Click 4th star (rate 4 stars)
      fireEvent.click(stars[3]);

      // Check if the first 4 stars have the 'fill-yellow-400' or 'fill-yellow-500' class (selected)
      // and the 5th star does not.
      // This depends on exact class names used for styling filled/empty state.
      // We'll check for a class that indicates it's filled.
      // Vitest/JSDOM doesn't compute styles fully, so we check classes.
      expect(stars[0].classList.contains('fill-yellow-400') || stars[0].classList.contains('fill-yellow-500')).toBe(true);
      expect(stars[1].classList.contains('fill-yellow-400') || stars[1].classList.contains('fill-yellow-500')).toBe(true);
      expect(stars[2].classList.contains('fill-yellow-400') || stars[2].classList.contains('fill-yellow-500')).toBe(true);
      expect(stars[3].classList.contains('fill-yellow-400') || stars[3].classList.contains('fill-yellow-500')).toBe(true);
      expect(stars[4].classList.contains('text-gray-300')).toBe(true); // Assuming text-gray-300 is for empty

      // The internal currentRating state is not directly testable from outside without context/props drilling
      // or exposing it. However, the visual change and subsequent submit behavior will confirm it.
    });

    it('should change star appearance on hover', () => {
        render(
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <TemplateDetailPage />
            </TooltipProvider>
          </QueryClientProvider>
        );
        const stars = screen.getAllByLabelText(/Rate \d star(s)?/);
        
        // Hover over 3rd star
        fireEvent.mouseEnter(stars[2]);
        expect(stars[0].classList.contains('fill-yellow-400')).toBe(true);
        expect(stars[1].classList.contains('fill-yellow-400')).toBe(true);
        expect(stars[2].classList.contains('fill-yellow-400')).toBe(true);
        expect(stars[3].classList.contains('text-gray-300')).toBe(true);
        expect(stars[4].classList.contains('text-gray-300')).toBe(true);

        fireEvent.mouseLeave(stars[2]);
         // Should revert to currentRating (0 if none clicked, or previously clicked rating)
        expect(stars[2].classList.contains('text-gray-300')).toBe(true); // Assuming no prior click
    });
  });

  describe('handleSubmitReview Logic', () => {
    it('should call toast with error if rating is missing', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <TemplateDetailPage />
          </TooltipProvider>
        </QueryClientProvider>
      );
      const reviewTextarea = screen.getByPlaceholderText('Share your thoughts on this template...');
      fireEvent.change(reviewTextarea, { target: { value: 'This is a great template!' } });
      
      const submitButton = screen.getByRole('button', { name: 'Submit Review' });
      fireEvent.click(submitButton);
      
      expect(toast).toHaveBeenCalledWith({
        title: "Missing Rating",
        description: "Please select a star rating.",
        variant: "destructive",
      });
    });

    it('should call toast with error if review text is missing', () => {
      render(<TemplateDetailPage />);
      const stars = screen.getAllByLabelText(/Rate \d star(s)?/);
      fireEvent.click(stars[3]); // Rate 4 stars
      
      const submitButton = screen.getByRole('button', { name: 'Submit Review' });
      fireEvent.click(submitButton);
      
      expect(toast).toHaveBeenCalledWith({
        title: "Missing Review Text",
        description: "Please write a review.",
        variant: "destructive",
      });
    });

    it('should call toast with success and update state on successful submission', () => {
      render(<TemplateDetailPage />);
      const stars = screen.getAllByLabelText(/Rate \d star(s)?/);
      fireEvent.click(stars[4]); // Rate 5 stars
      
      const reviewTextarea = screen.getByPlaceholderText('Share your thoughts on this template...');
      fireEvent.change(reviewTextarea, { target: { value: 'Absolutely fantastic!' } });
      
      const submitButton = screen.getByRole('button', { name: 'Submit Review' });
      fireEvent.click(submitButton);
      
      expect(toast).toHaveBeenCalledWith({
        title: "Review Submitted!",
        description: "Thank you for your review!",
      });
      
      // Check if button text changes or becomes disabled
      expect(screen.getByRole('button', { name: 'Review Submitted!' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Review Submitted!' })).toBeDisabled();
      expect(reviewTextarea).toBeDisabled(); // Textarea should also be disabled
    });

     it('should reset submittedReview state if rating is changed after submission', () => {
      render(<TemplateDetailPage />);
      const stars = screen.getAllByLabelText(/Rate \d star(s)?/);
      fireEvent.click(stars[4]); // Rate 5 stars
      
      const reviewTextarea = screen.getByPlaceholderText('Share your thoughts on this template...');
      fireEvent.change(reviewTextarea, { target: { value: 'Absolutely fantastic!' } });
      
      const submitButton = screen.getByRole('button', { name: 'Submit Review' });
      fireEvent.click(submitButton); // First submission

      expect(screen.getByRole('button', { name: 'Review Submitted!' })).toBeInTheDocument();

      // User changes rating
      fireEvent.click(stars[2]); // Click 3rd star (rate 3 stars)

      // Button should revert to "Submit Review" and be enabled (if text is still there)
      const updatedSubmitButton = screen.getByRole('button', { name: 'Submit Review' });
      expect(updatedSubmitButton).toBeInTheDocument();
      expect(updatedSubmitButton).not.toBeDisabled(); // Assuming reviewText is still populated
      expect(reviewTextarea).not.toBeDisabled();
    });
  });
});

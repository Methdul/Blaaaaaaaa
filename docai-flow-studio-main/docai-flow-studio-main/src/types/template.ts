export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'Resume' | 'Invoice' | 'Letter' | 'Proposal' | 'Contract';
  previewImage?: string; // URL or path to a placeholder image
  creatorId: string; // Mock creator ID
  creatorName?: string; // Optional: Mock creator name
  averageRating: number; // Average rating out of 5
  numberOfRatings: number;
  downloads: number;
  tags?: string[]; // Optional: for search/filtering
}

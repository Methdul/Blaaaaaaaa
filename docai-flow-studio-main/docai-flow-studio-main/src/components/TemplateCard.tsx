import React from 'react';
import { Template } from '@/types/template';
import { Link } from 'react-router-dom';
import { Star, StarHalf, Download, Tag } from 'lucide-react'; // Using Tag for category
import { Badge } from '@/components/ui/badge'; // For category badge

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.4 && rating % 1 < 0.9; // Adjusted threshold for half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />);
    }
    if (halfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 text-yellow-400 fill-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />); // Empty star (outline only)
    }
    return stars;
  };

  return (
    <Link 
      to={`/templates/${template.id}`} 
      className="block group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-border hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      <div className="bg-card text-card-foreground h-full flex flex-col">
        <div className="relative">
          <img 
            src={template.previewImage || 'https://via.placeholder.com/400x250?text=No+Preview'} 
            alt={`Preview of ${template.name}`} 
            className="w-full aspect-[16/10] object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <Badge 
            variant="default" 
            className="absolute top-2 right-2 bg-primary/80 text-primary-foreground backdrop-blur-sm"
          >
            {template.category}
          </Badge>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors truncate" title={template.name}>
            {template.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-2 h-10 line-clamp-2" title={template.description}>
            {template.description}
          </p>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-1">
              {renderStars(template.averageRating)}
            </div>
            <span className="text-xs text-muted-foreground">
              ({template.numberOfRatings})
            </span>
          </div>
          
          <div className="mt-auto pt-2 border-t border-border/50 flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center">
              <Download size={14} className="mr-1.5" />
              <span>{template.downloads.toLocaleString()} downloads</span>
            </div>
            {template.creatorName && (
              <span className="truncate" title={`By ${template.creatorName}`}>
                By {template.creatorName}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TemplateCard;

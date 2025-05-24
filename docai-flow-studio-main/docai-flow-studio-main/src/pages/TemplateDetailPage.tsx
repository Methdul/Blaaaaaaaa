import React, { useState } from 'react'; // Import useState
import { useParams, Link } from 'react-router-dom';
import { mockTemplates } from '@/data/mockTemplates';
import { Template } from '@/types/template';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, StarHalf, Download, Tag, UserCircle, ArrowLeft, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const TemplateDetailPage: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  // Initialize template data in state to make it mutable
  const [displayedTemplate, setDisplayedTemplate] = useState<Template | undefined>(
    () => mockTemplates.find(t => t.id === templateId)
  );

  // State for rating submission
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submittedRating, setSubmittedRating] = useState<number | null>(null);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.4 && rating % 1 < 0.9;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-yellow-400" />);
    }
    if (halfStar) {
      stars.push(<StarHalf key="half" className="w-5 h-5 text-yellow-400 fill-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-yellow-400" />);
    }
    return stars;
  };

  const handleDownload = () => {
    if (displayedTemplate) {
      const updatedTemplate = {
        ...displayedTemplate,
        downloads: displayedTemplate.downloads + 1,
      };
      setDisplayedTemplate(updatedTemplate); // Update local state

      console.log(`Downloading template: ${updatedTemplate.name} (ID: ${updatedTemplate.id})`);
      toast({
        title: "Download Started!",
        description: `${updatedTemplate.name} is now downloading. Total downloads: ${updatedTemplate.downloads.toLocaleString()}.`,
      });
    }
  };

  const handleRatingClick = (ratingValue: number) => {
    setCurrentRating(ratingValue);
    setSubmittedRating(null); // Reset submitted message if user changes rating
  };

  const handleSubmitRating = () => {
    if (currentRating > 0 && displayedTemplate) {
      console.log(`Submitting rating for template ${displayedTemplate.id}: ${currentRating} stars`);
      toast({
        title: "Rating Submitted!",
        description: `Thank you for submitting your rating of ${currentRating} stars!`,
      });
      setSubmittedRating(currentRating);
      // To prevent immediate re-submission, you might want to keep currentRating
      // or clear it and disable the button, e.g., setCurrentRating(0);
    }
  };

  if (!displayedTemplate) { // Check displayedTemplate instead of template
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Template Not Found</h1>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn't find the template you're looking for. It might have been moved or deleted.
        </p>
        <Button asChild>
          <Link to="/templates">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/templates">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden shadow-xl border-border">
          <div className="grid md:grid-cols-2 gap-0"> {/* gap-0 to make image and content flush */}
            {/* Left Column: Preview Image */}
            <div className="bg-muted/30">
              <img 
                src={displayedTemplate.previewImage || 'https://via.placeholder.com/800x600?text=No+Preview'} 
                alt={`Preview of ${displayedTemplate.name}`} 
                className="w-full h-auto md:h-full object-cover aspect-[4/3] md:aspect-auto"
              />
            </div>

            {/* Right Column: Details */}
            <div className="p-6 sm:p-8 flex flex-col">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-3xl lg:text-4xl font-bold text-foreground mb-2 tracking-tight">{displayedTemplate.name}</CardTitle>
                {displayedTemplate.creatorName && (
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <UserCircle size={16} className="mr-1.5" />
                    <span>Created by {displayedTemplate.creatorName}</span>
                  </div>
                )}
                <Badge variant="secondary" className="w-fit text-sm py-1 px-3">{displayedTemplate.category}</Badge>
              </CardHeader>

              <CardContent className="p-0 flex-grow space-y-4">
                <p className="text-foreground leading-relaxed">{displayedTemplate.description}</p>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(displayedTemplate.averageRating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({displayedTemplate.averageRating.toFixed(1)} from {displayedTemplate.numberOfRatings} ratings)
                  </span>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Download size={16} className="mr-1.5" />
                  <span>{displayedTemplate.downloads.toLocaleString()} downloads</span>
                </div>

                {displayedTemplate.tags && displayedTemplate.tags.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {displayedTemplate.tags.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              
              {/* Rating Submission Section */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-md font-semibold text-foreground mb-3">Rate this template</h4>
                <div className="flex items-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <Star
                      key={starValue}
                      className={`w-7 h-7 cursor-pointer transition-colors duration-150 ease-in-out
                        ${ (hoverRating || currentRating) >= starValue 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300 hover:text-yellow-300'
                        }
                        ${ currentRating >= starValue && !hoverRating && 'text-yellow-500 fill-yellow-500' }
                      `}
                      onClick={() => handleRatingClick(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
                    />
                  ))}
                </div>
                <Button 
                  size="default" 
                  className="w-full" 
                  onClick={handleSubmitRating}
                  disabled={currentRating === 0 || submittedRating === currentRating} // Disable if no rating or if current rating already submitted
                >
                  {submittedRating === currentRating && currentRating > 0 ? 'Rating Submitted!' : 'Submit Rating'}
                </Button>
                {submittedRating && submittedRating === currentRating && (
                  <p className="text-sm text-green-600 mt-2 text-center">
                    Thank you for your rating of {submittedRating} stars!
                  </p>
                )}
              </div>

              <div className="mt-auto pt-6"> {/* Pushes download button to bottom */}
                <Button size="lg" className="w-full text-lg py-3 bg-primary hover:bg-primary/90" onClick={handleDownload}>
                  <Download className="mr-2 h-5 w-5" /> Download Template
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TemplateDetailPage;

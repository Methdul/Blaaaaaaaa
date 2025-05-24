import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockTemplates } from '@/data/mockTemplates';
import { Template } from '@/types/template';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea'; // Added Textarea
import { Star, StarHalf, Download, Tag, UserCircle, ArrowLeft, AlertTriangle, MessageSquare } from 'lucide-react'; // Added MessageSquare
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
  const [reviewText, setReviewText] = useState(''); // Added state for review text
  const [submittedReview, setSubmittedReview] = useState(false); // Added state for review submission status


  const renderStars = (rating: number, starSize: string = "w-5 h-5") => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.4 && rating % 1 < 0.9; // Keep existing half-star logic consistent
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const starsArray = [];

    for (let i = 0; i < fullStars; i++) {
      starsArray.push(<Star key={`full-${i}`} className={`${starSize} text-yellow-400 fill-yellow-400`} />);
    }
    if (halfStar) {
      starsArray.push(<StarHalf key="half" className={`${starSize} text-yellow-400 fill-yellow-400`} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      starsArray.push(<Star key={`empty-${i}`} className={`${starSize} text-yellow-400`} />); // Outline only
    }
    return starsArray;
  };

  const renderInteractiveStars = (starSize: string = "w-7 h-7") => {
    return [1, 2, 3, 4, 5].map((starValue) => (
      <Star
        key={starValue}
        className={`${starSize} cursor-pointer transition-colors duration-150 ease-in-out
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
    ));
  }

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
    setSubmittedReview(false); // Reset submitted message if user changes rating
  };

  const handleSubmitReview = () => {
    if (currentRating > 0 && reviewText.trim() !== "" && displayedTemplate) {
      console.log(`Submitting review for template ${displayedTemplate.id}: ${currentRating} stars, Review: "${reviewText}"`);
      toast({
        title: "Review Submitted!",
        description: `Thank you for your review!`,
      });
      setSubmittedReview(true);
      // Optionally reset form:
      // setCurrentRating(0);
      // setReviewText('');
    } else if (currentRating === 0) {
       toast({ title: "Missing Rating", description: "Please select a star rating.", variant: "destructive" });
    } else {
       toast({ title: "Missing Review Text", description: "Please write a review.", variant: "destructive" });
    }
  };

  if (!displayedTemplate) {
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
                
                {/* Overall Rating Display - Already well implemented */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(displayedTemplate.averageRating, "w-5 h-5")}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({displayedTemplate.averageRating.toFixed(1)} from {displayedTemplate.numberOfRatings.toLocaleString()} ratings)
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
              
              {/* User Review Submission Form (Placeholder) */}
              <Card className="mt-6 pt-0 border-0 shadow-none">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-lg font-semibold text-foreground flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" /> Leave a Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1.5">Your Rating:</p>
                    <div className="flex items-center space-x-1">
                      {renderInteractiveStars("w-7 h-7")}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reviewText" className="text-sm font-medium text-foreground">Your Review:</Label>
                    <Textarea 
                      id="reviewText"
                      placeholder="Share your thoughts on this template..." 
                      className="mt-1 min-h-[100px]"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      disabled={submittedReview}
                    />
                  </div>
                  <Button 
                    size="default" 
                    className="w-full md:w-auto" 
                    onClick={handleSubmitReview}
                    disabled={submittedReview || currentRating === 0 || reviewText.trim() === ""}
                  >
                    {submittedReview ? 'Review Submitted!' : 'Submit Review'}
                  </Button>
                  {submittedReview && (
                    <p className="text-sm text-green-600 mt-2">
                      Thank you for your review!
                    </p>
                  )}
                </CardContent>
              </Card>
              {/* End of Review Submission Section */}

              <div className="mt-auto pt-6"> {/* Pushes download button to bottom */}
                <Button size="lg" className="w-full text-lg py-3 bg-primary hover:bg-primary/90" onClick={handleDownload}>
                  <Download className="mr-2 h-5 w-5" /> Download Template
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Reviews List (Placeholder) */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">User Reviews</CardTitle>
            <CardDescription>See what others are saying about this template.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mock Review 1 */}
            <div className="border-b border-border pb-4">
              <div className="flex items-center mb-1">
                <UserCircle size={20} className="mr-2 text-muted-foreground" />
                <h4 className="font-semibold text-foreground">Alice M.</h4>
                <div className="ml-auto flex items-center">
                  {renderStars(5, "w-4 h-4")}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1.5">October 28, 2023</p>
              <p className="text-foreground text-sm">
                "Absolutely fantastic template! Saved me so much time and looks incredibly professional. Highly recommended."
              </p>
            </div>
            {/* Mock Review 2 */}
            <div className="border-b border-border pb-4">
              <div className="flex items-center mb-1">
                <UserCircle size={20} className="mr-2 text-muted-foreground" />
                <h4 className="font-semibold text-foreground">Bob K.</h4>
                <div className="ml-auto flex items-center">
                  {renderStars(4, "w-4 h-4")}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1.5">October 25, 2023</p>
              <p className="text-foreground text-sm">
                "Great design and easy to use. One minor section was a bit tricky to customize, but overall very satisfied."
              </p>
            </div>
            {/* Mock Review 3 */}
            <div>
              <div className="flex items-center mb-1">
                <UserCircle size={20} className="mr-2 text-muted-foreground" />
                <h4 className="font-semibold text-foreground">Charlie P.</h4>
                <div className="ml-auto flex items-center">
                   {renderStars(3, "w-4 h-4")}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1.5">October 22, 2023</p>
              <p className="text-foreground text-sm">
                "It's a decent template. Does the job, but I found it a bit too generic for my specific needs. Good starting point though."
              </p>
            </div>
            {/* Comment: This list would be dynamically populated with actual reviews from a backend. Pagination or a "Load More" button might be needed for many reviews. */}
            {displayedTemplate.numberOfRatings === 0 && (
                 <p className="text-muted-foreground text-center py-4">No reviews yet. Be the first to leave a review!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemplateDetailPage;

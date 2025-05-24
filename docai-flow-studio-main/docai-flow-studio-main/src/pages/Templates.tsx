
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Added Label import
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ListFilter } from 'lucide-react'; // Added Filter and ListFilter icons
import { mockTemplates } from '@/data/mockTemplates';
import TemplateCard from '@/components/TemplateCard'; // Corrected import
import { Template } from '@/types/template';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Price filter removed as it's not in the Template type

  // Use the imported mockTemplates
  const templates: Template[] = mockTemplates;

  // Define categories based on the Template type and mockData
  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (template.tags && template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pt-20"> {/* Changed bg-gray-50 to bg-background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4 tracking-tight"> {/* Changed text-gray-900 */}
            Explore Our Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto"> {/* Changed text-gray-600 */}
            Discover professional templates created by our community of talented creators
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-lg border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" /> {/* Changed text-gray-400 */}
                <Input
                  placeholder="Search templates by name, description, or tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-card"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-56 bg-card">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Price filter select removed */}

              {/* Placeholder for Advanced Filtering Button */}
              <Button variant="outline" className="w-full md:w-auto bg-card">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
              {/* TODO: Implement Advanced Filtering functionality. 
                   This could include filters for:
                   - Average Rating (e.g., 4 stars and up)
                   - Popularity (e.g., based on downloads or views - requires tracking)
                   - Specific Tags (multi-select or advanced tag input)
                   - Price Range (if price is ever added back to Template type)
                   - Creator
                   Consider a popover or a separate modal for these filters.
              */}
            </div>
          </CardContent>
        </Card>
        
        {/* Controls Bar: Sorting and Layout Options */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {selectedCategory === 'all' ? 'All Templates' : `${selectedCategory} Templates`} 
              <span className="text-base font-normal text-muted-foreground ml-2">({filteredTemplates.length} results)</span>
            </h2>
          </div>
          
          {/* Placeholder for Sorting Options */}
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-by" className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</Label>
            <Select defaultValue="popularity_desc">
                <SelectTrigger id="sort-by" className="w-auto md:w-[180px] bg-card">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="popularity_desc">Popularity (High to Low)</SelectItem>
                    <SelectItem value="popularity_asc">Popularity (Low to High)</SelectItem>
                    <SelectItem value="rating_desc">Rating (High to Low)</SelectItem>
                    <SelectItem value="rating_asc">Rating (Low to High)</SelectItem>
                    <SelectItem value="newest_desc">Newest First</SelectItem>
                    <SelectItem value="newest_asc">Oldest First</SelectItem>
                    <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                </SelectContent>
            </Select>
            {/* TODO: Implement actual sorting logic based on the selected value. 
                 This will likely involve updating the `filteredTemplates` logic or applying
                 a sort function before mapping to <TemplateCard />.
            */}
            {/* Placeholder for Layout Toggle (e.g., Grid/List view) - Future enhancement
            <Button variant="outline" size="icon" className="ml-2 bg-card">
                <ListFilter className="h-4 w-4" />
            </Button> 
            */}
          </div>
        </div>


        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTemplates.map((template: Template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center col-span-full"> {/* Ensure it spans full width if grid is parent */}
            <CardContent>
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No templates found</h3> {/* Changed text-gray-900 */}
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria.</p> {/* Changed text-gray-600 */}
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  // TODO: Add logic to reset any new advanced filters or sorting options here.
                }}
              >
                Clear Filters & Sort
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Templates;

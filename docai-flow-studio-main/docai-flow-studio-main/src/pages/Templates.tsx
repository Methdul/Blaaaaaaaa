
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { mockTemplates } from '@/data/mockTemplates';
import { TemplateCard } from '@/components/TemplateCard';
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
            </div>
          </CardContent>
        </Card>

        {/* All Templates Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-6"> {/* Changed text-gray-900 */}
            {selectedCategory === 'all' ? 'All Templates' : `${selectedCategory} Templates`} ({filteredTemplates.length})
          </h2>
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
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Templates;

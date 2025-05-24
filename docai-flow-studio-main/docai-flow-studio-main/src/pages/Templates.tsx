
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Download, Eye, User } from 'lucide-react';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const templates = [
    {
      id: 1,
      name: "Modern Professional Resume",
      category: "Resume",
      price: "Free",
      author: "Sarah Chen",
      rating: 4.8,
      downloads: 1234,
      views: 5678,
      description: "Clean, modern resume template perfect for tech professionals",
      tags: ["modern", "professional", "tech", "clean"],
      featured: true
    },
    {
      id: 2,
      name: "Creative Portfolio Resume",
      category: "Resume",
      price: "$5",
      author: "Mike Rodriguez",
      rating: 4.9,
      downloads: 856,
      views: 3421,
      description: "Eye-catching resume template for creative professionals",
      tags: ["creative", "portfolio", "design", "colorful"],
      featured: false
    },
    {
      id: 3,
      name: "Business Invoice Template",
      category: "Invoice",
      price: "Free",
      author: "Emily Johnson",
      rating: 4.7,
      downloads: 2341,
      views: 8765,
      description: "Professional invoice template for small businesses",
      tags: ["business", "invoice", "professional", "simple"],
      featured: true
    },
    {
      id: 4,
      name: "Executive Cover Letter",
      category: "Letter",
      price: "$10",
      author: "David Park",
      rating: 4.6,
      downloads: 445,
      views: 1892,
      description: "Sophisticated cover letter template for executive positions",
      tags: ["executive", "formal", "leadership", "corporate"],
      featured: false
    },
    {
      id: 5,
      name: "Freelancer Invoice",
      category: "Invoice",
      price: "$3",
      author: "Lisa Wang",
      rating: 4.8,
      downloads: 1567,
      views: 4321,
      description: "Perfect invoice template for freelancers and consultants",
      tags: ["freelancer", "consulting", "hourly", "modern"],
      featured: false
    },
    {
      id: 6,
      name: "Academic Cover Letter",
      category: "Letter",
      price: "Free",
      author: "John Smith",
      rating: 4.5,
      downloads: 789,
      views: 2134,
      description: "Tailored cover letter template for academic positions",
      tags: ["academic", "research", "university", "formal"],
      featured: false
    }
  ];

  const categories = ['all', 'Resume', 'Invoice', 'Letter', 'Contract', 'Proposal'];
  const priceFilters = ['all', 'Free', 'Premium'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'Free' && template.price === 'Free') ||
                        (selectedPrice === 'Premium' && template.price !== 'Free');
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const featuredTemplates = templates.filter(template => template.featured);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Template Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover professional templates created by our community of talented creators
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
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
              
              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  {priceFilters.map(price => (
                    <SelectItem key={price} value={price}>
                      {price === 'all' ? 'All Prices' : price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Featured Templates */}
        {featuredTemplates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTemplates.map(template => (
                <Card key={template.id} className="hover-lift group cursor-pointer">
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <Badge variant={template.price === 'Free' ? 'secondary' : 'default'} className="mb-2">
                        {template.price}
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        Featured
                      </Badge>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-docai-blue to-docai-purple rounded-lg mb-4 flex items-center justify-center text-white font-bold text-lg">
                      {template.category}
                    </div>
                    <CardTitle className="text-lg group-hover:text-docai-blue transition-colors">
                      {template.name}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{template.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{template.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{template.downloads}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{template.views}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Templates */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All Templates ({filteredTemplates.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <Card key={template.id} className="hover-lift group cursor-pointer">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <Badge variant={template.price === 'Free' ? 'secondary' : 'default'} className="mb-2">
                    {template.price}
                  </Badge>
                  <div className="text-sm text-gray-500">{template.category}</div>
                </div>
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-600 font-medium">
                  {template.name}
                </div>
                <CardTitle className="text-lg group-hover:text-docai-blue transition-colors">
                  {template.name}
                </CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{template.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{template.downloads}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{template.views}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    Use Template
                  </Button>
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <Card className="p-12 text-center">
            <CardContent>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedPrice('all');
              }}>
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

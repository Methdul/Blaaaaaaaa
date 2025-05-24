
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Zap, Copy, Download, RefreshCw } from 'lucide-react';

const AiWriter = () => {
  const [prompt, setPrompt] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const documentTypes = [
    { value: 'cover-letter', label: 'Cover Letter' },
    { value: 'resume-summary', label: 'Resume Summary' },
    { value: 'business-proposal', label: 'Business Proposal' },
    { value: 'email', label: 'Professional Email' },
    { value: 'contract', label: 'Contract' },
    { value: 'job-description', label: 'Job Description' },
  ];

  const promptExamples = [
    {
      type: 'Cover Letter',
      prompt: 'Write a cover letter for a Senior Software Engineer position at Microsoft, highlighting experience with React, Node.js, and cloud technologies.'
    },
    {
      type: 'Resume Summary',
      prompt: 'Create a professional summary for a Product Manager with 5 years of experience in fintech and a background in data analytics.'
    },
    {
      type: 'Business Proposal',
      prompt: 'Draft a business proposal for a mobile app development project for a fitness company, including timeline and budget considerations.'
    },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || !documentType) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const sampleContent = `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Software Engineer position at Microsoft. With over 6 years of experience developing scalable web applications and cloud-based solutions, I am excited about the opportunity to contribute to Microsoft's innovative projects.

In my current role at TechCorp, I have led the development of several high-impact applications using React and Node.js, serving over 100,000 active users. My expertise includes:

• Frontend Development: Proficient in React, TypeScript, and modern JavaScript frameworks
• Backend Development: Extensive experience with Node.js, Express, and RESTful API design
• Cloud Technologies: Hands-on experience with Azure, AWS, and containerization using Docker
• Team Leadership: Successfully mentored junior developers and led cross-functional teams

I am particularly drawn to Microsoft's commitment to innovation and its impact on technology worldwide. I believe my technical skills and passion for creating user-centric solutions would be valuable additions to your engineering team.

Thank you for considering my application. I look forward to discussing how my experience can contribute to Microsoft's continued success.

Best regards,
[Your Name]`;
      
      setGeneratedContent(sampleContent);
      setIsGenerating(false);
    }, 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleExampleClick = (example: typeof promptExamples[0]) => {
    setPrompt(example.prompt);
    setDocumentType(example.type.toLowerCase().replace(' ', '-'));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            AI Writer 🤖
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let our AI assistant help you create professional documents in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-docai-blue" />
                  <span>Create with AI</span>
                </CardTitle>
                <CardDescription>
                  Describe what you want to write and let AI do the work
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type
                  </label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe what you want to write
                  </label>
                  <Textarea
                    placeholder="Example: Write a cover letter for a marketing manager position at Apple, emphasizing my 3 years of experience in digital marketing and my passion for innovative products..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="h-32 resize-none"
                  />
                </div>
                
                <Button 
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || !documentType || isGenerating}
                  className="w-full bg-docai-blue hover:bg-docai-blue-dark"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate Document
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            {/* Example Prompts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Example Prompts</CardTitle>
                <CardDescription>
                  Try these examples to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {promptExamples.map((example, index) => (
                  <div 
                    key={index}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleExampleClick(example)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{example.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{example.prompt}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>
                  Your AI-generated document will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="space-y-4">
                    <div className="bg-white p-6 border rounded-lg min-h-96 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                        {generatedContent}
                      </pre>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="outline" onClick={handleCopy} className="flex-1">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button 
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="flex-1 bg-docai-blue hover:bg-docai-blue-dark"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96 text-gray-400">
                    <div className="text-center">
                      <Zap className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Ready to Generate</h3>
                      <p>Fill in the details on the left and click "Generate Document"</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-docai-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-docai-blue" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600">Generate professional documents in under 30 seconds</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Copy className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy to Edit</h3>
              <p className="text-sm text-gray-600">Copy, edit, and customize the generated content</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multiple Formats</h3>
              <p className="text-sm text-gray-600">Download as PDF, Word, or plain text</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AiWriter;

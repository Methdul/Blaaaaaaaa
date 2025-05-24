
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Save, Mail } from 'lucide-react';

const LetterBuilder = () => {
  const [letterData, setLetterData] = useState({
    type: '',
    date: '',
    sender: {
      name: '',
      address: '',
      email: '',
      phone: ''
    },
    recipient: {
      name: '',
      title: '',
      company: '',
      address: ''
    },
    subject: '',
    greeting: '',
    body: '',
    closing: '',
    signature: ''
  });

  const letterTypes = [
    { value: 'cover-letter', label: 'Cover Letter' },
    { value: 'resignation', label: 'Resignation Letter' },
    { value: 'recommendation', label: 'Recommendation Letter' },
    { value: 'business', label: 'Business Letter' },
    { value: 'complaint', label: 'Complaint Letter' },
    { value: 'thank-you', label: 'Thank You Letter' },
  ];

  const templates = {
    'cover-letter': {
      subject: 'Application for [Position Title]',
      greeting: 'Dear Hiring Manager,',
      body: 'I am writing to express my strong interest in the [Position Title] position at [Company Name]. With my background in [Your Field] and passion for [Industry/Field], I am excited about the opportunity to contribute to your team.\n\nIn my previous role at [Previous Company], I [Key Achievement]. This experience has equipped me with [Relevant Skills] that would be valuable for this position.\n\nI am particularly drawn to [Company Name] because [Reason for Interest]. I believe my skills in [Key Skills] would help [How You Can Contribute].\n\nI would welcome the opportunity to discuss how my experience can benefit your team. Thank you for considering my application.',
      closing: 'Sincerely,'
    },
    'resignation': {
      subject: 'Resignation Notice',
      greeting: 'Dear [Manager Name],',
      body: 'I am writing to formally notify you of my resignation from my position as [Job Title] at [Company Name]. My last day of work will be [Date], providing [Notice Period] notice as required.\n\nI have made this decision to [Reason for Leaving]. I am grateful for the opportunities for professional and personal growth during my time here.\n\nI am committed to making this transition as smooth as possible. I am happy to assist in training my replacement and completing any outstanding projects.',
      closing: 'Best regards,'
    },
    'business': {
      subject: '[Subject]',
      greeting: 'Dear [Recipient],',
      body: 'I hope this letter finds you well. I am writing to [Purpose of Letter].\n\n[Main Content - Explain your request, proposal, or information in detail. Be clear and professional in your communication.]\n\nI would appreciate your prompt attention to this matter. Please feel free to contact me if you need any additional information or clarification.',
      closing: 'Sincerely,'
    }
  };

  const handleTemplateSelect = (type: string) => {
    const template = templates[type as keyof typeof templates];
    if (template) {
      setLetterData(prev => ({
        ...prev,
        type,
        subject: template.subject,
        greeting: template.greeting,
        body: template.body,
        closing: template.closing
      }));
    } else {
      setLetterData(prev => ({ ...prev, type }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Letter Builder ✉️
          </h1>
          <p className="text-gray-600">Create professional letters with our easy-to-use builder</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Letter Type & Date */}
            <Card>
              <CardHeader>
                <CardTitle>Letter Details</CardTitle>
                <CardDescription>Choose your letter type and set the date</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="letterType">Letter Type</Label>
                    <Select value={letterData.type} onValueChange={handleTemplateSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select letter type" />
                      </SelectTrigger>
                      <SelectContent>
                        {letterTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={letterData.date}
                      onChange={(e) => setLetterData(prev => ({
                        ...prev,
                        date: e.target.value
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sender Information */}
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Your contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="senderName">Full Name</Label>
                  <Input
                    id="senderName"
                    placeholder="John Doe"
                    value={letterData.sender.name}
                    onChange={(e) => setLetterData(prev => ({
                      ...prev,
                      sender: { ...prev.sender, name: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="senderAddress">Address</Label>
                  <Textarea
                    id="senderAddress"
                    placeholder="123 Main St, City, State 12345"
                    className="h-20"
                    value={letterData.sender.address}
                    onChange={(e) => setLetterData(prev => ({
                      ...prev,
                      sender: { ...prev.sender, address: e.target.value }
                    }))}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="senderEmail">Email</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      placeholder="john@example.com"
                      value={letterData.sender.email}
                      onChange={(e) => setLetterData(prev => ({
                        ...prev,
                        sender: { ...prev.sender, email: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="senderPhone">Phone</Label>
                    <Input
                      id="senderPhone"
                      placeholder="+1 (555) 123-4567"
                      value={letterData.sender.phone}
                      onChange={(e) => setLetterData(prev => ({
                        ...prev,
                        sender: { ...prev.sender, phone: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recipient Information */}
            <Card>
              <CardHeader>
                <CardTitle>Recipient Information</CardTitle>
                <CardDescription>Who you're writing to</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      placeholder="Jane Smith"
                      value={letterData.recipient.name}
                      onChange={(e) => setLetterData(prev => ({
                        ...prev,
                        recipient: { ...prev.recipient, name: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipientTitle">Title</Label>
                    <Input
                      id="recipientTitle"
                      placeholder="Hiring Manager"
                      value={letterData.recipient.title}
                      onChange={(e) => setLetterData(prev => ({
                        ...prev,
                        recipient: { ...prev.recipient, title: e.target.value }
                      }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Company Name"
                    value={letterData.recipient.company}
                    onChange={(e) => setLetterData(prev => ({
                      ...prev,
                      recipient: { ...prev.recipient, company: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="recipientAddress">Address</Label>
                  <Textarea
                    id="recipientAddress"
                    placeholder="456 Business Ave, City, State 67890"
                    className="h-20"
                    value={letterData.recipient.address}
                    onChange={(e) => setLetterData(prev => ({
                      ...prev,
                      recipient: { ...prev.recipient, address: e.target.value }
                    }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Letter Content */}
            <Card>
              <CardHeader>
                <CardTitle>Letter Content</CardTitle>
                <CardDescription>The main content of your letter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject Line</Label>
                  <Input
                    id="subject"
                    placeholder="Subject of your letter"
                    value={letterData.subject}
                    onChange={(e) => setLetterData(prev => ({
                      ...prev,
                      subject: e.target.value
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="greeting">Greeting</Label>
                  <Input
                    id="greeting"
                    placeholder="Dear Hiring Manager,"
                    value={letterData.greeting}
                    onChange={(e) => setLetterData(prev => ({
                      ...prev,
                      greeting: e.target.value
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="body">Letter Body</Label>
                  <Textarea
                    id="body"
                    placeholder="Write the main content of your letter here..."
                    className="h-40 resize-none"
                    value={letterData.body}
                    onChange={(e) => setLetterData(prev => ({
                      ...prev,
                      body: e.target.value
                    }))}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="closing">Closing</Label>
                    <Input
                      id="closing"
                      placeholder="Sincerely,"
                      value={letterData.closing}
                      onChange={(e) => setLetterData(prev => ({
                        ...prev,
                        closing: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="signature">Signature</Label>
                    <Input
                      id="signature"
                      placeholder="Your Name"
                      value={letterData.signature}
                      onChange={(e) => setLetterData(prev => ({
                        ...prev,
                        signature: e.target.value
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Letter Preview</CardTitle>
                    <CardDescription>See how your letter looks</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button size="sm" className="bg-docai-blue hover:bg-docai-blue-dark">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-8 border rounded-lg shadow-sm min-h-96">
                  {/* Sender Info */}
                  <div className="mb-8">
                    <div className="text-sm">
                      <p className="font-medium">{letterData.sender.name || 'Your Name'}</p>
                      <div className="whitespace-pre-line text-gray-600">
                        {letterData.sender.address || 'Your Address'}
                      </div>
                      <p className="text-gray-600">{letterData.sender.email || 'your@email.com'}</p>
                      <p className="text-gray-600">{letterData.sender.phone || 'Your Phone'}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="mb-8 text-right">
                    <p className="text-sm text-gray-600">
                      {letterData.date || new Date().toLocaleDateString()}
                    </p>
                  </div>

                  {/* Recipient Info */}
                  <div className="mb-8">
                    <div className="text-sm">
                      <p className="font-medium">
                        {letterData.recipient.name || 'Recipient Name'}
                        {letterData.recipient.title && `, ${letterData.recipient.title}`}
                      </p>
                      {letterData.recipient.company && (
                        <p className="text-gray-600">{letterData.recipient.company}</p>
                      )}
                      <div className="whitespace-pre-line text-gray-600">
                        {letterData.recipient.address || 'Recipient Address'}
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  {letterData.subject && (
                    <div className="mb-6">
                      <p className="font-medium">
                        Subject: {letterData.subject}
                      </p>
                    </div>
                  )}

                  {/* Greeting */}
                  <div className="mb-6">
                    <p>{letterData.greeting || 'Dear Sir/Madam,'}</p>
                  </div>

                  {/* Body */}
                  <div className="mb-8">
                    <div className="whitespace-pre-line leading-relaxed">
                      {letterData.body || 'Your letter content will appear here. Start typing in the form to see your letter come to life.'}
                    </div>
                  </div>

                  {/* Closing */}
                  <div className="space-y-4">
                    <p>{letterData.closing || 'Sincerely,'}</p>
                    <div className="pt-8">
                      <p className="font-medium">{letterData.signature || letterData.sender.name || 'Your Name'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterBuilder;

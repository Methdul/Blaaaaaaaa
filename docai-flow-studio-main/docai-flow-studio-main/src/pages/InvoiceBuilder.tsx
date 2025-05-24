
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Download, Plus, Trash2, Save, DollarSign } from 'lucide-react';

const InvoiceBuilder = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    date: '',
    dueDate: '',
    from: {
      name: '',
      address: '',
      email: '',
      phone: ''
    },
    to: {
      name: '',
      address: '',
      email: ''
    },
    items: [
      {
        id: 1,
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0
      }
    ],
    notes: '',
    terms: ''
  });

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Date.now(),
          description: '',
          quantity: 1,
          rate: 0,
          amount: 0
        }
      ]
    }));
  };

  const removeItem = (id: number) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id: number, field: string, value: any) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Invoice Builder 🧾
          </h1>
          <p className="text-gray-600">Create professional invoices for your business</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Invoice Details */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
                <CardDescription>Basic invoice information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Input
                      id="invoiceNumber"
                      placeholder="INV-001"
                      value={invoiceData.invoiceNumber}
                      onChange={(e) => setInvoiceData(prev => ({
                        ...prev,
                        invoiceNumber: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Invoice Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={invoiceData.date}
                      onChange={(e) => setInvoiceData(prev => ({
                        ...prev,
                        date: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={invoiceData.dueDate}
                      onChange={(e) => setInvoiceData(prev => ({
                        ...prev,
                        dueDate: e.target.value
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* From & To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>From (Your Business)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fromName">Business Name</Label>
                    <Input
                      id="fromName"
                      placeholder="Your Business Name"
                      value={invoiceData.from.name}
                      onChange={(e) => setInvoiceData(prev => ({
                        ...prev,
                        from: { ...prev.from, name: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fromAddress">Address</Label>
                    <Textarea
                      id="fromAddress"
                      placeholder="123 Business St, City, State 12345"
                      className="h-20"
                      value={invoiceData.from.address}
                      onChange={(e) => setInvoiceData(prev => ({
                        ...prev,
                        from: { ...prev.from, address: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fromEmail">Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      placeholder="business@example.com"
                      value={invoiceData.from.email}
                      onChange={(e) => setInvoiceData(prev => ({
                        ...prev,
                        from: { ...prev.from, email: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fromPhone">Phone</Label>
                    <Input
                      id="fromPhone"
                      placeholder="+1 (555) 123-4567"
                      value={invoiceData.from.phone}
                      onChange={(e) => setInvoiceData(prev => ({
                        ...prev,
                        from: { ...prev.from, phone: e.target.value }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bill To (Client)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="toName">Client Name</Label>
                    <Input
                      id="toName"
                      placeholder="Client Company Name"
                      value={invoiceData.to.name}
                      onChange={(e) => setInvoiceData(prev => ({
                        ...prev,
                        to: { ...prev.to, name: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="toAddress">Address</Label>
                    <Textarea
                      id="toAddress"
                      placeholder="456 Client Ave, City, State 67890"
                      className="h-20"
                      value={invoiceData.to.address}
                      onChange={(e) => setInvoiceData(prev => ({
                        ...prev,
                        to: { ...prev.to, address: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="toEmail">Email</Label>
                    <Input
                      id="toEmail"
                      type="email"
                      placeholder="client@example.com"
                      value={invoiceData.to.email}
                      onChange={(e) => setInvoiceData(prev => ({
                        ...prev,
                        to: { ...prev.to, email: e.target.value }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Items */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Invoice Items</CardTitle>
                    <CardDescription>Add items or services</CardDescription>
                  </div>
                  <Button onClick={addItem} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {invoiceData.items.map((item, index) => (
                  <div key={item.id} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Item {index + 1}</h4>
                      {invoiceData.items.length > 1 && (
                        <Button
                          onClick={() => removeItem(item.id)}
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <Label>Description</Label>
                        <Input
                          placeholder="Web development services"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div>
                        <Label>Rate ($)</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">Amount: </span>
                      <span className="font-semibold">${item.amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Notes & Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Thank you for your business!"
                    className="h-24"
                    value={invoiceData.notes}
                    onChange={(e) => setInvoiceData(prev => ({
                      ...prev,
                      notes: e.target.value
                    }))}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Payment due within 30 days..."
                    className="h-24"
                    value={invoiceData.terms}
                    onChange={(e) => setInvoiceData(prev => ({
                      ...prev,
                      terms: e.target.value
                    }))}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Invoice Preview</CardTitle>
                    <CardDescription>See how your invoice looks</CardDescription>
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
                <div className="bg-white p-6 border rounded-lg shadow-sm">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h1 className="text-3xl font-bold text-docai-blue mb-2">INVOICE</h1>
                      <p className="text-gray-600">
                        {invoiceData.invoiceNumber || '#INV-001'}
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <p><span className="font-medium">Date:</span> {invoiceData.date || 'MM/DD/YYYY'}</p>
                      <p><span className="font-medium">Due:</span> {invoiceData.dueDate || 'MM/DD/YYYY'}</p>
                    </div>
                  </div>

                  {/* From & To */}
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">From:</h3>
                      <div className="text-sm text-gray-700">
                        <p className="font-medium">{invoiceData.from.name || 'Your Business Name'}</p>
                        <p className="whitespace-pre-line">{invoiceData.from.address || 'Business Address'}</p>
                        <p>{invoiceData.from.email || 'business@example.com'}</p>
                        <p>{invoiceData.from.phone || '+1 (555) 123-4567'}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
                      <div className="text-sm text-gray-700">
                        <p className="font-medium">{invoiceData.to.name || 'Client Name'}</p>
                        <p className="whitespace-pre-line">{invoiceData.to.address || 'Client Address'}</p>
                        <p>{invoiceData.to.email || 'client@example.com'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="mb-8">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-2 text-sm font-semibold text-gray-900">Description</th>
                          <th className="text-center py-2 text-sm font-semibold text-gray-900 w-16">Qty</th>
                          <th className="text-right py-2 text-sm font-semibold text-gray-900 w-20">Rate</th>
                          <th className="text-right py-2 text-sm font-semibold text-gray-900 w-24">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceData.items.map((item, index) => (
                          <tr key={item.id} className="border-b border-gray-100">
                            <td className="py-3 text-sm text-gray-700">
                              {item.description || 'Service description'}
                            </td>
                            <td className="text-center py-3 text-sm text-gray-700">
                              {item.quantity}
                            </td>
                            <td className="text-right py-3 text-sm text-gray-700">
                              ${item.rate.toFixed(2)}
                            </td>
                            <td className="text-right py-3 text-sm text-gray-700 font-medium">
                              ${item.amount.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="flex justify-end mb-8">
                    <div className="w-64">
                      <div className="flex justify-between py-2 text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 text-sm">
                        <span className="text-gray-600">Tax (10%):</span>
                        <span className="text-gray-900">${tax.toFixed(2)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between py-2">
                        <span className="font-semibold text-gray-900">Total:</span>
                        <span className="font-bold text-lg text-docai-blue">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes & Terms */}
                  {(invoiceData.notes || invoiceData.terms) && (
                    <div className="space-y-4 text-sm">
                      {invoiceData.notes && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Notes:</h4>
                          <p className="text-gray-700">{invoiceData.notes}</p>
                        </div>
                      )}
                      {invoiceData.terms && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Terms & Conditions:</h4>
                          <p className="text-gray-700">{invoiceData.terms}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceBuilder;

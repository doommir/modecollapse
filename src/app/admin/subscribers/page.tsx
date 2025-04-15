'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SubscribersPage() {
  const router = useRouter();
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetchSubscribers();
  }, []);
  
  const handleLogout = () => {
    // Clear the admin session cookie
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // Redirect to login page
    router.push('/admin/login');
  };
  
  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/newsletter');
      if (!response.ok) {
        throw new Error('Failed to fetch subscribers');
      }
      const data = await response.json();
      setEmails(data.emails || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      setError('Failed to load subscribers. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemoveSubscriber = async (email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} from the list?`)) {
      return;
    }
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove subscriber');
      }
      
      // Update the local state to remove the email
      setEmails(emails.filter(e => e !== email));
    } catch (error) {
      console.error('Error removing subscriber:', error);
      alert('Failed to remove subscriber. Please try again.');
    }
  };
  
  const handleExportCSV = () => {
    // Create CSV content
    const csvContent = 'data:text/csv;charset=utf-8,' + emails.join('\n');
    
    // Create a download link and trigger click
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="min-h-screen bg-darkBg text-textPrimary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
          <div className="flex space-x-4">
            <Link 
              href="/admin" 
              className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-md transition-colors"
            >
              Back to Admin
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="bg-darkBg/30 border border-textSecondary/10 rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Subscriber List <span className="text-primary ml-2">{emails.length}</span>
            </h2>
            
            <div>
              <button 
                onClick={handleExportCSV}
                disabled={emails.length === 0 || loading}
                className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Export CSV
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-8 text-textSecondary">
              Loading subscribers...
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-400">
              {error}
            </div>
          ) : emails.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-textSecondary/10">
                    <th className="px-4 py-2 text-left">#</th>
                    <th className="px-4 py-2 text-left">Email Address</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((email, index) => (
                    <tr key={index} className="border-b border-textSecondary/10 hover:bg-darkBg/50">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{email}</td>
                      <td className="px-4 py-3">
                        <button 
                          className="px-3 py-1 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-md text-sm transition-colors"
                          onClick={() => handleRemoveSubscriber(email)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-textSecondary">
              No subscribers yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
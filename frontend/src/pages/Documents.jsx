import React, { useState } from 'react';
import { Upload, FileText, Download, Trash2, Eye, Search, Filter, Grid, List } from 'lucide-react';
import { SearchInput } from '../components/ui/Form';
import { LoadingButton } from '../components/ui/Loading';

const Documents = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Mock documents data
  const [documents] = useState([
    {
      id: 1,
      name: 'Project Proposal.pdf',
      type: 'pdf',
      size: '2.5 MB',
      category: 'proposals',
      uploadedBy: 'John Doe',
      uploadedAt: '2024-01-15',
      url: '#'
    },
    {
      id: 2,
      name: 'Client Contract.docx',
      type: 'docx',
      size: '1.8 MB',
      category: 'contracts',
      uploadedBy: 'Jane Smith',
      uploadedAt: '2024-01-14',
      url: '#'
    },
    {
      id: 3,
      name: 'Design Mockups.zip',
      type: 'zip',
      size: '15.2 MB',
      category: 'designs',
      uploadedBy: 'Mike Johnson',
      uploadedAt: '2024-01-12',
      url: '#'
    },
    {
      id: 4,
      name: 'Meeting Notes.txt',
      type: 'txt',
      size: '45 KB',
      category: 'meetings',
      uploadedBy: 'Sarah Wilson',
      uploadedAt: '2024-01-10',
      url: '#'
    },
    {
      id: 5,
      name: 'Budget Report.xlsx',
      type: 'xlsx',
      size: '890 KB',
      category: 'reports',
      uploadedBy: 'Tom Brown',
      uploadedAt: '2024-01-08',
      url: '#'
    },
  ]);

  const categories = [
    { value: 'all', label: 'All Documents' },
    { value: 'proposals', label: 'Proposals' },
    { value: 'contracts', label: 'Contracts' },
    { value: 'designs', label: 'Designs' },
    { value: 'meetings', label: 'Meeting Notes' },
    { value: 'reports', label: 'Reports' },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type) => {
    const iconClass = "h-8 w-8";
    switch (type) {
      case 'pdf':
        return <FileText className={`${iconClass} text-red-500`} />;
      case 'docx':
      case 'doc':
        return <FileText className={`${iconClass} text-blue-500`} />;
      case 'xlsx':
      case 'xls':
        return <FileText className={`${iconClass} text-green-500`} />;
      case 'zip':
      case 'rar':
        return <FileText className={`${iconClass} text-yellow-500`} />;
      default:
        return <FileText className={`${iconClass} text-gray-500`} />;
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileUpload = async (files) => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      console.log('Files uploaded:', files);
    }, 2000);
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFileUpload(e.target.files);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
            Documents
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and organize your project documents
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          
          <label htmlFor="file-upload">
            <LoadingButton
              isLoading={isUploading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Documents
            </LoadingButton>
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`mb-8 border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className={`h-12 w-12 mx-auto mb-4 ${
          dragActive ? 'text-blue-500' : 'text-gray-400'
        }`} />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Drag and drop files here
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          or click to browse files from your computer
        </p>
        <label htmlFor="file-upload-2">
          <LoadingButton
            isLoading={isUploading}
            className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Browse Files
          </LoadingButton>
        </label>
        <input
          id="file-upload-2"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInput}
        />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchInput
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Uploaded By</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getFileIcon(doc.type)}
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {doc.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{doc.size}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {categories.find(c => c.value === doc.category)?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{doc.uploadedBy}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <DocumentActions document={doc} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No documents found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or upload some documents to get started.
          </p>
        </div>
      )}
    </div>
  );
};

// Document Card Component for Grid View
const DocumentCard = ({ document }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getFileIcon(document.type)}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {document.name}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {document.size}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
          {document.category}
        </span>
      </div>
      
      <div className="text-xs text-gray-600 dark:text-gray-400 mb-4">
        <p>Uploaded by {document.uploadedBy}</p>
        <p>{new Date(document.uploadedAt).toLocaleDateString()}</p>
      </div>
      
      <DocumentActions document={document} />
    </div>
  );
};

// Document Actions Component
const DocumentActions = ({ document }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        title="View"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
        title="Download"
      >
        <Download className="h-4 w-4" />
      </button>
      <button
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

// Helper function for file icons (moved outside component)
const getFileIcon = (type) => {
  const iconClass = "h-8 w-8";
  switch (type) {
    case 'pdf':
      return <FileText className={`${iconClass} text-red-500`} />;
    case 'docx':
    case 'doc':
      return <FileText className={`${iconClass} text-blue-500`} />;
    case 'xlsx':
    case 'xls':
      return <FileText className={`${iconClass} text-green-500`} />;
    case 'zip':
    case 'rar':
      return <FileText className={`${iconClass} text-yellow-500`} />;
    default:
      return <FileText className={`${iconClass} text-gray-500`} />;
  }
};

export default Documents;

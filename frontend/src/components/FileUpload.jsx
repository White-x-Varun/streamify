import React, { useRef } from 'react';
import { PaperclipIcon, ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const FileUpload = ({ channel }) => {
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleFileSelect = async (event, type) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    for (const file of files) {
      try {
        if (type === 'image' && !file.type.startsWith('image/')) {
          toast.error('Please select an image file');
          continue;
        }

        if (type === 'file' && file.size > 10 * 1024 * 1024) { // 10MB limit
          toast.error('File size must be less than 10MB');
          continue;
        }

        if (type === 'image' && file.size > 5 * 1024 * 1024) { // 5MB limit for images
          toast.error('Image size must be less than 5MB');
          continue;
        }

        await channel.sendFile(file);
        toast.success(`${type === 'image' ? 'Image' : 'File'} uploaded successfully`);
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload ${type === 'image' ? 'image' : 'file'}`);
      }
    }

    // Reset input
    event.target.value = '';
  };

  return (
    <div className="flex items-center gap-2">
      {/* File Upload Button */}
      <button
        type="button"
        className="btn btn-ghost btn-sm"
        onClick={() => fileInputRef.current?.click()}
        title="Upload file"
      >
        <PaperclipIcon className="size-4" />
      </button>

      {/* Image Upload Button */}
      <button
        type="button"
        className="btn btn-ghost btn-sm"
        onClick={() => imageInputRef.current?.click()}
        title="Upload image"
      >
        <ImageIcon className="size-4" />
      </button>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.zip,.rar,.mp3,.mp4,.avi,.mov"
        onChange={(e) => handleFileSelect(e, 'file')}
        multiple
      />
      <input
        ref={imageInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileSelect(e, 'image')}
        multiple
      />
    </div>
  );
};

export default FileUpload;

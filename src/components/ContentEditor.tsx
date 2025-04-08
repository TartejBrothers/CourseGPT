import React from 'react';
import { motion } from 'framer-motion';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { BoldIcon, DocumentIcon, ListBulletIcon, CodeBracketIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 border-b border-secondary-200 p-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive('bold') ? 'bg-secondary-100' : ''}`}
      >
        <BoldIcon className="h-5 w-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive('italic') ? 'bg-secondary-100' : ''}`}
      >
        <DocumentIcon className="h-5 w-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-secondary-100' : ''}`}
      >
        <ListBulletIcon className="h-5 w-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded ${editor.isActive('heading') ? 'bg-secondary-100' : ''}`}
      >
        <DocumentIcon className="h-5 w-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded ${editor.isActive('codeBlock') ? 'bg-secondary-100' : ''}`}
      >
        <CodeBracketIcon className="h-5 w-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-secondary-100' : ''}`}
      >
        <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
      </motion.button>
      <div className="flex-1" />
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-secondary-900 bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <DocumentIcon className="h-4 w-4 mr-2" />
        Save Changes
      </motion.button>
    </div>
  );
};

export default function ContentEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h2>Welcome to the Content Editor</h2>
      <p>This is a rich text editor where you can create and format your lesson content. Try out the formatting options in the toolbar above!</p>
      <ul>
        <li>Create headings</li>
        <li>Format text</li>
        <li>Add lists</li>
        <li>Include code blocks</li>
        <li>And more!</li>
      </ul>
    `,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden"
    >
      <MenuBar editor={editor} />
      <div className="p-6">
        <EditorContent editor={editor} className="prose max-w-none" />
      </div>
    </motion.div>
  );
}
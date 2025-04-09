import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import Cookies from "js-cookie";
import {
  BoldIcon,
  DocumentIcon,
  ListBulletIcon,
  CodeBracketIcon,
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon,
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  ItalicIcon,
} from "@heroicons/react/24/outline";
import { BiHeading } from "react-icons/bi";

const MenuBar = ({
  editor,
  selectedText,
  onRephrase,
  onRegenerate,
  onSummarize,
}: {
  editor: any;
  selectedText: string;
  onRephrase: () => void;
  onRegenerate: () => void;
  onSummarize: () => void;
}) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 border-b border-secondary-200 p-4 md:justify-between w-full">
      {/* Formatting Buttons */}
      <div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive("bold") ? "bg-secondary-100" : ""
          }`}
        >
          <BoldIcon className="h-5 w-5" />
        </motion.button>

        {/* ... Other Buttons ... */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive("italic") ? "bg-secondary-100" : ""
          }`}
        >
          <ItalicIcon className="h-5 w-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive("bulletList") ? "bg-secondary-100" : ""
          }`}
        >
          <ListBulletIcon className="h-5 w-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 2 }) ? "bg-secondary-100" : ""
          }`}
        >
          <BiHeading />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded ${
            editor.isActive("codeBlock") ? "bg-secondary-100" : ""
          }`}
        >
          <CodeBracketIcon className="h-5 w-5" />
        </motion.button>

        <motion.div className="flex-1" />
      </div>
      {/* Action Buttons */}
      <div className="flex gap-5">
        <motion.button
          onClick={onRegenerate}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-primary-500 hover:bg-primary-400 py-2 rounded-xl"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Regenerate
        </motion.button>
        <motion.button
          onClick={onRephrase}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-primary-500 hover:bg-primary-400 py-2 rounded-xl"
        >
          <ArrowsRightLeftIcon className="h-4 w-4" />
          Rephrase
        </motion.button>
        <motion.button
          onClick={onSummarize}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-primary-500 hover:bg-primary-400 py-2 rounded-xl"
        >
          <SparklesIcon className="h-4 w-4" />
          Summarize
        </motion.button>
      </div>
    </div>
  );
};

export default function ContentEditor() {
  const [selectedText, setSelectedText] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h2>Welcome to the Content Editor</h2>
      <p>This is a rich text editor where you can create and format your lesson content. Try out the formatting options in the toolbar above!</p>

      <h4>Use the three top right buttons to access the AI features. Select the desired text and regenerate the selected text.</h4>
      <ul>
        <li>Create headings</li>
        <li>Format text</li>
        <li>Add lists</li>
        <li>Include code blocks</li>
        <li>And more!</li>
      </ul>
    `,
  });

  // Track selection change
  useEffect(() => {
    if (!editor) return;

    const updateSelection = () => {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to, " ");
      setSelectedText(text.trim());
    };

    editor.on("selectionUpdate", updateSelection);

    return () => {
      editor.off("selectionUpdate", updateSelection);
    };
  }, [editor]);
  function cleanHtmlString(raw: string) {
    return raw
      .replace(/^```html\s*/, "") // Remove ```html from the beginning
      .replace(/```$/, "") // Remove ``` from the end
      .replace(/\n/g, ""); // Remove all newline characters
  }
  const [isLoading, setIsLoading] = useState(false);
  const Base_URL = import.meta.env.VITE_BASE_URL;
  const [updatedText, setUpdatedText] = useState("");
  const onRephrase = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${Base_URL}/api/editor/rephrase`,
        { text: selectedText },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setUpdatedText(cleanHtmlString(response.data.output));
    } catch (error) {
      console.error("Error rephrasing text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegenerate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${Base_URL}/api/editor/regenerate`,
        { text: selectedText },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setUpdatedText(cleanHtmlString(response.data.output));
    } catch (error) {
      console.error("Error regenerating text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSummarize = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${Base_URL}/api/editor/summarize`,
        { text: selectedText },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setUpdatedText(cleanHtmlString(response.data.output));
    } catch (error) {
      console.error("Error summarizing text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <MenuBar
          editor={editor}
          selectedText={selectedText}
          onRephrase={onRephrase}
          onRegenerate={onRegenerate}
          onSummarize={onSummarize}
        />
        <div className="p-6">
          <EditorContent
            editor={editor}
            className="focus:outline-none border border-gray-500 prose max-w-none text-black caret-black responsetext w-full overflow-x-hidden"
          />
        </div>
      </motion.div>
      <motion.div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-6">
        {updatedText && (
          <div className="p-6">
            <h3 className="text-3xl mb-3 font-bold text-center">
              AI Generated Content
            </h3>
            <div
              className="responsetext border border-gray-500 scrollbar-hide overflow-x-hidden"
              dangerouslySetInnerHTML={{ __html: updatedText }}
            />
          </div>
        )}
      </motion.div>
    </>
  );
}

import { useState } from 'react';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(() => {
      setIsCopied(false);
    });
  };

  return [isCopied, copyToClipboard];
};

export default useCopyToClipboard;

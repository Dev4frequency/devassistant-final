import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { CodeEditor } from '@/components/CodeEditor';
import { AIAssistant } from '@/components/AIAssistant';
import { CopyPasteGuard } from '@/components/CopyPasteGuard';
import { useApp } from '@/context/AppContext';
import { detectCopyPaste } from '@/utils/copyPasteDetection';

const EditorPage = () => {
  const navigate = useNavigate();
  const { 
    code, 
    setCode, 
    copyPasteAlert, 
    setCopyPasteAlert,
    pendingPaste,
    setPendingPaste,
    setConfusionDetected 
  } = useApp();

  const handlePaste = (pastedText: string, originalContent: string) => {
    const detection = detectCopyPaste(pastedText, originalContent);
    
    if (detection.detected && detection.questions) {
      setCopyPasteAlert(detection);
      setPendingPaste(pastedText);
    }
  };

  const handleAllowPaste = () => {
    if (pendingPaste) {
      setCode(code + '\n' + pendingPaste);
    }
    setCopyPasteAlert({ detected: false });
    setPendingPaste(null);
  };

  const handleRedirectToModule = (moduleId: string) => {
    setCopyPasteAlert({ detected: false });
    setPendingPaste(null);
    navigate(`/learn/${moduleId}`);
  };

  const handleAIRedirect = (moduleId: string) => {
    setConfusionDetected(moduleId);
    navigate(`/learn/${moduleId}`);
  };

  return (
    <Layout 
      showSidebar 
      sidebar={
        <AIAssistant 
          code={code} 
          onRedirectToModule={handleAIRedirect}
        />
      }
    >
      <div className="flex-1 flex flex-col p-4 h-[calc(100vh-4rem)]">
        <div className="flex-1 min-h-0">
          <CodeEditor
            value={code}
            onChange={setCode}
            onPaste={handlePaste}
            className="h-full"
          />
        </div>
      </div>

      {/* Copy-Paste Guard Modal */}
      <CopyPasteGuard
        isOpen={copyPasteAlert.detected}
        pastedCode={copyPasteAlert.pastedCode || ''}
        questions={copyPasteAlert.questions || []}
        onClose={() => {
          setCopyPasteAlert({ detected: false });
          setPendingPaste(null);
        }}
        onRedirectToModule={handleRedirectToModule}
        onAllowPaste={handleAllowPaste}
      />
    </Layout>
  );
};

export default EditorPage;
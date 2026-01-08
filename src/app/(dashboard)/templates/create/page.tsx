'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { TemplateForm } from '@/components/Templates/TemplateForm';
import { TemplatePreview } from '@/components/Templates/TemplatePreview';
import { templateService } from '@/services/templateService';
import { WhatsAppTemplate } from '@/types/template';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const INITIAL_TEMPLATE: WhatsAppTemplate = {
  name: '',
  category: 'MARKETING',
  language: 'en',
  wabanumber: '',
  userId: '',
  components: [
    {
      type: 'BODY',
      text: '',
      example: { body_text: [[]] },
    },
    {
      type: 'FOOTER',
      text: '',
    },
  ],
};

export default function CreateTemplatePage() {
  const router = useRouter();
  const [template, setTemplate] = useState<WhatsAppTemplate>(INITIAL_TEMPLATE);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleSave = async () => {
    setLoading(true);

    try {
      if (!template.wabanumber) {
        alert('Select Waba Number');
        return;
      }
      if (!template.name) {
        alert('Please enter a template name');
        return;
      }
      if (!template.components.find((c) => c.type === 'BODY')?.text) {
        alert('Body text is required');
        return;
      }
      if (!session?.user?.id) {
        return;
      }
      template.userId = session?.user?.id;

      await templateService.create(template);
      toast.success('Submited for Approval');
      router.push('/templates');
    } catch (error) {
      console.error('Failed to create template', error);
      alert('Failed to create template');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Create Template</h1>
            <p className="text-sm text-gray-500">New message template</p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {loading ? 'Saving...' : 'Submit for Approval'}
        </Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 overflow-y-auto p-6 bg-gray-50 border-r">
            <TemplateForm
              value={template}
              onChange={setTemplate}
            />
          </div>

          <div className="lg:col-span-1 bg-white p-6  flex flex-col items-center">
            <TemplatePreview template={template} />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { WhatsAppTemplate, ComponentType } from '@/types/template';
import { cn } from '@/lib/utils';

interface TemplatePreviewProps {
  template: WhatsAppTemplate;
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  const getComponent = (type: ComponentType) => {
    return template.components.find((c) => c.type === type);
  };

  const header = getComponent('HEADER');
  const body = getComponent('BODY');
  const footer = getComponent('FOOTER');
  const buttons = getComponent('BUTTONS');

  const formatBodyText = (text?: string, examples?: string[][]) => {
    if (!text) return '';
    let formatted = text;
    if (examples && examples[0]) {
      examples[0].forEach((val, index) => {
        formatted = formatted.replace(`{{${index + 1}}}`, `**${val}**`);
      });
    }
    return formatted;
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-[#e5ddd5] p-4 rounded-xl min-h-[500px] shadow-lg relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
        }}
      ></div>

      <div className="relative z-10 space-y-2">
        <div className="flex justify-center mb-4">
          <span className="bg-white/80 text-xs px-2 py-1 rounded shadow-sm text-gray-600">
            Today
          </span>
        </div>

        <div className="bg-white p-3 rounded-lg  shadow-sm max-w-[90%] m-auto rounded-tr-none  border border-gray-100">
          {header && (
            <div className="mb-2 font-semibold text-gray-900 border-b border-gray-100 pb-2">
              {header.format === 'TEXT' && header.text}
              {header.format === 'IMAGE' && (
                <div className="bg-gray-200 h-32 rounded flex items-center justify-center text-gray-500 text-xs">
                  Image Header
                </div>
              )}
            </div>
          )}

          <div className="text-sm text-gray-800 whitespace-pre-wrap">
            {formatBodyText(body?.text, body?.example?.body_text)}
          </div>

          {footer && (
            <div className="mt-2 text-xs text-gray-500 pt-1">{footer.text}</div>
          )}

          <div className="flex justify-end mt-1">
            <span className="text-[10px] text-gray-400">12:00 PM</span>
          </div>
        </div>

        {buttons?.buttons && buttons.buttons.length > 0 && (
          <div className="space-y-1 max-w-[90%] m-auto">
            {buttons.buttons.map((btn, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-2 text-center text-blue-500 active:bg-gray-50 text-sm font-medium shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {btn.type === 'QUICK_REPLY' && btn.text}
                {btn.type === 'URL' && (
                  <span className="flex items-center justify-center gap-1">
                    <span className="text-xs">🔗</span> {btn.text}
                  </span>
                )}
                {btn.type === 'PHONE_NUMBER' && (
                  <span className="flex items-center justify-center gap-1">
                    <span className="text-xs">📞</span> {btn.text}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

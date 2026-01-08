import React, { useState, useEffect } from 'react';
import {
  WhatsAppTemplate,
  TemplateCategory,
  TemplateLanguage,
  ComponentType,
  TEMPLATE_CATEGORIES,
  TEMPLATE_LANGUAGES,
  TemplateComponent,
  TemplateButton,
} from '@/types/template';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { wabaNumberService } from '@/services/wabaNumberService';
import { useSession } from 'next-auth/react';

interface TemplateFormProps {
  value: WhatsAppTemplate;
  onChange: (template: WhatsAppTemplate) => void;
  isReadOnly?: boolean;
}

export function TemplateForm({
  value,
  onChange,
  isReadOnly = false,
}: TemplateFormProps) {
  const { data: session } = useSession();

  const { data: wabaNumbersResponse, isLoading: isLoadingWabaNumbers } =
    useQuery({
      queryKey: ['wabaNumbers'],
      queryFn: () =>
        wabaNumberService.getAll({
          page: 1,
          limit: 100,
          userId: session?.user.id ?? '',
        }),
    });

  const wabaNumbers = Array.isArray(wabaNumbersResponse?.data)
    ? wabaNumbersResponse.data
    : [];

  const updateField = (field: keyof WhatsAppTemplate, val: any) => {
    if (isReadOnly) return;
    onChange({ ...value, [field]: val });
  };

  const updateComponent = (
    type: ComponentType,
    updates: Partial<TemplateComponent> | null
  ) => {
    if (isReadOnly) return;
    const newComponents = [...value.components];
    const index = newComponents.findIndex((c) => c.type === type);

    if (updates === null) {
      if (index !== -1) {
        newComponents.splice(index, 1);
      }
    } else {
      if (index !== -1) {
        newComponents[index] = { ...newComponents[index], ...updates };
      } else {
        newComponents.push({ type, ...updates });
      }
    }
    updateField('components', newComponents);
  };

  const getComponent = (type: ComponentType) =>
    value.components.find((c) => c.type === type);

  const header = getComponent('HEADER');
  const body = getComponent('BODY');
  const footer = getComponent('FOOTER');
  const buttons = getComponent('BUTTONS');

  const handleBodyChange = (text: string) => {
    const matches = text.match(/{{(\d+)}}/g);
    let examples: string[] = [];
    if (matches) {
      const maxVar = Math.max(
        ...matches.map((m) => parseInt(m.replace(/[^\d]/g, '')))
      );
      examples = new Array(maxVar).fill('');
    }

    const existingExamples = body?.example?.body_text?.[0] || [];
    const newExamples = examples.map((_, i) => existingExamples[i] || 'value');

    updateComponent('BODY', {
      text,
      example: {
        body_text: [newExamples],
      },
    });
  };

  const handleHeaderChange = (text: string) => {
    const matches = text.match(/{{(\d+)}}/g);
    let examples: string[] = [];
    if (matches) {
      const maxVar = Math.max(
        ...matches.map((m) => parseInt(m.replace(/[^\d]/g, '')))
      );
      examples = new Array(maxVar).fill('');
    }

    const existingExamples = header?.example?.header_text?.[0] || [];
    const newExamples = examples.map((_, i) => existingExamples[i] || 'value');
    console.log('newExamples', newExamples);

    updateComponent('HEADER', {
      text,
      example: {
        header_text: [newExamples],
      },
    });
  };

  const handleBodyExampleChange = (index: number, val: string) => {
    const currentExamples = [...(body?.example?.body_text?.[0] || [])];
    currentExamples[index] = val;
    updateComponent('BODY', {
      example: { ...body?.example, body_text: [currentExamples] },
    });
  };

  const handleHeaderExampleChange = (index: number, val: string) => {
    const currentExamples = [...(header?.example?.header_text?.[0] || [])];
    currentExamples[index] = val;
    updateComponent('HEADER', {
      example: { ...header?.example, header_text: [currentExamples] },
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg border">
        <div className="space-y-2">
          <Label>Select WABA Account</Label>
          <Select
            value={value.wabanumber}
            onValueChange={(val) => updateField('wabanumber', val)}
            disabled={isReadOnly || isLoadingWabaNumbers}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  isLoadingWabaNumbers ? 'Loading...' : 'Select a WABA Account'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {wabaNumbers.map((num: any) => (
                <SelectItem
                  key={num.id || num._id}
                  value={num.number}
                >
                  {num.number} ({num.groupName || 'No Group'})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Template Name</Label>
          <Input
            value={value.name}
            onChange={(e) =>
              updateField(
                'name',
                e.target.value.toLowerCase().replace(/\s+/g, '_')
              )
            }
            placeholder="seasonal_promotion"
            disabled={isReadOnly}
          />
          <p className="text-xs text-muted-foreground">
            Only lowercase characters and underscores.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={value.category}
            onValueChange={(val) =>
              updateField('category', val as TemplateCategory)
            }
            disabled={isReadOnly}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TEMPLATE_CATEGORIES.map((c) => (
                <SelectItem
                  key={c}
                  value={c}
                >
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Language</Label>
          <Select
            value={value.language}
            onValueChange={(val) =>
              updateField('language', val as TemplateLanguage)
            }
            disabled={isReadOnly}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TEMPLATE_LANGUAGES.map((l) => (
                <SelectItem
                  key={l.value}
                  value={l.value}
                >
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg">Header (Optional)</Label>
        </div>

        <div className="space-y-2">
          <Label>Content Type</Label>
          <Select
            value={header?.format || 'NONE'}
            onValueChange={(val) => {
              if (val === 'NONE') updateComponent('HEADER', null);
              else updateComponent('HEADER', { format: val as any, text: '' });
            }}
            disabled={isReadOnly}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NONE">None</SelectItem>
              <SelectItem value="TEXT">Text</SelectItem>
              <SelectItem value="IMAGE">Image</SelectItem>
              <SelectItem value="VIDEO">Video</SelectItem>
              <SelectItem value="DOCUMENT">Document</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {header?.format === 'TEXT' && (
          <div className="space-y-2">
            <Label>Header Text</Label>
            <Input
              value={header.text || ''}
              onChange={(e) => handleHeaderChange(e.target.value)}
              placeholder="Our Summer Sale is on!"
              disabled={isReadOnly}
            />

            {header?.example?.header_text &&
              header.example.header_text[0]?.length > 0 && (
                <div className="space-y-2 bg-slate-50 p-4 rounded-md">
                  <Label className="text-sm">
                    Variable Examples (required for approval)
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {header.example.header_text[0].map((ex, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2"
                      >
                        <span className="text-xs font-mono text-slate-500">{`{{${
                          idx + 1
                        }}}`}</span>
                        <Input
                          value={ex}
                          onChange={(e) =>
                            handleHeaderExampleChange(idx, e.target.value)
                          }
                          className="h-8 text-sm"
                          disabled={isReadOnly}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg border space-y-4">
        <Label className="text-lg">Body</Label>
        <Textarea
          value={body?.text || ''}
          onChange={(e) => handleBodyChange(e.target.value)}
          placeholder="Enter text. Use {{1}}, {{2}} for variables."
          className="min-h-[100px]"
          disabled={isReadOnly}
        />

        {body?.example?.body_text && body.example.body_text[0]?.length > 0 && (
          <div className="space-y-2 bg-slate-50 p-4 rounded-md">
            <Label className="text-sm">
              Variable Examples (required for approval)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {body.example.body_text[0].map((ex, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs font-mono text-slate-500">{`{{${
                    idx + 1
                  }}}`}</span>
                  <Input
                    value={ex}
                    onChange={(e) =>
                      handleBodyExampleChange(idx, e.target.value)
                    }
                    className="h-8 text-sm"
                    disabled={isReadOnly}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg border space-y-4">
        <Label className="text-lg">Footer (Optional)</Label>
        <Input
          value={footer?.text || ''}
          onChange={(e) => {
            const val = e.target.value;
            if (!val) updateComponent('FOOTER', null);
            else updateComponent('FOOTER', { text: val });
          }}
          placeholder="Enter footer text"
          disabled={isReadOnly}
        />
      </div>

      <div className="bg-white p-6 rounded-lg border space-y-4">
        <Label className="text-lg">Buttons (Optional)</Label>
        {!isReadOnly && (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const currentBtns = buttons?.buttons || [];
                if (currentBtns.length < 3) {
                  updateComponent('BUTTONS', {
                    buttons: [
                      ...currentBtns,
                      { type: 'QUICK_REPLY', text: 'Yes' },
                    ],
                  });
                }
              }}
            >
              + Add Quick Reply
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const currentBtns = buttons?.buttons || [];
                if (currentBtns.length < 2) {
                  // CTA limited
                  updateComponent('BUTTONS', {
                    buttons: [
                      ...currentBtns,
                      { type: 'URL', text: 'Visit Website', url: 'https://' },
                    ],
                  });
                }
              }}
            >
              + Add Call to Action
            </Button>
          </div>
        )}

        <div className="space-y-2">
          {buttons?.buttons?.map((btn, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 border p-2 rounded bg-slate-50"
            >
              <Select
                value={btn.type}
                onValueChange={(val) => {
                  const newBtns = [...(buttons.buttons || [])];
                  newBtns[idx] = { ...newBtns[idx], type: val as any };
                  updateComponent('BUTTONS', { buttons: newBtns });
                }}
                disabled={isReadOnly}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="QUICK_REPLY">Quick Reply</SelectItem>
                  <SelectItem value="URL">URL</SelectItem>
                  <SelectItem value="PHONE_NUMBER">Phone</SelectItem>
                </SelectContent>
              </Select>

              <Input
                value={btn.text}
                onChange={(e) => {
                  const newBtns = [...(buttons.buttons || [])];
                  newBtns[idx] = { ...newBtns[idx], text: e.target.value };
                  updateComponent('BUTTONS', { buttons: newBtns });
                }}
                placeholder="Button Text"
                disabled={isReadOnly}
              />

              {!isReadOnly && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newBtns = [...(buttons.buttons || [])];
                    newBtns.splice(idx, 1);
                    if (newBtns.length === 0) updateComponent('BUTTONS', null);
                    else updateComponent('BUTTONS', { buttons: newBtns });
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { PlusCircle, Trash2 } from 'lucide-react';
import {
  MdOutlineDashboardCustomize,
  MdPermMedia,
  MdOutlineTouchApp,
  MdCode,
  MdCallSplit,
  MdImage,
  MdHttp,
  MdLocationOn,
  MdContacts,
  MdViewCarousel,
  MdDelete,
} from 'react-icons/md';

interface OverlayProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedNode: any;
  onSubmit: (id: string, node: any) => void;
  onDelete: (id: string) => void;
}

export default function Overlay({
  open,
  setOpen,
  selectedNode,
  onSubmit,
  onDelete,
}: OverlayProps) {
  const [form, setForm] = useState<any>({
    nodeName: '',
    nextNode: '',
    type: 'text',
    payload: {},
  });

  useEffect(() => {
    if (!selectedNode) return;

    setForm({
      nodeName: selectedNode.name || '',
      nextNode: selectedNode.data?.nextNode || '',
      type: selectedNode.data?.type || 'text',
      payload: structuredClone(selectedNode.data?.payload || {}),
    });
  }, [selectedNode]);

  const updatePayload = (key: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      payload: {
        ...prev.payload,
        [key]: value,
      },
    }));
  };

  const saveNode = () => {
    onSubmit(selectedNode.id, {
      ...selectedNode,
      name: form.nodeName,
      data: {
        type: form.type,
        nextNode: form.nextNode,
        payload: form.payload,
      },
    });
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(selectedNode?.id);
    setOpen(false);
  };

  const addSection = () => {
    setForm((p) => ({
      ...p,
      payload: {
        ...p.payload,
        sections: [...p.payload.sections, { title: 'New Section', rows: [] }],
      },
    }));
  };

  const removeSection = (index: number) => {
    setForm((p) => ({
      ...p,
      payload: {
        ...p.payload,
        sections: p.payload.sections.filter((_, i) => i !== index),
      },
    }));
  };

  const addRow = (sectionIndex: number) => {
    const sections = [...form.payload.sections];
    sections[sectionIndex].rows.push({
      id: crypto.randomUUID(),
      title: 'New Row',
    });

    setForm((p) => ({
      ...p,
      payload: { ...p.payload, sections },
    }));
  };

  const removeRow = (sectionIndex: number, rowIndex: number) => {
    const sections = [...form.payload.sections];
    sections[sectionIndex].rows.splice(rowIndex, 1);

    setForm((p) => ({
      ...p,
      payload: { ...p.payload, sections },
    }));
  };

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTitle>{selectedNode?.data?.type}</SheetTitle>
      <SheetContent
        side="right"
        className="w-full max-w-2xl flex h-full flex-col "
      >
        <div className="flex-1 p-4 space-y-6 mt-5 overflow-y-auto">
          <Card className="p-4 space-y-2">
            <Label>Node Name</Label>
            <Input
              value={form.nodeName}
              onChange={(e) => setForm({ ...form, nodeName: e.target.value })}
            />
          </Card>

          {form.type === 'text' && (
            <Card className="p-4 space-y-2">
              <Label>Text Message</Label>
              <Textarea
                value={form.payload.text || ''}
                onChange={(e) => updatePayload('text', e.target.value)}
              />
            </Card>
          )}

          {form.type === 'askQuestion' && (
            <Card className="p-4 space-y-2">
              <Label>Question</Label>
              <Textarea
                value={form.payload.question || ''}
                onChange={(e) => updatePayload('question', e.target.value)}
              />

              <Label>Output Variable</Label>
              <Input
                value={form.payload.saveAs || ''}
                onChange={(e) => updatePayload('saveAs', e.target.value)}
              />
            </Card>
          )}

          {form.type === 'button' && (
            <Card className="p-4 space-y-2">
              <Label>Message Text</Label>
              <Input
                value={form.payload.text || ''}
                onChange={(e) => updatePayload('text', e.target.value)}
              />

              <div className="flex justify-between">
                <Label>Buttons</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updatePayload('buttons', [
                      ...(form.payload.buttons || []),
                      'New Option',
                    ])
                  }
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>

              {(form.payload.buttons || []).map((b: string, i: number) => (
                <div
                  key={i}
                  className="flex gap-2"
                >
                  <Input
                    value={b}
                    onChange={(e) => {
                      const copy = [...form.payload.buttons];
                      copy[i] = e.target.value;
                      updatePayload('buttons', copy);
                    }}
                  />
                  <Button
                    variant="ghost"
                    onClick={() => {
                      const copy = [...form.payload.buttons];
                      copy.splice(i, 1);
                      updatePayload('buttons', copy);
                    }}
                  >
                    <Trash2 className="text-red-600" />
                  </Button>
                </div>
              ))}
              <Label>Output Variable</Label>
              <Input
                value={form.payload.saveAs || ''}
                onChange={(e) => updatePayload('saveAs', e.target.value)}
              />
            </Card>
          )}

          {form.type === 'template' && (
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
                <MdOutlineDashboardCustomize className="w-5 h-5" />
                <span>Template Configuration</span>
              </div>
              <div className="space-y-2">
                <Label>Template Name</Label>
                <Input
                  placeholder="e.g. welcome_message"
                  value={form.payload.templateName || ''}
                  onChange={(e) =>
                    updatePayload('templateName', e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Language Code</Label>
                <Input
                  placeholder="e.g. en_US"
                  value={form.payload.language || ''}
                  onChange={(e) => updatePayload('language', e.target.value)}
                />
              </div>
            </Card>
          )}

          {form.type === 'media' && (
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-fuchsia-600 font-bold mb-2">
                <MdPermMedia className="w-5 h-5" />
                <span>Media Config</span>
              </div>
              <div className="space-y-2">
                <Label>Caption (Optional)</Label>
                <Textarea
                  value={form.payload.caption || ''}
                  onChange={(e) => updatePayload('caption', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Media Type</Label>
                  <select
                    className="w-full p-2 border rounded-md text-sm"
                    value={form.payload.mediaType || 'image'}
                    onChange={(e) => updatePayload('mediaType', e.target.value)}
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Media URL</Label>
                  <Input
                    placeholder="https://..."
                    value={form.payload.mediaUrl || ''}
                    onChange={(e) => updatePayload('mediaUrl', e.target.value)}
                  />
                </div>
              </div>
            </Card>
          )}

          {form.type === 'mediaButton' && (
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-rose-600 font-bold mb-2">
                <MdPermMedia className="w-5 h-5" />
                <span>Media & Buttons Config</span>
              </div>
              <div className="space-y-2">
                <Label>Body Text</Label>
                <Textarea
                  value={form.payload.text || ''}
                  onChange={(e) => updatePayload('text', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Media Type</Label>
                  <select
                    className="w-full p-2 border rounded-md text-sm"
                    value={form.payload.mediaType || 'none'}
                    onChange={(e) => updatePayload('mediaType', e.target.value)}
                  >
                    <option value="none">None (Text Only)</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                  </select>
                </div>
                {form.payload.mediaType &&
                  form.payload.mediaType !== 'none' && (
                    <div className="space-y-2">
                      <Label>Media URL</Label>
                      <Input
                        placeholder="https://..."
                        value={form.payload.mediaUrl || ''}
                        onChange={(e) =>
                          updatePayload('mediaUrl', e.target.value)
                        }
                      />
                    </div>
                  )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Buttons (Max 3)</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={(form.payload.buttons || []).length >= 3}
                    onClick={() =>
                      updatePayload('buttons', [
                        ...(form.payload.buttons || []),
                        { id: `btn_${Date.now()}`, title: 'New Button' },
                      ])
                    }
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {(form.payload.buttons || []).map((b: any, i: number) => (
                    <div
                      key={i}
                      className="flex gap-2"
                    >
                      <Input
                        value={b.title}
                        onChange={(e) => {
                          const copy = [...form.payload.buttons];
                          copy[i].title = e.target.value;
                          updatePayload('buttons', copy);
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const copy = [...form.payload.buttons];
                          copy.splice(i, 1);
                          updatePayload('buttons', copy);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Label>Output Variable</Label>
                <Input
                  value={form.payload.saveAs || ''}
                  onChange={(e) => updatePayload('saveAs', e.target.value)}
                />
              </div>
            </Card>
          )}

          {form.type === 'ctaButton' && (
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                <MdOutlineTouchApp className="w-5 h-5" />
                <span>Call to Action Config</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Media Type</Label>
                  <select
                    className="w-full p-2 border rounded-md text-sm"
                    value={form.payload.mediaType || 'none'}
                    onChange={(e) => updatePayload('mediaType', e.target.value)}
                  >
                    <option value="none">None (Text Only)</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                  </select>
                </div>
                {form.payload.mediaType &&
                  form.payload.mediaType !== 'none' && (
                    <div className="space-y-2">
                      <Label>Media URL</Label>
                      <Input
                        placeholder="https://..."
                        value={form.payload.mediaUrl || ''}
                        onChange={(e) =>
                          updatePayload('mediaUrl', e.target.value)
                        }
                      />
                    </div>
                  )}
              </div>
              <div className="space-y-2">
                <Label>Header Text (Optional)</Label>
                <Input
                  value={form.payload.headerText || ''}
                  onChange={(e) => updatePayload('headerText', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Body Text</Label>
                <Textarea
                  value={form.payload.text || ''}
                  onChange={(e) => updatePayload('text', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>CTA Buttons</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updatePayload('buttons', [
                        ...(form.payload.buttons || []),
                        {
                          id: `cta_${Date.now()}`,
                          title: 'Visit Website',
                          type: 'url',
                          value: 'https://',
                        },
                      ])
                    }
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-3">
                  {(form.payload.buttons || []).map((b: any, i: number) => (
                    <div
                      key={i}
                      className="p-3 border rounded-lg space-y-2 bg-gray-50"
                    >
                      <div className="flex gap-2">
                        <Input
                          className="flex-1"
                          placeholder="Button Title"
                          value={b.title}
                          onChange={(e) => {
                            const copy = [...form.payload.buttons];
                            copy[i].title = e.target.value;
                            updatePayload('buttons', copy);
                          }}
                        />
                        <select
                          className="p-2 border rounded-md text-sm bg-white"
                          value={b.type}
                          onChange={(e) => {
                            const copy = [...form.payload.buttons];
                            copy[i].type = e.target.value;
                            updatePayload('buttons', copy);
                          }}
                        >
                          <option value="url">URL</option>
                          <option value="call">Call</option>
                        </select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const copy = [...form.payload.buttons];
                            copy.splice(i, 1);
                            updatePayload('buttons', copy);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <Input
                        placeholder={
                          b.type === 'url'
                            ? 'https://example.com'
                            : '+1234567890'
                        }
                        value={b.value}
                        onChange={(e) => {
                          const copy = [...form.payload.buttons];
                          copy[i].value = e.target.value;
                          updatePayload('buttons', copy);
                        }}
                      />
                    </div>
                  ))}
                </div>
                <Label>Output Variable</Label>
                <Input
                  value={form.payload.saveAs || ''}
                  onChange={(e) => updatePayload('saveAs', e.target.value)}
                />
              </div>
            </Card>
          )}

          {form.type === 'script' && (
            <Card className="p-4 space-y-4 bg-slate-900 text-slate-100 border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                <MdCode className="w-5 h-5" />
                <span>Script Editor</span>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400">JavaScript Code</Label>
                <Textarea
                  className="font-mono text-sm bg-slate-950 border-slate-800 focus:border-cyan-500 min-h-[300px] text-slate-200"
                  value={form.payload.script || ''}
                  onChange={(e) => updatePayload('script', e.target.value)}
                  placeholder="// Example: context.output = context.input.trim();"
                />
                <div className="text-[10px] text-slate-500">
                  Use <code className="text-cyan-600">context</code> to access
                  variables.
                </div>
              </div>
            </Card>
          )}

          {form.type === 'switch' && (
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-purple-600 font-bold mb-2">
                <MdCallSplit className="w-5 h-5" />
                <span>Switch Case Configuration</span>
              </div>
              <div className="space-y-4">
                <Label>Compare Variable</Label>
                <Input
                  value={form.payload.compare_variable || ''}
                  onChange={(e) =>
                    updatePayload('compare_variable', e.target.value)
                  }
                />
                <div className="flex flex-col gap-3">
                  <Label className="text-gray-500 text-xs uppercase font-bold tracking-wider">
                    Cases
                  </Label>
                  {(form.payload.cases || []).map((c: any, i: number) => (
                    <div
                      key={i}
                      className="p-3 bg-gray-50 border border-gray-100 rounded-lg space-y-3 relative group"
                    >
                      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            const copy = [...form.payload.cases];
                            copy.splice(i, 1);
                            updatePayload('cases', copy);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-[1fr,2fr] gap-2 items-end">
                        <div className="space-y-1">
                          <Label className="text-[10px]">Operator</Label>
                          <select
                            className="w-full p-2 border rounded-md text-sm bg-white"
                            value={c.operator || 'eq'}
                            onChange={(e) => {
                              const copy = [...form.payload.cases];
                              copy[i].operator = e.target.value;
                              updatePayload('cases', copy);
                            }}
                          >
                            <option value="eq">Equals (==)</option>
                            <option value="lt">Less (&lt;)</option>
                            <option value="gt">Greater (&gt;)</option>
                            <option value="lte">Less/Eq (&lt;=)</option>
                            <option value="gte">Greater/Eq (&gt;=)</option>
                            <option value="neq">Not Eq (!=)</option>
                            <option value="includes">Includes </option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Value to match</Label>
                          <Input
                            value={c.value}
                            placeholder="e.g. 18 or 'active'"
                            onChange={(e) => {
                              const copy = [...form.payload.cases];
                              copy[i].value = e.target.value;
                              updatePayload('cases', copy);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-dashed"
                  onClick={() =>
                    updatePayload('cases', [
                      ...(form.payload.cases || []),
                      { id: `case_${Date.now()}`, value: '', operator: 'eq' },
                    ])
                  }
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Add Case
                </Button>
              </div>
            </Card>
          )}

          {form.type === 'list' && (
            <Card className="p-4 space-y-3">
              <Label>List Title</Label>
              <Input
                value={form.payload.title}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    payload: {
                      ...p.payload,
                      title: e.target.value,
                    },
                  }))
                }
              />

              <Label>Output Variable</Label>
              <Input
                value={form.payload.saveAs}
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    payload: {
                      ...p.payload,
                      saveAs: e.target.value,
                    },
                  }))
                }
              />

              <div className="flex justify-between items-center">
                <Label>Sections</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={addSection}
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Add Section
                </Button>
              </div>

              {form.payload.sections.map((section: any, si: number) => (
                <div
                  key={si}
                  className="border rounded p-3 space-y-2"
                >
                  {/* SECTION TITLE */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Section title"
                      value={section.title}
                      onChange={(e) => {
                        const sections = [...form.payload.sections];
                        sections[si].title = e.target.value;

                        setForm((p: any) => ({
                          ...p,
                          payload: { ...p.payload, sections },
                        }));
                      }}
                    />

                    <Button
                      variant="ghost"
                      onClick={() => removeSection(si)}
                    >
                      <Trash2 className="text-red-600" />
                    </Button>
                  </div>

                  {/* ROWS */}
                  {section.rows.map((row: any, ri: number) => (
                    <div
                      key={ri}
                      className="flex gap-2"
                    >
                      <Input
                        placeholder="Row title"
                        value={row.title}
                        onChange={(e) => {
                          const sections = [...form.payload.sections];
                          sections[si].rows[ri].title = e.target.value;

                          setForm((p: any) => ({
                            ...p,
                            payload: { ...p.payload, sections },
                          }));
                        }}
                      />

                      <Button
                        variant="ghost"
                        onClick={() => removeRow(si, ri)}
                      >
                        <Trash2 className="text-red-600" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addRow(si)}
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add Row
                  </Button>
                </div>
              ))}
            </Card>
          )}

          {form.type === 'webhook' && (
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                <MdHttp className="w-5 h-5" />
                <span>Webhook Configuration</span>
              </div>
              <div className="space-y-2">
                <Label>Request URL</Label>
                <Input
                  placeholder="https://api.example.com/webhook"
                  value={form.payload.url || ''}
                  onChange={(e) => updatePayload('url', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Method</Label>
                <select
                  className="w-full p-2 border rounded-md text-sm bg-white"
                  value={form.payload.method || 'POST'}
                  onChange={(e) => updatePayload('method', e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>JSON Payload</Label>
                <Textarea
                  placeholder='{ "key": "{{variable}}" }'
                  className="font-mono text-xs min-h-[150px]"
                  value={
                    typeof form.payload.payload === 'object'
                      ? JSON.stringify(form.payload.payload, null, 2)
                      : form.payload.payload || ''
                  }
                  onChange={(e) => {
                    updatePayload('payload', e.target.value);
                  }}
                />
                <p className="text-[10px] text-gray-500">
                  You can use dynamic variables like{' '}
                  <code className="bg-gray-100 px-1 rounded">
                    {'{{variable_name}}'}
                  </code>
                </p>
              </div>
            </Card>
          )}

          {form.type === 'location' && (
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-red-500 font-bold mb-2">
                <MdLocationOn className="w-5 h-5" />
                <span>Location Configuration</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Latitude</Label>
                  <Input
                    placeholder="e.g. 37.7749"
                    value={form.payload.latitude || ''}
                    onChange={(e) => updatePayload('latitude', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Longitude</Label>
                  <Input
                    placeholder="e.g. -122.4194"
                    value={form.payload.longitude || ''}
                    onChange={(e) => updatePayload('longitude', e.target.value)}
                  />
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full text-xs"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        setForm((prev) => ({
                          ...prev,
                          payload: {
                            ...prev.payload,
                            latitude: position.coords.latitude.toString(),
                            longitude: position.coords.longitude.toString(),
                          },
                        }));
                      },
                      (error) => {
                        console.error('Error getting location', error);
                        alert(
                          'Could not get location. Please ensure location services are enabled.'
                        );
                      }
                    );
                  } else {
                    alert('Geolocation is not supported by this browser.');
                  }
                }}
              >
                <MdLocationOn className="mr-1 h-3 w-3" /> Get Current Location
              </Button>

              <div className="space-y-2">
                <Label>Location Name</Label>
                <Input
                  placeholder="e.g. Headquarters"
                  value={form.payload.name || ''}
                  onChange={(e) => updatePayload('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea
                  placeholder="e.g. 1 Infinite Loop, Cupertino, CA"
                  value={form.payload.address || ''}
                  onChange={(e) => updatePayload('address', e.target.value)}
                />
              </div>
            </Card>
          )}

          {form.type === 'carousel' && (
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-purple-600 font-bold mb-2">
                <MdViewCarousel className="w-5 h-5" />
                <span>Carousel Configuration</span>
              </div>

              <div className="space-y-2">
                <Label>Carousel Body Text</Label>
                <Textarea
                  placeholder="Main text for the carousel..."
                  value={form.payload?.bodyText || ''}
                  onChange={(e) => {
                    setForm((prev: any) => ({
                      ...prev,
                      payload: {
                        ...prev.payload,
                        bodyText: e.target.value,
                      },
                    }));
                  }}
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Supports{' '}
                  <code className="bg-gray-100 px-1 rounded">
                    {'{{variables}}'}
                  </code>
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Cards ({form.payload?.cards?.length || 0})</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 text-xs"
                    onClick={() => {
                      const newCard = {
                        card_index: form.payload?.cards?.length || 0,
                        type: 'cta_url',
                        header: {
                          type: 'image',
                          image: { link: 'https://placehold.co/600x400' },
                        },
                        body: { text: 'New Card' },
                        action: {
                          name: 'cta_url',
                          parameters: {
                            display_text: 'Open Link',
                            url: 'https://example.com',
                          },
                        },
                      };

                      setForm((prev: any) => ({
                        ...prev,
                        payload: {
                          ...prev.payload,
                          cards: [...(prev.payload.cards || []), newCard],
                        },
                      }));
                    }}
                  >
                    + Add Card
                  </Button>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {form.payload?.cards?.map((card: any, index: number) => (
                    <Card
                      key={index}
                      className="p-3 border border-gray-200 bg-gray-50 relative"
                    >
                      <button
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        onClick={() => {
                          setForm((prev: any) => {
                            const newCards = [...prev.payload.cards];
                            newCards.splice(index, 1);
                            return {
                              ...prev,
                              payload: {
                                ...prev.payload,
                                cards: newCards,
                              },
                            };
                          });
                        }}
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>

                      <div className="font-bold text-xs mb-2 text-gray-500">
                        Card #{index + 1}
                      </div>

                      <div className="space-y-2">
                        <div>
                          <Label className="text-[10px]">Image URL</Label>
                          <Input
                            className="h-7 text-xs"
                            value={card.header?.image?.link || ''}
                            onChange={(e) => {
                              const newCards = [...form.payload.cards];
                              newCards[index] = {
                                ...newCards[index],
                                header: {
                                  ...newCards[index].header,
                                  image: {
                                    ...newCards[index].header.image,
                                    link: e.target.value,
                                  },
                                },
                              };
                              setForm((prev: any) => ({
                                ...prev,
                                payload: {
                                  ...prev.payload,
                                  cards: newCards,
                                },
                              }));
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-[10px]">Body Text</Label>
                          <Input
                            className="h-7 text-xs"
                            value={card.body?.text || ''}
                            onChange={(e) => {
                              const newCards = [...form.payload.cards];
                              newCards[index] = {
                                ...newCards[index],
                                body: {
                                  ...newCards[index].body,
                                  text: e.target.value,
                                },
                              };
                              setForm((prev: any) => ({
                                ...prev,
                                payload: {
                                  ...prev.payload,
                                  cards: newCards,
                                },
                              }));
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-[10px]">Button Text</Label>
                            <Input
                              className="h-7 text-xs"
                              value={
                                card.action?.parameters?.display_text || ''
                              }
                              onChange={(e) => {
                                const newCards = [...form.payload.cards];
                                newCards[index] = {
                                  ...newCards[index],
                                  action: {
                                    ...newCards[index].action,
                                    parameters: {
                                      ...newCards[index].action.parameters,
                                      display_text: e.target.value,
                                    },
                                  },
                                };
                                setForm((prev: any) => ({
                                  ...prev,
                                  payload: {
                                    ...prev.payload,
                                    cards: newCards,
                                  },
                                }));
                              }}
                            />
                          </div>
                          <div>
                            <Label className="text-[10px]">Button URL</Label>
                            <Input
                              className="h-7 text-xs"
                              value={card.action?.parameters?.url || ''}
                              onChange={(e) => {
                                const newCards = [...form.payload.cards];
                                newCards[index] = {
                                  ...newCards[index],
                                  action: {
                                    ...newCards[index].action,
                                    parameters: {
                                      ...newCards[index].action.parameters,
                                      url: e.target.value,
                                    },
                                  },
                                };
                                setForm((prev: any) => ({
                                  ...prev,
                                  payload: {
                                    ...prev.payload,
                                    cards: newCards,
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {form.type === 'contacts' && (
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-teal-600 font-bold mb-2">
                <MdContacts className="w-5 h-5" />
                <span>Contacts Configuration</span>
              </div>

              <div className="flex justify-between items-center">
                <Label>Contacts List</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updatePayload('contacts', [
                      ...(form.payload.contacts || []),
                      {
                        name: {
                          formatted_name: '',
                          first_name: '',
                          last_name: '',
                        },
                        phones: [],
                        emails: [],
                        addresses: [],
                        org: {},
                        urls: [],
                      },
                    ])
                  }
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Add Contact
                </Button>
              </div>

              {(form.payload.contacts || []).map((contact: any, ci: number) => (
                <Card
                  key={ci}
                  className="p-3 border border-teal-100 space-y-4"
                >
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-sm">
                      Contact #{ci + 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const copy = [...form.payload.contacts];
                        copy.splice(ci, 1);
                        updatePayload('contacts', copy);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  {/* NAME */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-gray-500">
                      NAME
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Formatted Name"
                        value={contact.name?.formatted_name || ''}
                        onChange={(e) => {
                          const copy = [...form.payload.contacts];
                          copy[ci].name = {
                            ...copy[ci].name,
                            formatted_name: e.target.value,
                          };
                          updatePayload('contacts', copy);
                        }}
                      />
                      <Input
                        placeholder="First Name"
                        value={contact.name?.first_name || ''}
                        onChange={(e) => {
                          const copy = [...form.payload.contacts];
                          copy[ci].name = {
                            ...copy[ci].name,
                            first_name: e.target.value,
                          };
                          updatePayload('contacts', copy);
                        }}
                      />
                      <Input
                        placeholder="Last Name"
                        value={contact.name?.last_name || ''}
                        onChange={(e) => {
                          const copy = [...form.payload.contacts];
                          copy[ci].name = {
                            ...copy[ci].name,
                            last_name: e.target.value,
                          };
                          updatePayload('contacts', copy);
                        }}
                      />
                    </div>
                  </div>

                  {/* PHONES */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs font-bold text-gray-500">
                        PHONES
                      </Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 text-xs"
                        onClick={() => {
                          const copy = [...form.payload.contacts];
                          const phones = copy[ci].phones || [];
                          phones.push({ phone: '', type: 'CELL' });
                          copy[ci].phones = phones;
                          updatePayload('contacts', copy);
                        }}
                      >
                        <PlusCircle className="h-3 w-3 mr-1" /> Add
                      </Button>
                    </div>
                    {(contact.phones || []).map((phone: any, pi: number) => (
                      <div
                        key={pi}
                        className="flex gap-2"
                      >
                        <Input
                          placeholder="Phone Number"
                          className="flex-1"
                          value={phone.phone}
                          onChange={(e) => {
                            const copy = [...form.payload.contacts];
                            copy[ci].phones[pi].phone = e.target.value;
                            updatePayload('contacts', copy);
                          }}
                        />
                        <Input
                          placeholder="Type (CELL, WORK)"
                          className="w-24"
                          value={phone.type}
                          onChange={(e) => {
                            const copy = [...form.payload.contacts];
                            copy[ci].phones[pi].type = e.target.value;
                            updatePayload('contacts', copy);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const copy = [...form.payload.contacts];
                            copy[ci].phones.splice(pi, 1);
                            updatePayload('contacts', copy);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* EMAILS */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs font-bold text-gray-500">
                        EMAILS
                      </Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 text-xs"
                        onClick={() => {
                          const copy = [...form.payload.contacts];
                          const emails = copy[ci].emails || [];
                          emails.push({ email: '', type: 'WORK' });
                          copy[ci].emails = emails;
                          updatePayload('contacts', copy);
                        }}
                      >
                        <PlusCircle className="h-3 w-3 mr-1" /> Add
                      </Button>
                    </div>
                    {(contact.emails || []).map((email: any, ei: number) => (
                      <div
                        key={ei}
                        className="flex gap-2"
                      >
                        <Input
                          placeholder="Email Address"
                          className="flex-1"
                          value={email.email}
                          onChange={(e) => {
                            const copy = [...form.payload.contacts];
                            copy[ci].emails[ei].email = e.target.value;
                            updatePayload('contacts', copy);
                          }}
                        />
                        <Input
                          placeholder="Type"
                          className="w-24"
                          value={email.type}
                          onChange={(e) => {
                            const copy = [...form.payload.contacts];
                            copy[ci].emails[ei].type = e.target.value;
                            updatePayload('contacts', copy);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const copy = [...form.payload.contacts];
                            copy[ci].emails.splice(ei, 1);
                            updatePayload('contacts', copy);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* ADDRESSES */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs font-bold text-gray-500">
                        ADDRESSES
                      </Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 text-xs"
                        onClick={() => {
                          const copy = [...form.payload.contacts];
                          const addresses = copy[ci].addresses || [];
                          addresses.push({
                            street: '',
                            city: '',
                            state: '',
                            zip: '',
                            country: '',
                            country_code: '',
                            type: 'WORK',
                          });
                          copy[ci].addresses = addresses;
                          updatePayload('contacts', copy);
                        }}
                      >
                        <PlusCircle className="h-3 w-3 mr-1" /> Add
                      </Button>
                    </div>
                    {(contact.addresses || []).map((addr: any, ai: number) => (
                      <div
                        key={ai}
                        className="p-2 border rounded space-y-2"
                      >
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-400">
                            Address #{ai + 1}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4"
                            onClick={() => {
                              const copy = [...form.payload.contacts];
                              copy[ci].addresses.splice(ai, 1);
                              updatePayload('contacts', copy);
                            }}
                          >
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Street"
                            value={addr.street}
                            onChange={(e) => {
                              const copy = [...form.payload.contacts];
                              copy[ci].addresses[ai].street = e.target.value;
                              updatePayload('contacts', copy);
                            }}
                          />
                          <Input
                            placeholder="City"
                            value={addr.city}
                            onChange={(e) => {
                              const copy = [...form.payload.contacts];
                              copy[ci].addresses[ai].city = e.target.value;
                              updatePayload('contacts', copy);
                            }}
                          />
                          <Input
                            placeholder="State"
                            value={addr.state}
                            onChange={(e) => {
                              const copy = [...form.payload.contacts];
                              copy[ci].addresses[ai].state = e.target.value;
                              updatePayload('contacts', copy);
                            }}
                          />
                          <Input
                            placeholder="Zip"
                            value={addr.zip}
                            onChange={(e) => {
                              const copy = [...form.payload.contacts];
                              copy[ci].addresses[ai].zip = e.target.value;
                              updatePayload('contacts', copy);
                            }}
                          />
                          <Input
                            placeholder="Country"
                            value={addr.country}
                            onChange={(e) => {
                              const copy = [...form.payload.contacts];
                              copy[ci].addresses[ai].country = e.target.value;
                              updatePayload('contacts', copy);
                            }}
                          />
                          <Input
                            placeholder="Count. Code"
                            value={addr.country_code}
                            onChange={(e) => {
                              const copy = [...form.payload.contacts];
                              copy[ci].addresses[ai].country_code =
                                e.target.value;
                              updatePayload('contacts', copy);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ORG & BIRTHDAY */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-gray-500">
                        ORG
                      </Label>
                      <Input
                        placeholder="Company"
                        value={contact.org?.company || ''}
                        onChange={(e) => {
                          const copy = [...form.payload.contacts];
                          copy[ci].org = {
                            ...copy[ci].org,
                            company: e.target.value,
                          };
                          updatePayload('contacts', copy);
                        }}
                      />
                      <Input
                        placeholder="Title"
                        value={contact.org?.title || ''}
                        onChange={(e) => {
                          const copy = [...form.payload.contacts];
                          copy[ci].org = {
                            ...copy[ci].org,
                            title: e.target.value,
                          };
                          updatePayload('contacts', copy);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-gray-500">
                        BIRTHDAY
                      </Label>
                      <Input
                        placeholder="YYYY-MM-DD"
                        value={contact.birthday || ''}
                        onChange={(e) => {
                          const copy = [...form.payload.contacts];
                          copy[ci].birthday = e.target.value;
                          updatePayload('contacts', copy);
                        }}
                      />
                    </div>
                  </div>

                  {/* URLS */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs font-bold text-gray-500">
                        URLS
                      </Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 text-xs"
                        onClick={() => {
                          const copy = [...form.payload.contacts];
                          const urls = copy[ci].urls || [];
                          urls.push({ url: '', type: 'WORK' });
                          copy[ci].urls = urls;
                          updatePayload('contacts', copy);
                        }}
                      >
                        <PlusCircle className="h-3 w-3 mr-1" /> Add
                      </Button>
                    </div>
                    {(contact.urls || []).map((url: any, ui: number) => (
                      <div
                        key={ui}
                        className="flex gap-2"
                      >
                        <Input
                          placeholder="https://..."
                          className="flex-1"
                          value={url.url}
                          onChange={(e) => {
                            const copy = [...form.payload.contacts];
                            copy[ci].urls[ui].url = e.target.value;
                            updatePayload('contacts', copy);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const copy = [...form.payload.contacts];
                            copy[ci].urls.splice(ui, 1);
                            updatePayload('contacts', copy);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </Card>
          )}
        </div>
        <SheetFooter className="sticky bottom-0 z-10 bg-white border-t p-4">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveNode}>Save Changes</Button>
            <Button
              onClick={handleDelete}
              className="flex ml-auto items-center gap-2  bg-red-600 hover:bg-red-900"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

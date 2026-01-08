export type TemplateCategory = 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
export type TemplateLanguage = 'en' | 'es' | 'pt_BR' | 'hi'; // Add more as needed
export type ComponentType = 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
export type HeaderFormat = 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
export type ButtonType = 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';

export interface TemplateButton {
  type: ButtonType;
  text: string;
  url?: string;
  phone_number?: string;
}

export interface TemplateComponent {
  type: ComponentType;
  format?: HeaderFormat;
  text?: string;
  buttons?: TemplateButton[];
  example?: {
    header_text?: string[][];
    body_text?: string[][];
    header_handle?: string[];
  };
}

export interface WhatsAppTemplate {
  id?: string;
  name: string;
  language: TemplateLanguage;
  category: TemplateCategory;
  components: TemplateComponent[];
  status?: string;
  wabanumber: string;
  userId: string;
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  'MARKETING',
  'UTILITY',
  'AUTHENTICATION',
];
export const TEMPLATE_LANGUAGES: { value: TemplateLanguage; label: string }[] =
  [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'pt_BR', label: 'Portuguese (BR)' },
    { value: 'hi', label: 'Hindi' },
  ];

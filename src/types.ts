import type { Node, BuiltInNode } from '@xyflow/react';

export interface BaseNodeData extends Record<string, unknown> {
  label?: string;
  onDelete?: (id: string) => void;
  onClone?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export interface TextNodeData extends BaseNodeData {
  payload: {
    text: string;
  };
}

export interface AskQuestionNodeData extends BaseNodeData {
  payload: {
    question: string;
    saveAs: string;
  };
}

export interface ButtonNodeData extends BaseNodeData {
  payload: {
    text: string;
    buttons: { id: string; title: string }[];
    saveAs: string;
  };
}

export interface ListNodeData extends BaseNodeData {
  payload: {
    title: string;
    sections: {
      title: string;
      rows: { id: string; title: string }[];
    }[];
    saveAs: string;
  };
}

export interface ConditionNodeData extends BaseNodeData {
  payload: {
    condition: string;
  };
}

export interface WebhookNodeData extends BaseNodeData {
  payload: {
    url: string;
    method: 'POST' | 'GET';
    payload?: any;
  };
}

export interface SwitchNodeData extends BaseNodeData {
  payload: {
    variable: string;
    cases: { id: string; value: string; operator: string }[];
  };
}

export interface ScriptNodeData extends BaseNodeData {
  script: string;
  onSuccess?: string;
  onError?: string;
}

export interface TemplateNodeData extends BaseNodeData {
  payload: {
    templateName: string;
    language: string;
    components: any[];
  };
}

export interface MediaButtonNodeData extends BaseNodeData {
  payload: {
    text: string;
    mediaUrl: string;
    mediaType: 'image' | 'video' | 'document';
    buttons: { id: string; title: string }[];
    footerText?: string;
    saveAs: string;
  };
}

export interface CTAButtonNodeData extends BaseNodeData {
  payload: {
    text: string;
    buttons: {
      id: string;
      title: string;
      type: 'url' | 'call';
      value: string;
    }[];
    headerText?: string;
    footerText?: string;
    saveAs: string;
    mediaUrl: string;
    mediaType: string;
  };
}

export interface MediaNodeData extends BaseNodeData {
  payload: {
    mediaType: 'image' | 'video' | 'document';
    mediaUrl: string;
    caption?: string;
    saveAs?: string;
  };
}

export interface LocationNodeData extends BaseNodeData {
  payload: {
    latitude: string;
    longitude: string;
    name: string;
    address: string;
  };
}

export interface ContactsNodeData extends BaseNodeData {
  payload: {
    contacts: {
      name: {
        formatted_name: string;
        first_name: string;
        last_name: string;
        middle_name: string;
        suffix: string;
        prefix: string;
      };
      phones: { phone: string; type: string; wa_id?: string }[];
      emails: { email: string; type: string }[];
      addresses: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        country_code: string;
        type: string;
      }[];
      org: {
        company: string;
        department: string;
        title: string;
      };
      birthday: string;
      urls: { url: string; type: string }[];
    }[];
  };
}

export interface CarouselCard {
  card_index: number;
  type: 'cta_url';
  header: {
    type: 'image';
    image: {
      link: string;
    };
  };
  body: {
    text: string;
  };
  action: {
    name: 'cta_url';
    parameters: {
      display_text: string;
      url: string;
    };
  };
}

export interface CarouselNodeData extends BaseNodeData {
  payload: {
    type: 'interactive';
    interactive: {
      type: 'carousel';
      body: {
        text: string;
      };
      action: {
        cards: CarouselCard[];
      };
    };
  };
}

export type TextNode = Node<TextNodeData, 'text'>;
export type AskQuestionNode = Node<AskQuestionNodeData, 'askQuestion'>;
export type ButtonNode = Node<ButtonNodeData, 'button'>;
export type ListNode = Node<ListNodeData, 'list'>;
export type ConditionNode = Node<ConditionNodeData, 'condition'>;
export type WebhookNode = Node<WebhookNodeData, 'webhook'>;
export type SwitchNode = Node<SwitchNodeData, 'switch'>;
export type ScriptNode = Node<ScriptNodeData, 'script'>;
export type TemplateNode = Node<TemplateNodeData, 'template'>;
export type MediaButtonNode = Node<MediaButtonNodeData, 'mediaButton'>;
export type CTAButtonNode = Node<CTAButtonNodeData, 'ctaButton'>;
export type MediaNode = Node<MediaNodeData, 'media'>;
export type LocationNode = Node<LocationNodeData, 'location'>;
export type ContactsNode = Node<ContactsNodeData, 'contacts'>;
export type CarouselNode = Node<CarouselNodeData, 'carousel'>;
export type FlowStartNode = Node<BaseNodeData, 'flowStart'>;
export type EndNode = Node<BaseNodeData, 'end'>;

export type AppNode =
  | BuiltInNode
  | TextNode
  | AskQuestionNode
  | ButtonNode
  | ListNode
  | ConditionNode
  | WebhookNode
  | SwitchNode
  | ScriptNode
  | TemplateNode
  | MediaButtonNode
  | CTAButtonNode
  | MediaNode
  | LocationNode
  | ContactsNode
  | CarouselNode
  | FlowStartNode
  | EndNode;

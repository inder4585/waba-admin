export const dataItems = {
  flowStart: {
    type: 'flowStart',
    payload: {},
  },

  text: {
    type: 'text',
    payload: {
      text: 'Hello, welcome!',
    },
  },

  askQuestion: {
    type: 'askQuestion',
    payload: {
      question: 'What is your name?',
      saveAs: 'question',
    },
  },

  button: {
    type: 'button',
    payload: {
      text: 'Please choose an option:',
      buttons: ['Option 1', 'Option 2'],
      saveAs: 'selected_option',
    },
  },

  list: {
    type: 'list',
    payload: {
      title: 'Select an item',
      sections: [
        {
          title: 'Section 1',
          rows: [
            { id: '1', title: 'Row 1' },
            { id: '2', title: 'Row 2' },
          ],
        },
      ],
      saveAs: 'list_selection',
    },
  },

  template: {
    type: 'template',
    payload: {
      templateName: 'hello_world',
      language: 'en_US',
      components: [],
    },
  },

  mediaButton: {
    type: 'mediaButton',
    payload: {
      text: 'Check this media!',
      mediaUrl: '',
      mediaType: 'image',
      buttons: [{ id: '1', title: 'Great!' }],
      saveAs: 'media_response',
    },
  },

  media: {
    type: 'media',
    payload: {
      mediaType: 'image',
      mediaUrl: '',
      caption: 'Look at this!',
    },
  },

  ctaButton: {
    type: 'ctaButton',
    payload: {
      text: 'Contact us now',
      buttons: [
        { id: '1', title: 'Call Us', type: 'call', value: '+123456789' },
      ],
      headerText: 'Support',
      saveAs: 'cta_response',
    },
  },

  script: {
    type: 'script',
    payload: {
      script: '// Write your JS here\nreturn context.input;',
    },
  },

  switch: {
    type: 'switch',
    payload: {
      compare_variable: 'user_input',
      cases: [{ id: '1', value: 'Hello', operator: 'eq' }],
    },
  },

  end: {
    type: 'end',
    payload: {},
  },
  location: {
    type: 'location',
    payload: {
      latitude: '',
      longitude: '',
      name: '',
      address: '',
    },
  },

  contacts: {
    type: 'contacts',
    payload: {
      contacts: [
        {
          name: {
            formatted_name: '',
            first_name: '',
            last_name: '',
            middle_name: '',
            suffix: '',
            prefix: '',
          },
          phones: [],
          emails: [],
          addresses: [],
          org: {
            company: '',
            department: '',
            title: '',
          },
          birthday: '',
          urls: [],
        },
      ],
    },
  },

  webhook: {
    type: 'webhook',
    payload: {
      url: '',
      method: 'POST',
      payload: {},
    },
  },

  carousel: {
    type: 'carousel',
    payload: {
      bodyText: 'interactive',
      cards: [
        {
          card_index: 0,
          type: 'cta_url',
          header: {
            type: 'image',
            image: {
              link: 'https://placehold.co/600x400',
            },
          },
          body: {
            text: 'First Card',
          },
          action: {
            name: 'cta_url',
            parameters: {
              display_text: 'Click Here',
              url: 'https://example.com',
            },
          },
        },
        {
          card_index: 1,
          type: 'cta_url',
          header: {
            type: 'image',
            image: {
              link: 'https://placehold.co/600x400',
            },
          },
          body: {
            text: 'Second Card',
          },
          action: {
            name: 'cta_url',
            parameters: {
              display_text: 'Click Here',
              url: 'https://example.com',
            },
          },
        },
      ],
    },
  },
};

export const sidebarItems = [
  { type: 'flowStart', label: 'Start', icon: 'MdStart' },
  { type: 'text', label: 'Text', icon: 'MdChat' },
  { type: 'askQuestion', label: 'Question', icon: 'MdQuestionAnswer' },
  { type: 'template', label: 'Template', icon: 'MdOutlineDashboardCustomize' },
  { type: 'button', label: 'Button', icon: 'MdSmartButton' },
  { type: 'mediaButton', label: 'Media Btns', icon: 'MdPermMedia' },
  { type: 'media', label: 'Media Only', icon: 'MdImage' },
  { type: 'ctaButton', label: 'CTA Btns', icon: 'MdOutlineTouchApp' },
  { type: 'list', label: 'List', icon: 'MdList' },
  // { type: 'script', label: 'Script', icon: 'MdCode' },
  { type: 'switch', label: 'Switch', icon: 'MdCallSplit' },
  { type: 'webhook', label: 'Webhook', icon: 'MdHttp' },
  { type: 'location', label: 'Location', icon: 'MdLocationOn' },
  { type: 'contacts', label: 'Contacts', icon: 'MdContacts' },
  { type: 'carousel', label: 'Carousel', icon: 'MdViewCarousel' },
  { type: 'end', label: 'End', icon: 'MdStop' },
];

export const dummyWabaGroups = [
  {
    id: '1',
    name: 'Sales Team',
    description: 'Main sales team WhatsApp group',
    wabaId: 'waba_123456',
    phoneNumberCount: 3,
    status: 'Active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Support Team',
    description: 'Customer support hotline numbers',
    wabaId: 'waba_789012',
    phoneNumberCount: 5,
    status: 'Active',
    createdAt: '2024-02-01',
  },
  {
    id: '3',
    name: 'Marketing Campaigns',
    description: 'Seasonal marketing numbers',
    wabaId: 'waba_345678',
    phoneNumberCount: 2,
    status: 'Inactive',
    createdAt: '2024-03-10',
  },
];

export const dummyWabaNumbers = [
    { id: '1', number: '+1234567890', status: 'Connected', quality: 'High', group: 'Sales Team' },
    { id: '2', number: '+1987654321', status: 'Connected', quality: 'Medium', group: 'Sales Team' },
    { id: '3', number: '+1122334455', status: 'Disconnected', quality: 'Low', group: 'Support Team' },
];

export const dummyTemplates = [
    { id: '1', name: 'welcome_message', language: 'en_US', status: 'APPROVED', category: 'MARKETING' },
    { id: '2', name: 'order_update', language: 'en_US', status: 'APPROVED', category: 'UTILITY' },
    { id: '3', name: 'otp_verification', language: 'en_US', status: 'PENDING', category: 'AUTHENTICATION' },
    { id: '4', name: 'promo_winter', language: 'es_ES', status: 'REJECTED', category: 'MARKETING' },
];

export const dummyChatSessions = [
    { id: '1', contactName: 'John Doe', contactNumber: '+1234567890', lastMessage: 'Hey, I need help with my order', unreadCount: 2, timestamp: '10:30 AM' },
    { id: '2', contactName: 'Jane Smith', contactNumber: '+1987654321', lastMessage: 'Thanks for the update!', unreadCount: 0, timestamp: 'Yesterday' },
    { id: '3', contactName: 'Alice Johnson', contactNumber: '+1122334455', lastMessage: 'Is this available?', unreadCount: 0, timestamp: 'Mon' },
];

export const dummyMessages = [
    { id: '1', sessionId: '1', sender: 'user', text: 'Hi, I have an issue with order #1234', timestamp: '10:28 AM' },
    { id: '2', sessionId: '1', sender: 'agent', text: 'Hello John, surely! Let me check that for you.', timestamp: '10:29 AM' },
    { id: '3', sessionId: '1', sender: 'user', text: 'Great, thanks.', timestamp: '10:30 AM' },
];

import colors from 'lib/colors';

export const vertexTypes = {
  text: '1',
  quickReply: '2',
  libraryContent: '3',
  map: '4',
  data: '5',
  questionnaire: '6',
  textInput: '7',
  choices: '8',
  message: '9',
  appointment: '10',
  question: '11',
  action: '12',
  container: '13',
  multipleQuestion: '14',
  numericQuestion: '15',
  calculator: '16',
  scaleQuestion: '17',
  condition: '18',
  conditionChild: '19',
};

export const vertexTypesData = {
  [vertexTypes.text]: {
    color: colors.blue100,
    type: vertexTypes.text,
    text: 'Text',
    icon: 'text',
  },
  [vertexTypes.libraryContent]: {
    color: colors.blue100,
    type: vertexTypes.libraryContent,
    text: 'Library content',
    icon: 'photo-video',
  },
  [vertexTypes.map]: {
    color: colors.blue100,
    type: vertexTypes.map,
    text: 'Map',
    icon: 'map',
  },
  [vertexTypes.data]: {
    color: colors.blue100,
    type: vertexTypes.data,
    text: 'Data',
    icon: 'chart-line',
  },
  [vertexTypes.questionnaire]: {
    color: colors.blue100,
    type: vertexTypes.questionnaire,
    text: 'Questionnaire',
    icon: 'poll-h',
  },
  [vertexTypes.question]: {
    color: colors.blue100,
    type: vertexTypes.question,
    text: 'Question',
    icon: 'question',
  },
  [vertexTypes.container]: {
    color: colors.blue100,
    type: vertexTypes.container,
    text: 'Container',
    icon: 'project-diagram',
  },
  [vertexTypes.action]: {
    color: colors.blue100,
    type: vertexTypes.action,
    text: 'Action',
    icon: 'transporter',
  },

  [vertexTypes.quickReply]: {
    color: colors.green400,
    type: vertexTypes.quickReply,
    text: 'Quick reply',
    icon: 'reply-all',
  },
  [vertexTypes.textInput]: {
    color: colors.green400,
    type: vertexTypes.textInput,
    text: 'Text input',
    icon: 'i-cursor',
  },
  [vertexTypes.choices]: {
    color: colors.green400,
    type: vertexTypes.choices,
    text: 'Choices',
    icon: 'ballot-check',
  },

  [vertexTypes.message]: {
    color: colors.red100,
    type: vertexTypes.message,
    text: 'New message',
    icon: 'comments',
  },
  [vertexTypes.appointment]: {
    color: colors.red100,
    type: vertexTypes.appointment,
    text: 'Request appointment',
    icon: 'calendar-plus',
  },
  [vertexTypes.calculator]: {
    color: colors.blue100,
    type: vertexTypes.calculator,
    text: 'Calculator',
    icon: 'calculator',
  },
  [vertexTypes.condition]: {
    color: colors.blue100,
    type: vertexTypes.condition,
    text: 'Condition',
    icon: 'question',
  },
};

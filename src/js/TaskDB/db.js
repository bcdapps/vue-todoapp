const tasks= [
  {
    id: 'T1',
    color: '#F7C87A',
    title: 'Read',
    percent: '45%',
    weektasks:{
      monday:{
        status: 'pending',
        task: true,
        description: '',
      },
      tuesday:{
        status: 'complete',
        task: true,
        description: '',
      },
      wednesday:{
        status: 'complete',
        task: true,
        description: '',
      },
      thursday:{
        status: 'complete',
        task: true,
        description: '',
      },
      friday:{
        status: 'complete',
        task: true,
        description: '',
      },
      saturday:{
        status: '',
        task: false,
        description: '',
      },
      sunday:{
        status: 'complete',
        task: true,
        description: '',
      },
    }
  },
  {
    id: 'T2',
    color: '#979EF8',
    title: 'Workout',
    percent: '15%',
    weektasks: {
      monday: {
        status: 'complete',
        task: true,
        description: '',
      },
      tuesday: {
        status: 'complete',
        task: true,
        description: '',
      },
      wednesday: {
        status: 'pending',
        task: true,
        description: '',
      },
      thursday: {
        status: 'pending',
        task: true,
        description: '',
      },
      friday: {
        status: 'complete',
        task: true,
        description: '',
      },
      saturday: {
        status: 'complete',
        task: true,
        description: '',
      },
      sunday: {
        status: '',
        task: false,
        description: '',
      },
    },
  },
  {
    id: 'T3',
    color: '#8CE8F3',
    title: 'Meditate',
    percent: '69%',
    weektasks: {
      monday: {
        status: 'complete',
        task: true,
        description: '',
      },
      tuesday: {
        status: 'complete',
        task: true,
        description: '',
      },
      wednesday: {
        status: '',
        task: false,
        description: '',
      },
      thursday: {
        status: 'complete',
        task: true,
        description: '',
      },
      friday: {
        status: 'complete',
        task: true,
        description: '',
      },
      saturday: {
        status: '',
        task: false,
        description: '',
      },
      sunday: {
        status: 'complete',
        task: true,
        description: '',
      },
    }
  },
  {
    id: 'T4',
    color: '#E2A4AE',
    title: 'Journal',
    percent: '20%',
    weektasks: {
      monday: {
        status: 'complete',
        task: true,
        description: '',
      },
      tuesday: {
        status: 'complete',
        task: true,
        description: '',
      },
      wednesday: {
        status: 'complete',
        task: true,
        description: '',
      },
      thursday: {
        status: '',
        task: false,
        description: '',
      },
      friday: {
        status: 'complete',
        task: true,
        description: '',
      },
      saturday: {
        status: 'complete',
        task: true,
        description: '',
      },
      sunday: {
        status: 'pending',
        task: true,
        description: '',
      },
    }
  },
];

const goals = {
  week: '56%',
  month: '26%',
  year: '76%',
  allTime: '86%',
};
const colors = [
  {
    hex: '#000000',
    name: 'Black'
  },
  {
    hex: '#f7c87a',
    name: 'Light Orange'
  },
  {
    hex: '#F7941D',
    name: 'Orange'
  },
  {
    hex: '#979ef8',
    name: 'Light Purple'
  },
  {
    hex: '#8ce8f3',
    name: 'Light blue'
  },
  {
    hex: '#00759A',
    name: 'Blue'
  },
  {
    hex: '#e2a4ae',
    name: 'Pink'
  },
  {
    hex: '#A71930',
    name: 'Red'
  },
  {
    hex: '#679146',
    name: 'Green'
  }
];


export {
  tasks, goals,colors
}

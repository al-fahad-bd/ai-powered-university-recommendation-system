import { University, DegreeLevel } from './types';

export const FEATURED_UNIVERSITIES: University[] = [
  {
    id: '1',
    name: 'Massachusetts Institute of Technology (MIT)',
    location: 'Cambridge, USA',
    ranking: '#1 World',
    tuitionRange: '$57,000 / year',
    description: 'A global leader in engineering, computer science, and physical sciences innovation.',
    website: 'https://www.mit.edu',
    tags: ['Engineering', 'Tech', 'Research'],
    imageUrl: 'https://picsum.photos/id/1/400/250'
  },
  {
    id: '2',
    name: 'University of Oxford',
    location: 'Oxford, UK',
    ranking: '#3 World',
    tuitionRange: '£28,000 - £44,000 / year',
    description: 'The oldest university in the English-speaking world, renowned for humanities and sciences.',
    website: 'https://www.ox.ac.uk',
    tags: ['Humanities', 'Law', 'Medicine'],
    imageUrl: 'https://picsum.photos/id/1040/400/250'
  },
  {
    id: '3',
    name: 'Stanford University',
    location: 'Stanford, USA',
    ranking: '#5 World',
    tuitionRange: '$56,000 / year',
    description: 'Located in the heart of Silicon Valley, famous for its entrepreneurial spirit.',
    website: 'https://www.stanford.edu',
    tags: ['Business', 'CS', 'Innovation'],
    imageUrl: 'https://picsum.photos/id/1031/400/250'
  },
  {
    id: '4',
    name: 'ETH Zurich',
    location: 'Zurich, Switzerland',
    ranking: '#7 World',
    tuitionRange: 'CHF 1,500 / year',
    description: 'A cutting-edge STEM university with remarkably low tuition fees for international students.',
    website: 'https://ethz.ch',
    tags: ['STEM', 'Affordable', 'Europe'],
    imageUrl: 'https://picsum.photos/id/1015/400/250'
  },
  {
    id: '5',
    name: 'Harvard University',
    location: 'Cambridge, USA',
    ranking: '#4 World',
    tuitionRange: '$54,000 / year',
    description: 'The oldest institution of higher learning in the United States, known for excellence in all fields.',
    website: 'https://www.harvard.edu',
    tags: ['Ivy League', 'Law', 'Business'],
    imageUrl: 'https://picsum.photos/id/1047/400/250'
  },
  {
    id: '6',
    name: 'University of Cambridge',
    location: 'Cambridge, UK',
    ranking: '#2 World',
    tuitionRange: '£25,000 - £60,000 / year',
    description: 'A collegiate public research university known for its rigorous academic standards and history.',
    website: 'https://www.cam.ac.uk',
    tags: ['Science', 'History', 'Research'],
    imageUrl: 'https://picsum.photos/id/1033/400/250'
  },
  {
    id: '7',
    name: 'National University of Singapore (NUS)',
    location: 'Singapore',
    ranking: '#8 World',
    tuitionRange: 'SGD 30,000 / year',
    description: 'A leading global university centered in Asia, influencing the future.',
    website: 'https://www.nus.edu.sg',
    tags: ['Asia', 'Technology', 'Global'],
    imageUrl: 'https://picsum.photos/id/1039/400/250'
  },
  {
    id: '8',
    name: 'University of Toronto',
    location: 'Toronto, Canada',
    ranking: '#21 World',
    tuitionRange: 'CAD 60,000 / year',
    description: 'Canada’s top university, located in one of the world’s most diverse cities.',
    website: 'https://www.utoronto.ca',
    tags: ['Canada', 'Research', 'Urban'],
    imageUrl: 'https://picsum.photos/id/1035/400/250'
  }
];

export const COUNTRIES = [
  "USA", "UK", "Canada", "Australia", "Germany", "France", "Netherlands", "Sweden", "Japan", "Singapore"
];

export const DEGREE_LEVELS = [
  DegreeLevel.UNDERGRADUATE,
  DegreeLevel.MASTERS,
  DegreeLevel.PHD
];
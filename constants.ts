
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
    imageUrl: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=800'
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
    imageUrl: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?auto=format&fit=crop&q=80&w=800'
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
    imageUrl: 'https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&q=80&w=800'
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
    imageUrl: 'https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=800'
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
    imageUrl: 'https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=800'
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
    imageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=800'
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
    imageUrl: 'https://images.unsplash.com/photo-1558452331-a6405b617b0d?auto=format&fit=crop&q=80&w=800'
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
    imageUrl: 'https://images.unsplash.com/photo-1550411294-875307bccdd5?auto=format&fit=crop&q=80&w=800'
  }
];

export const TUITION_FREE_UNIVERSITIES: University[] = [
  {
    id: 'tf-1',
    name: 'Technical University of Munich (TUM)',
    location: 'Munich, Germany',
    ranking: '#28 World',
    tuitionRange: 'No Tuition Fees (Admin fee ~€150/sem)',
    description: 'Top-ranked German university specializing in Engineering and Technology. No tuition fees for most programs.',
    website: 'https://www.tum.de',
    tags: ['Germany', 'Free Tuition', 'Engineering'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tf-2',
    name: 'Ludwig Maximilian University of Munich',
    location: 'Munich, Germany',
    ranking: '#54 World',
    tuitionRange: 'No Tuition Fees',
    description: 'One of Germany\'s oldest and most prestigious universities, offering a wide range of programs for free.',
    website: 'https://www.lmu.de',
    tags: ['Germany', 'Research', 'Humanities'],
    imageUrl: 'https://images.unsplash.com/photo-1568283661623-690224d52b1b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tf-3',
    name: 'Heidelberg University',
    location: 'Heidelberg, Germany',
    ranking: '#87 World',
    tuitionRange: '€1,500 / semester (Non-EU)',
    description: 'Germany’s oldest university. While some fees exist for non-EU students, it remains highly affordable compared to US/UK.',
    website: 'https://www.uni-heidelberg.de',
    tags: ['Germany', 'Medicine', 'History'],
    imageUrl: 'https://images.unsplash.com/photo-1628109673977-8d07147db95f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tf-4',
    name: 'RWTH Aachen University',
    location: 'Aachen, Germany',
    ranking: '#99 World',
    tuitionRange: 'No Tuition Fees',
    description: 'The largest technical university in Germany, highly renowned for mechanical engineering.',
    website: 'https://www.rwth-aachen.de',
    tags: ['Germany', 'Tech', 'Engineering'],
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tf-5',
    name: 'Free University of Berlin',
    location: 'Berlin, Germany',
    ranking: '#98 World',
    tuitionRange: 'No Tuition Fees',
    description: 'Located in the capital, offering free education in a vibrant, international city.',
    website: 'https://www.fu-berlin.de',
    tags: ['Berlin', 'Political Science', 'Arts'],
    imageUrl: 'https://images.unsplash.com/photo-1560964645-5c9f131f4e17?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tf-6',
    name: 'Berea College',
    location: 'Kentucky, USA',
    ranking: '#30 US Liberal Arts',
    tuitionRange: 'No Tuition Promise',
    description: 'The only top-ranked college in the US that provides a no-tuition promise to every enrolled student.',
    website: 'https://www.berea.edu',
    tags: ['USA', 'Liberal Arts', 'Full Scholarship'],
    imageUrl: 'https://images.unsplash.com/photo-1581363220556-91739c323f49?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tf-7',
    name: 'Scuola Normale Superiore',
    location: 'Pisa, Italy',
    ranking: '#183 World',
    tuitionRange: 'Free + Stipend',
    description: 'An elite institution in Italy where students study for free and receive housing/board. Extremely competitive.',
    website: 'https://www.sns.it',
    tags: ['Italy', 'Elite', 'Science'],
    imageUrl: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tf-8',
    name: 'University of Vienna',
    location: 'Vienna, Austria',
    ranking: '#130 World',
    tuitionRange: '€726 / semester (Non-EU)',
    description: 'A historic university in the heart of Europe with very affordable tuition fees for international students.',
    website: 'https://www.univie.ac.at',
    tags: ['Austria', 'History', 'Culture'],
    imageUrl: 'https://images.unsplash.com/photo-1548695602-0e8c07e9973b?auto=format&fit=crop&q=80&w=800'
  }
];

// Generic high-quality academic images for AI recommendations
export const GENERIC_UNIVERSITY_IMAGES = [
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1592280771884-1d1b15151c71?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1621640786029-22ad5961d5db?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
];

export const COUNTRIES = [
  "USA", "UK", "Canada", "Australia", "Germany", "France", "Netherlands", "Sweden", "Japan", "Singapore",
  "New Zealand", "Ireland", "Switzerland", "South Korea", "Italy", "Spain", "China", "Finland", "Norway", "Denmark", 
  "Austria", "Belgium", "Malaysia"
].sort();

export const DEGREE_LEVELS = [
  DegreeLevel.UNDERGRADUATE,
  DegreeLevel.MASTERS,
  DegreeLevel.PHD
];

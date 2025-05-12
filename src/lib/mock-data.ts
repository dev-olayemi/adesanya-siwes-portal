
import { User } from "../store/auth-store";

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'student1',
    name: 'John Doe',
    email: 'student@aapoly.edu.ng',
    role: 'student',
    organizationId: 'org1',
    paymentStatus: 'verified',
    studentId: 'AAP/CS/19/0001',
  },
  {
    id: 'student2',
    name: 'Jane Smith',
    email: 'student2@aapoly.edu.ng',
    role: 'student',
    organizationId: 'org2',
    paymentStatus: 'pending',
    studentId: 'AAP/CS/19/0002',
  },
  {
    id: 'supervisor1',
    name: 'Dr. Ahmed Mohammed',
    email: 'supervisor@aapoly.edu.ng',
    role: 'supervisor',
  },
  {
    id: 'coordinator1',
    name: 'Prof. Elizabeth Adeyemi',
    email: 'coordinator@aapoly.edu.ng',
    role: 'coordinator',
  },
];

// Mock Organizations
export interface Organization {
  id: string;
  name: string;
  address: string;
  state: string;
  lga: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
}

export const mockOrganizations: Organization[] = [
  {
    id: 'org1',
    name: 'Tech Solutions Ltd',
    address: '123 Tech Lane, Lekki',
    state: 'Lagos',
    lga: 'Lekki',
    contactPerson: 'Ade Johnson',
    contactPhone: '08012345678',
    contactEmail: 'ade@techsolutions.com',
  },
  {
    id: 'org2',
    name: 'Global Systems Inc',
    address: '456 Global Road, Ikeja',
    state: 'Lagos',
    lga: 'Ikeja',
    contactPerson: 'Bisi Williams',
    contactPhone: '08098765432',
    contactEmail: 'bisi@globalsys.com',
  },
];

// Mock Reports
export interface Report {
  id: string;
  studentId: string;
  title: string;
  description: string;
  week: number;
  date: string;
  fileUrl?: string;
  status: 'pending' | 'reviewed';
  feedback?: string;
}

export const mockReports: Report[] = [
  {
    id: 'report1',
    studentId: 'student1',
    title: 'Introduction to the Company',
    description: 'This week I was introduced to the company structure and their main services.',
    week: 1,
    date: '2023-06-05',
    status: 'reviewed',
    feedback: 'Good first report. Keep it up!',
  },
  {
    id: 'report2',
    studentId: 'student1',
    title: 'Learning the Tech Stack',
    description: 'Started familiarizing myself with the company technology stack which includes React, Node.js and MongoDB.',
    week: 2,
    date: '2023-06-12',
    status: 'pending',
  },
  {
    id: 'report3',
    studentId: 'student2',
    title: 'First Week at Global Systems',
    description: 'Orientation and introduction to company values and policies.',
    week: 1,
    date: '2023-06-05',
    status: 'reviewed',
    feedback: 'More detail needed. Explain what specific activities you participated in.',
  },
];

// Mock Messages
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export const mockMessages: Message[] = [
  {
    id: 'message1',
    senderId: 'student1',
    receiverId: 'supervisor1',
    content: 'Hello Dr. Mohammed, I have a question about my week 2 report.',
    timestamp: '2023-06-15T10:30:00',
    read: true,
  },
  {
    id: 'message2',
    senderId: 'supervisor1',
    receiverId: 'student1',
    content: 'Hi John, what is your question?',
    timestamp: '2023-06-15T11:45:00',
    read: true,
  },
  {
    id: 'message3',
    senderId: 'student1',
    receiverId: 'supervisor1',
    content: 'Should I include the technical details of the projects I worked on?',
    timestamp: '2023-06-15T12:15:00',
    read: false,
  },
];

// Nigerian States and LGAs
export const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

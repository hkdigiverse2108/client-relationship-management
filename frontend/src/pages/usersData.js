export const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1 234 567 8900',
    role: 'Super Admin',
    status: 'Active',
    parent_id: null,
    avatar: null,
    designation: 'Support',
    gender: 'Male',
    dob: '10/01/2008',
    city: 'SK',
    state: 'Gujarat',
    country: 'India',
    bankName: 'HDFC Bank',
    accountHolder: 'smart trolley',
    accountNumber: '1238764569',
    ifscCode: '12345',
    panCard: 'ABCDE1234F',
    aadharNumber: '123456789012',
    permissions: {
      '/dashboard': { view: true, add: true, edit: true, delete: true },
      '/users': { view: true, add: true, edit: true, delete: true },
    }
  },
  {
    id: 2,
    name: 'John Manager',
    email: 'john.m@example.com',
    phone: '+1 234 567 8901',
    role: 'manager',
    status: 'Active',
    parent_id: 1,
    avatar: '/assets/img/profiles/avatar-02.jpg',
    permissions: {
      '/dashboard': { view: true, add: false, edit: false, delete: false },
      '/leads': { view: true, add: true, edit: true, delete: false },
    }
  },
  {
    id: 3,
    name: 'Sarah Sales',
    email: 'sarah.s@example.com',
    phone: '+1 234 567 8902',
    role: 'sales',
    status: 'Active',
    parent_id: 2,
    avatar: '/assets/img/profiles/avatar-03.jpg',
    permissions: {
      '/dashboard': { view: true, add: false, edit: false, delete: false },
      '/leads': { view: true, add: true, edit: false, delete: false },
    }
  },
  {
    id: 4,
    name: 'Mike HR',
    email: 'mike.h@example.com',
    phone: '+1 234 567 8903',
    role: 'HR',
    status: 'Inactive',
    parent_id: 1,
    avatar: '/assets/img/profiles/avatar-04.jpg',
    permissions: {
      '/dashboard': { view: true, add: false, edit: false, delete: false },
      '/employees': { view: true, add: true, edit: true, delete: false },
    }
  },
  {
    id: 5,
    name: 'Lisa Support',
    email: 'lisa.s@example.com',
    phone: '+1 234 567 8904',
    role: 'support',
    status: 'Active',
    parent_id: 2,
    avatar: '/assets/img/profiles/avatar-05.jpg',
    permissions: {
      '/dashboard': { view: true, add: false, edit: false, delete: false },
      '/tickets': { view: true, add: true, edit: true, delete: false },
    }
  }
];

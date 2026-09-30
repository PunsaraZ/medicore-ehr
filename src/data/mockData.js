export const ROLES = {
  DOCTOR: {
    id: 'doctor',
    name: 'Dr. Sarah Jenkins',
    title: 'Chief of Cardiology',
    department: 'Cardiology',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    badge: 'Physician',
    permissions: ['view_patients', 'edit_patients', 'add_patients', 'prescribe', 'order_labs', 'manage_appointments']
  },
  RECEPTIONIST: {
    id: 'receptionist',
    name: 'Alex Morgan',
    title: 'Senior Desk Coordinator',
    department: 'Front Desk & Admissions',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    badge: 'Front Desk',
    permissions: ['view_patients', 'add_patients', 'manage_appointments', 'view_billing']
  },
  ADMIN: {
    id: 'admin',
    name: 'Elena Rostova',
    title: 'EHR Systems Administrator',
    department: 'Hospital Administration',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    badge: 'Super Admin',
    permissions: ['view_patients', 'edit_patients', 'add_patients', 'delete_patients', 'prescribe', 'order_labs', 'manage_appointments', 'manage_billing', 'system_settings']
  }
};

export const INITIAL_DOCTORS = [
  {
    id: 'DOC-101',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Cardiology',
    degree: 'MD, FACC',
    experience: '14 years',
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    phone: '(555) 101-9000',
    email: 's.jenkins@medicore.org',
    room: 'Suite 302'
  },
  {
    id: 'DOC-102',
    name: 'Dr. Marcus Vance',
    specialty: 'Neurology',
    degree: 'MD, PhD',
    experience: '11 years',
    status: 'In Consultation',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    phone: '(555) 102-9001',
    email: 'm.vance@medicore.org',
    room: 'Suite 415'
  },
  {
    id: 'DOC-103',
    name: 'Dr. Emily Chen',
    specialty: 'Pediatrics',
    degree: 'MD, FAAP',
    experience: '8 years',
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&q=80&w=200',
    phone: '(555) 103-9002',
    email: 'e.chen@medicore.org',
    room: 'Suite 108'
  },
  {
    id: 'DOC-104',
    name: 'Dr. Robert Taylor',
    specialty: 'Orthopedics',
    degree: 'MD, FACS',
    experience: '16 years',
    status: 'In Surgery',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    phone: '(555) 104-9003',
    email: 'r.taylor@medicore.org',
    room: 'OR 2'
  },
  {
    id: 'DOC-105',
    name: 'Dr. Sophia Alvarez',
    specialty: 'Internal Medicine',
    degree: 'MD, FACP',
    experience: '9 years',
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=200',
    phone: '(555) 105-9004',
    email: 's.alvarez@medicore.org',
    room: 'Suite 204'
  },
  {
    id: 'DOC-106',
    name: 'Dr. James Wilson',
    specialty: 'General Surgery',
    degree: 'MD, FRCS',
    experience: '12 years',
    status: 'On Leave',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
    phone: '(555) 106-9005',
    email: 'j.wilson@medicore.org',
    room: 'Suite 501'
  }
];

export const INITIAL_PATIENTS = [
  {
    id: 'PAT-8021',
    name: 'Arthur Pendelton',
    age: 64,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '(555) 234-8901',
    email: 'arthur.p@medimail.org',
    diagnosis: 'Acute Myocardial Infarction',
    department: 'Cardiology',
    status: 'Admitted',
    room: 'Room 304-A',
    attendingDoctor: 'Dr. Sarah Jenkins',
    allergies: 'Penicillin, Shellfish',
    admissionDate: '2026-09-18',
    emergencyContact: 'Clara Pendelton (Wife - 555-901-2233)',
    vitals: {
      bp: '138/88 mmHg',
      heartRate: '82 bpm',
      spO2: '97%',
      temp: '98.6 °F',
      weight: '84 kg'
    },
    historyNotes: [
      { date: '2026-09-20', note: 'Patient reports mild chest discomfort alleviated by Nitroglycerin.', author: 'Dr. Sarah Jenkins' },
      { date: '2026-09-18', note: 'Admitted via Emergency Department with elevated Troponin levels. ST-elevation noted.', author: 'ER Resident' }
    ]
  },
  {
    id: 'PAT-8022',
    name: 'Beatrice Vance',
    age: 42,
    gender: 'Female',
    bloodGroup: 'A+',
    phone: '(555) 890-1234',
    email: 'b.vance@techcorp.io',
    diagnosis: 'Chronic Migraine & Cervical Spondylosis',
    department: 'Neurology',
    status: 'Outpatient',
    room: 'N/A',
    attendingDoctor: 'Dr. Marcus Vance',
    allergies: 'Sulfa Drugs',
    admissionDate: '2026-09-10',
    emergencyContact: 'David Vance (Husband - 555-890-4455)',
    vitals: {
      bp: '120/78 mmHg',
      heartRate: '74 bpm',
      spO2: '99%',
      temp: '98.4 °F',
      weight: '62 kg'
    },
    historyNotes: [
      { date: '2026-09-15', note: 'MRI Brain Scan showed no focal brain lesion. Initiated Topiramate prophylaxis.', author: 'Dr. Marcus Vance' }
    ]
  },
  {
    id: 'PAT-8023',
    name: 'Lucas Miller',
    age: 8,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '(555) 456-7890',
    email: 'sam.miller@family.net',
    diagnosis: 'Acute Asthma Exacerbation',
    department: 'Pediatrics',
    status: 'Admitted',
    room: 'Pediatrics ICU 12',
    attendingDoctor: 'Dr. Emily Chen',
    allergies: 'Peanuts, Dust Mites',
    admissionDate: '2026-09-21',
    emergencyContact: 'Samantha Miller (Mother - 555-456-9911)',
    vitals: {
      bp: '105/65 mmHg',
      heartRate: '102 bpm',
      spO2: '94%',
      temp: '99.1 °F',
      weight: '26 kg'
    },
    historyNotes: [
      { date: '2026-09-21', note: 'Admitted after wheezing episode. Nebulized with Albuterol + Ipratropium.', author: 'Dr. Emily Chen' }
    ]
  },
  {
    id: 'PAT-8024',
    name: 'Eleanor Vance-Reyes',
    age: 71,
    gender: 'Female',
    bloodGroup: 'AB-',
    phone: '(555) 678-9012',
    email: 'e.reyes@seniorliving.org',
    diagnosis: 'Osteoarthritis (Total Right Knee)',
    department: 'Orthopedics',
    status: 'Admitted',
    room: 'Post-Op 412',
    attendingDoctor: 'Dr. Robert Taylor',
    allergies: 'Codeine',
    admissionDate: '2026-09-19',
    emergencyContact: 'Carlos Reyes (Son - 555-678-3344)',
    vitals: {
      bp: '128/82 mmHg',
      heartRate: '68 bpm',
      spO2: '98%',
      temp: '98.2 °F',
      weight: '70 kg'
    },
    historyNotes: [
      { date: '2026-09-19', note: 'Right total knee replacement completed without complications. Physical therapy initiated.', author: 'Dr. Robert Taylor' }
    ]
  },
  {
    id: 'PAT-8025',
    name: 'David Thorne',
    age: 53,
    gender: 'Male',
    bloodGroup: 'O-',
    phone: '(555) 123-4567',
    email: 'dthorne@logistics.net',
    diagnosis: 'Type 2 Diabetes Mellitus',
    department: 'Internal Medicine',
    status: 'Outpatient',
    room: 'N/A',
    attendingDoctor: 'Dr. Sophia Alvarez',
    allergies: 'None Known',
    admissionDate: '2026-09-05',
    emergencyContact: 'Martha Thorne (Wife - 555-123-8822)',
    vitals: {
      bp: '132/84 mmHg',
      heartRate: '76 bpm',
      spO2: '98%',
      temp: '98.6 °F',
      weight: '91 kg'
    },
    historyNotes: [
      { date: '2026-09-12', note: 'HbA1c levels at 7.4%. Metformin dosage adjusted to 1000mg BID.', author: 'Dr. Sophia Alvarez' }
    ]
  },
  {
    id: 'PAT-8026',
    name: 'Sophia Martinez',
    age: 29,
    gender: 'Female',
    bloodGroup: 'B-',
    phone: '(555) 789-0123',
    email: 'sophia.m@creative.co',
    diagnosis: 'Acute Appendicitis',
    department: 'General Surgery',
    status: 'Admitted',
    room: 'ER Bed 04',
    attendingDoctor: 'Dr. James Wilson',
    allergies: 'Latex',
    admissionDate: '2026-09-22',
    emergencyContact: 'Juan Martinez (Brother - 555-789-5566)',
    vitals: {
      bp: '115/72 mmHg',
      heartRate: '90 bpm',
      spO2: '99%',
      temp: '100.4 °F',
      weight: '58 kg'
    },
    historyNotes: [
      { date: '2026-09-22', note: 'Right lower quadrant pain with rebound tenderness. Scheduled for emergency laparoscopic appendectomy.', author: 'Dr. James Wilson' }
    ]
  },
  {
    id: 'PAT-8027',
    name: 'Samuel K. Jackson',
    age: 58,
    gender: 'Male',
    bloodGroup: 'A-',
    phone: '(555) 345-6789',
    email: 's.jackson@university.edu',
    diagnosis: 'Coronary Artery Disease',
    department: 'Cardiology',
    status: 'Outpatient',
    room: 'N/A',
    attendingDoctor: 'Dr. Sarah Jenkins',
    allergies: 'Aspirin',
    admissionDate: '2026-09-14',
    emergencyContact: 'Nina Jackson (Daughter - 555-345-1122)',
    vitals: {
      bp: '142/90 mmHg',
      heartRate: '85 bpm',
      spO2: '96%',
      temp: '98.6 °F',
      weight: '88 kg'
    },
    historyNotes: [
      { date: '2026-09-14', note: 'Echocardiogram demonstrates LVEF 55%. Prescribed Clopidogrel and Atorvastatin.', author: 'Dr. Sarah Jenkins' }
    ]
  },
  {
    id: 'PAT-8028',
    name: 'Chloe Bennet',
    age: 35,
    gender: 'Female',
    bloodGroup: 'AB+',
    phone: '(555) 901-2345',
    email: 'chloe.b@designstudio.com',
    diagnosis: 'Vestibular Neuritis',
    department: 'Neurology',
    status: 'Outpatient',
    room: 'N/A',
    attendingDoctor: 'Dr. Marcus Vance',
    allergies: 'None',
    admissionDate: '2026-09-16',
    emergencyContact: 'Liam Bennet (Husband - 555-901-7788)',
    vitals: {
      bp: '118/76 mmHg',
      heartRate: '70 bpm',
      spO2: '99%',
      temp: '98.5 °F',
      weight: '59 kg'
    },
    historyNotes: [
      { date: '2026-09-16', note: 'Acute onset rotatory vertigo with horizontal nystagmus. Responding well to Meclizine.', author: 'Dr. Marcus Vance' }
    ]
  },
  {
    id: 'PAT-8029',
    name: 'Oliver Harrison',
    age: 12,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '(555) 567-8901',
    email: 'harrison.family@mail.com',
    diagnosis: 'Seasonal Allergic Rhinitis',
    department: 'Pediatrics',
    status: 'Discharged',
    room: 'N/A',
    attendingDoctor: 'Dr. Emily Chen',
    allergies: 'Amoxicillin',
    admissionDate: '2026-09-08',
    emergencyContact: 'Rachel Harrison (Mother - 555-567-2233)',
    vitals: {
      bp: '108/70 mmHg',
      heartRate: '80 bpm',
      spO2: '99%',
      temp: '98.6 °F',
      weight: '41 kg'
    },
    historyNotes: [
      { date: '2026-09-08', note: 'Outpatient follow-up. Symptoms managed with Cetirizine nasal spray.', author: 'Dr. Emily Chen' }
    ]
  },
  {
    id: 'PAT-8030',
    name: 'Margaret Sterling',
    age: 79,
    gender: 'Female',
    bloodGroup: 'A+',
    phone: '(555) 234-5678',
    email: 'm.sterling@estates.org',
    diagnosis: 'Congestive Heart Failure (Stage II)',
    department: 'Cardiology',
    status: 'Admitted',
    room: 'ICU Bed 02',
    attendingDoctor: 'Dr. Sarah Jenkins',
    allergies: 'Iodine Contrast',
    admissionDate: '2026-09-21',
    emergencyContact: 'Robert Sterling (Son - 555-234-9900)',
    vitals: {
      bp: '148/92 mmHg',
      heartRate: '88 bpm',
      spO2: '93%',
      temp: '98.8 °F',
      weight: '67 kg'
    },
    historyNotes: [
      { date: '2026-09-21', note: 'Admitted with bilateral pedal edema and orthopnea. IV Furosemide started.', author: 'Dr. Sarah Jenkins' }
    ]
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-901',
    patientId: 'PAT-8021',
    patientName: 'Arthur Pendelton',
    doctorId: 'DOC-101',
    doctorName: 'Dr. Sarah Jenkins',
    specialty: 'Cardiology',
    date: '2026-09-22',
    timeSlot: '09:00 AM',
    type: 'Emergency Triage',
    status: 'In Progress',
    notes: 'Post-MI evaluation & IV medication monitoring.'
  },
  {
    id: 'APT-902',
    patientId: 'PAT-8022',
    patientName: 'Beatrice Vance',
    doctorId: 'DOC-102',
    doctorName: 'Dr. Marcus Vance',
    specialty: 'Neurology',
    date: '2026-09-22',
    timeSlot: '10:30 AM',
    type: 'Follow-Up',
    status: 'Scheduled',
    notes: 'Review brain MRI results & migraine response.'
  },
  {
    id: 'APT-903',
    patientId: 'PAT-8023',
    patientName: 'Lucas Miller',
    doctorId: 'DOC-103',
    doctorName: 'Dr. Emily Chen',
    specialty: 'Pediatrics',
    date: '2026-09-22',
    timeSlot: '11:45 AM',
    type: 'In-Person Consultation',
    status: 'Scheduled',
    notes: 'Pediatric asthma check & lung auscultation.'
  },
  {
    id: 'APT-904',
    patientId: 'PAT-8025',
    patientName: 'David Thorne',
    doctorId: 'DOC-105',
    doctorName: 'Dr. Sophia Alvarez',
    specialty: 'Internal Medicine',
    date: '2026-09-22',
    timeSlot: '02:00 PM',
    type: 'Routine Checkup',
    status: 'Scheduled',
    notes: 'Quarterly HbA1c glucose monitoring.'
  },
  {
    id: 'APT-905',
    patientId: 'PAT-8026',
    patientName: 'Sophia Martinez',
    doctorId: 'DOC-106',
    doctorName: 'Dr. James Wilson',
    specialty: 'General Surgery',
    date: '2026-09-22',
    timeSlot: '03:30 PM',
    type: 'Emergency Triage',
    status: 'Scheduled',
    notes: 'Pre-op appendectomy evaluation.'
  },
  {
    id: 'APT-906',
    patientId: 'PAT-8027',
    patientName: 'Samuel K. Jackson',
    doctorId: 'DOC-101',
    doctorName: 'Dr. Sarah Jenkins',
    specialty: 'Cardiology',
    date: '2026-09-23',
    timeSlot: '09:30 AM',
    type: 'Follow-Up',
    status: 'Scheduled',
    notes: 'Stress test result review.'
  },
  {
    id: 'APT-907',
    patientId: 'PAT-8024',
    patientName: 'Eleanor Vance-Reyes',
    doctorId: 'DOC-104',
    doctorName: 'Dr. Robert Taylor',
    specialty: 'Orthopedics',
    date: '2026-09-23',
    timeSlot: '01:15 PM',
    type: 'Follow-Up',
    status: 'Scheduled',
    notes: 'Post-op knee joint mobility assessment.'
  },
  {
    id: 'APT-908',
    patientId: 'PAT-8028',
    patientName: 'Chloe Bennet',
    doctorId: 'DOC-102',
    doctorName: 'Dr. Marcus Vance',
    specialty: 'Neurology',
    date: '2026-09-21',
    timeSlot: '04:00 PM',
    type: 'Routine Checkup',
    status: 'Completed',
    notes: 'Vertigo symptoms improved following vestibular therapy.'
  }
];

export const INITIAL_PRESCRIPTIONS = [
  {
    id: 'RX-7701',
    patientId: 'PAT-8021',
    patientName: 'Arthur Pendelton',
    doctorName: 'Dr. Sarah Jenkins',
    medication: 'Atorvastatin 80mg',
    dosage: '1 tablet daily at bedtime',
    frequency: 'Once Daily',
    duration: '90 days',
    date: '2026-09-18',
    status: 'Active',
    refills: 3
  },
  {
    id: 'RX-7702',
    patientId: 'PAT-8021',
    patientName: 'Arthur Pendelton',
    doctorName: 'Dr. Sarah Jenkins',
    medication: 'Metoprolol Succinate ER 50mg',
    dosage: '1 tablet every morning',
    frequency: 'Once Daily',
    duration: '60 days',
    date: '2026-09-18',
    status: 'Active',
    refills: 2
  },
  {
    id: 'RX-7703',
    patientId: 'PAT-8023',
    patientName: 'Lucas Miller',
    doctorName: 'Dr. Emily Chen',
    medication: 'Albuterol HFA Inhaler 90mcg',
    dosage: '2 puffs every 4-6 hours as needed',
    frequency: 'PRN (As Needed)',
    duration: '30 days',
    date: '2026-09-21',
    status: 'Active',
    refills: 5
  },
  {
    id: 'RX-7704',
    patientId: 'PAT-8025',
    patientName: 'David Thorne',
    doctorName: 'Dr. Sophia Alvarez',
    medication: 'Metformin HCl 1000mg',
    dosage: '1 tablet twice daily with meals',
    frequency: 'Twice Daily',
    duration: '90 days',
    date: '2026-09-12',
    status: 'Active',
    refills: 4
  },
  {
    id: 'RX-7705',
    patientId: 'PAT-8027',
    patientName: 'Samuel K. Jackson',
    doctorName: 'Dr. Sarah Jenkins',
    medication: 'Clopidogrel 75mg',
    dosage: '1 tablet daily in the morning',
    frequency: 'Once Daily',
    duration: '180 days',
    date: '2026-09-14',
    status: 'Active',
    refills: 6
  }
];

export const INITIAL_LAB_REPORTS = [
  {
    id: 'LAB-501',
    patientId: 'PAT-8021',
    patientName: 'Arthur Pendelton',
    testName: 'High-Sensitivity Cardiac Troponin T',
    category: 'Cardiology',
    date: '2026-09-21',
    resultSummary: '0.45 ng/mL (Reference: < 0.014 ng/mL) - Elevated',
    flag: 'Critical',
    doctorName: 'Dr. Sarah Jenkins'
  },
  {
    id: 'LAB-502',
    patientId: 'PAT-8022',
    patientName: 'Beatrice Vance',
    testName: 'Contrast Brain & Spine MRI Scan',
    category: 'Radiology',
    date: '2026-09-15',
    resultSummary: 'No acute intracranial hemorrhage or focal brain mass.',
    flag: 'Normal',
    doctorName: 'Dr. Marcus Vance'
  },
  {
    id: 'LAB-503',
    patientId: 'PAT-8025',
    patientName: 'David Thorne',
    testName: 'Comprehensive Glycated Hemoglobin (HbA1c)',
    category: 'Endocrinology',
    date: '2026-09-12',
    resultSummary: '7.4% (Target: < 7.0%) - Slightly elevated',
    flag: 'Abnormal',
    doctorName: 'Dr. Sophia Alvarez'
  },
  {
    id: 'LAB-504',
    patientId: 'PAT-8026',
    patientName: 'Sophia Martinez',
    testName: 'Abdominal Ultrasound & Complete Blood Count (CBC)',
    category: 'Hematology',
    date: '2026-09-22',
    resultSummary: 'WBC 14,200 /mcL with neutrophilia. Appendix outer diameter 8.5mm.',
    flag: 'Critical',
    doctorName: 'Dr. James Wilson'
  },
  {
    id: 'LAB-505',
    patientId: 'PAT-8030',
    patientName: 'Margaret Sterling',
    testName: 'N-Terminal pro-BNP (NT-proBNP)',
    category: 'Cardiology',
    date: '2026-09-21',
    resultSummary: '2,850 pg/mL (Reference: < 450 pg/mL) - High risk CHF',
    flag: 'Critical',
    doctorName: 'Dr. Sarah Jenkins'
  }
];

export const INITIAL_BILLING = [
  {
    id: 'INV-4091',
    patientId: 'PAT-8021',
    patientName: 'Arthur Pendelton',
    date: '2026-09-21',
    dueDate: '2026-10-21',
    amount: 3450.00,
    status: 'Pending',
    breakdown: [
      { item: 'ICU Stay & Monitoring (3 days)', cost: 2100.00 },
      { item: 'Coronary Angiography Procedure', cost: 950.00 },
      { item: 'Cardiac Biomarker Lab Panel', cost: 400.00 }
    ]
  },
  {
    id: 'INV-4092',
    patientId: 'PAT-8024',
    patientName: 'Eleanor Vance-Reyes',
    date: '2026-09-19',
    dueDate: '2026-10-19',
    amount: 12800.00,
    status: 'Claimed',
    breakdown: [
      { item: 'Total Right Knee Arthroplasty', cost: 9500.00 },
      { item: 'Post-Op Physical Rehabilitation (2 sessions)', cost: 1800.00 },
      { item: 'Anesthesia & Surgical Suite Fee', cost: 1500.00 }
    ]
  },
  {
    id: 'INV-4093',
    patientId: 'PAT-8025',
    patientName: 'David Thorne',
    date: '2026-09-12',
    dueDate: '2026-09-26',
    amount: 280.00,
    status: 'Paid',
    breakdown: [
      { item: 'Internal Medicine Outpatient Consultation', cost: 180.00 },
      { item: 'HbA1c & Fasting Lipid Profile', cost: 100.00 }
    ]
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: 'ACT-1',
    timestamp: '10 mins ago',
    title: 'Emergency Admission',
    description: 'Sophia Martinez admitted to ER Bed 04 with suspected appendicitis.',
    type: 'alert',
    user: 'Dr. James Wilson'
  },
  {
    id: 'ACT-2',
    timestamp: '25 mins ago',
    title: 'Lab Report Uploaded',
    description: 'High-Sensitivity Troponin T report ready for Arthur Pendelton.',
    type: 'lab',
    user: 'Central Diagnostics'
  },
  {
    id: 'ACT-3',
    timestamp: '1 hour ago',
    title: 'Appointment Scheduled',
    description: 'Lucas Miller booked for Pediatric Consultation with Dr. Emily Chen.',
    type: 'appointment',
    user: 'Alex Morgan'
  },
  {
    id: 'ACT-4',
    timestamp: '2 hours ago',
    title: 'Digital Prescription Issued',
    description: 'Atorvastatin 80mg prescribed to Arthur Pendelton.',
    type: 'prescription',
    user: 'Dr. Sarah Jenkins'
  }
];

/* ==========================================================================
   MediCare Hospital Management System - Minimal Seed Sample Data
   ========================================================================== */

const SEED_DATA = {
  users: [
    {
      id: "USR001",
      name: "Administrator User",
      email: "admin@medicare.com",
      password: "admin123",
      role: "Administrator"
    },
    {
      id: "USR002",
      name: "Dr. Priya Nair",
      email: "doctor@medicare.com",
      password: "doctor123",
      role: "Doctor",
      doctorId: "DOC001"
    },
    {
      id: "USR003",
      name: "Ananya Sen",
      email: "reception@medicare.com",
      password: "reception123",
      role: "Receptionist"
    },
    {
      id: "USR004",
      name: "Rahul Sharma",
      email: "patient@medicare.com",
      password: "patient123",
      role: "Patient",
      patientId: "PAT001"
    }
  ],

  patients: [
    {
      id: "PAT001",
      name: "Rahul Sharma",
      dob: "1994-05-14",
      age: 32,
      gender: "Male",
      bloodGroup: "O+",
      phone: "9876543210",
      email: "rahul@example.com",
      address: "123 Indiranagar, Bangalore",
      emergencyContact: "Sunita Sharma",
      emergencyPhone: "9876543211",
      department: "Cardiology",
      medicalHistory: "Mild Hypertension.",
      allergies: "Penicillin",
      registeredDate: "2026-01-10"
    },
    {
      id: "PAT002",
      name: "Pooja Patel",
      dob: "1998-09-21",
      age: 27,
      gender: "Female",
      bloodGroup: "A+",
      phone: "9812345678",
      email: "pooja.p@example.com",
      address: "45 Koramangala, Bangalore",
      emergencyContact: "Ramesh Patel",
      emergencyPhone: "9812345679",
      department: "General Medicine",
      medicalHistory: "None.",
      allergies: "Dust",
      registeredDate: "2026-02-15"
    },
    {
      id: "PAT003",
      name: "Vikram Malhotra",
      dob: "1978-03-05",
      age: 48,
      gender: "Male",
      bloodGroup: "B+",
      phone: "9765432109",
      email: "vikram.m@example.com",
      address: "88 Whitefield, Bangalore",
      emergencyContact: "Meera Malhotra",
      emergencyPhone: "9765432110",
      department: "Neurology",
      medicalHistory: "Migraine history.",
      allergies: "None",
      registeredDate: "2026-03-01"
    }
  ],

  doctors: [
    {
      id: "DOC001",
      name: "Dr. Priya Nair",
      specialization: "Senior Cardiologist",
      department: "Cardiology",
      qualification: "MBBS, MD (Cardiology)",
      experience: "12 years",
      phone: "9876511111",
      email: "priya.nair@medicare.com",
      fee: 800,
      availableDays: "Mon, Wed, Fri",
      availableTime: "09:00 AM - 01:00 PM",
      status: "Active"
    },
    {
      id: "DOC002",
      name: "Dr. Amit Singhania",
      specialization: "Neurologist",
      department: "Neurology",
      qualification: "MBBS, DM (Neurology)",
      experience: "10 years",
      phone: "9876522222",
      email: "amit.singhania@medicare.com",
      fee: 900,
      availableDays: "Tue, Thu, Sat",
      availableTime: "10:00 AM - 02:00 PM",
      status: "Active"
    },
    {
      id: "DOC003",
      name: "Dr. Rajesh Iyer",
      specialization: "General Physician",
      department: "General Medicine",
      qualification: "MBBS, MD",
      experience: "8 years",
      phone: "9876544444",
      email: "rajesh.iyer@medicare.com",
      fee: 500,
      availableDays: "Mon to Sat",
      availableTime: "09:00 AM - 05:00 PM",
      status: "Active"
    }
  ],

  appointments: [
    {
      id: "APT001",
      patientId: "PAT001",
      patientName: "Rahul Sharma",
      doctorId: "DOC001",
      doctorName: "Dr. Priya Nair",
      department: "Cardiology",
      date: "2026-08-18",
      time: "10:00 AM",
      reason: "Routine Cardiac Check-up",
      status: "Confirmed",
      notes: "Blood pressure monitoring."
    },
    {
      id: "APT002",
      patientId: "PAT002",
      patientName: "Pooja Patel",
      doctorId: "DOC003",
      doctorName: "Dr. Rajesh Iyer",
      department: "General Medicine",
      date: "2026-08-18",
      time: "02:30 PM",
      reason: "General Consultation",
      status: "Pending",
      notes: "First visit."
    },
    {
      id: "APT003",
      patientId: "PAT003",
      patientName: "Vikram Malhotra",
      doctorId: "DOC002",
      doctorName: "Dr. Amit Singhania",
      department: "Neurology",
      date: "2026-08-17",
      time: "11:30 AM",
      reason: "Migraine Evaluation",
      status: "Completed",
      notes: "MRI normal."
    }
  ],

  departments: [
    {
      id: "DEP001",
      name: "Cardiology",
      headDoctor: "Dr. Priya Nair",
      doctorCount: 3,
      patientCount: 45,
      contact: "+91 80 4111 2001",
      status: "Active"
    },
    {
      id: "DEP002",
      name: "Neurology",
      headDoctor: "Dr. Amit Singhania",
      doctorCount: 2,
      patientCount: 30,
      contact: "+91 80 4111 2002",
      status: "Active"
    },
    {
      id: "DEP003",
      name: "General Medicine",
      headDoctor: "Dr. Rajesh Iyer",
      doctorCount: 4,
      patientCount: 80,
      contact: "+91 80 4111 2003",
      status: "Active"
    },
    {
      id: "DEP004",
      name: "Orthopedics",
      headDoctor: "Dr. Sunita Rao",
      doctorCount: 2,
      patientCount: 25,
      contact: "+91 80 4111 2004",
      status: "Active"
    }
  ],

  medicalRecords: [
    {
      id: "REC001",
      patientId: "PAT001",
      patientName: "Rahul Sharma",
      doctorId: "DOC001",
      doctorName: "Dr. Priya Nair",
      visitDate: "2026-08-18",
      symptoms: "Mild exertional dyspnea.",
      diagnosis: "Stage 1 Essential Hypertension",
      treatment: "Low sodium diet, regular exercise, antihypertensive medication.",
      doctorNotes: "ECG normal sinus rhythm.",
      followUpDate: "2026-09-18"
    },
    {
      id: "REC002",
      patientId: "PAT003",
      patientName: "Vikram Malhotra",
      doctorId: "DOC002",
      doctorName: "Dr. Amit Singhania",
      visitDate: "2026-08-17",
      symptoms: "Throbbing headache.",
      diagnosis: "Migraine without Aura",
      treatment: "Propranolol 40mg once daily.",
      doctorNotes: "Keep headache diary.",
      followUpDate: "2026-09-17"
    }
  ],

  prescriptions: [
    {
      id: "PRE001",
      patientId: "PAT001",
      patientName: "Rahul Sharma",
      doctorId: "DOC001",
      doctorName: "Dr. Priya Nair",
      date: "2026-08-18",
      medicines: [
        { name: "Telmisartan", dosage: "40 mg", frequency: "Once daily (Morning)", duration: "30 days", instructions: "After breakfast" },
        { name: "Aspirin", dosage: "75 mg", frequency: "Once daily (Night)", duration: "30 days", instructions: "After dinner" }
      ]
    },
    {
      id: "PRE002",
      patientId: "PAT003",
      patientName: "Vikram Malhotra",
      doctorId: "DOC002",
      doctorName: "Dr. Amit Singhania",
      date: "2026-08-17",
      medicines: [
        { name: "Naproxen", dosage: "500 mg", frequency: "Twice daily (PRN)", duration: "5 days", instructions: "With food" }
      ]
    }
  ],

  bills: [
    {
      id: "BILL001",
      patientId: "PAT001",
      patientName: "Rahul Sharma",
      date: "2026-08-18",
      consultationFee: 800,
      labCharges: 1200,
      medicineCharges: 450,
      roomCharges: 0,
      otherCharges: 150,
      tax: 130,
      discount: 100,
      total: 2630,
      paymentStatus: "Paid",
      paymentMethod: "Credit Card"
    },
    {
      id: "BILL002",
      patientId: "PAT003",
      patientName: "Vikram Malhotra",
      date: "2026-08-17",
      consultationFee: 900,
      labCharges: 1500,
      medicineCharges: 300,
      roomCharges: 0,
      otherCharges: 0,
      tax: 135,
      discount: 100,
      total: 2735,
      paymentStatus: "Pending",
      paymentMethod: "Cash"
    }
  ],

  staff: [
    {
      id: "STF001",
      name: "Sujata Roy",
      role: "Nurse",
      department: "Cardiology",
      phone: "9876000001",
      email: "sujata.roy@medicare.com",
      joiningDate: "2022-03-15",
      shift: "Morning (07:00 AM - 03:00 PM)",
      status: "Active"
    },
    {
      id: "STF002",
      name: "Ananya Sen",
      role: "Receptionist",
      department: "Administration",
      phone: "9876000002",
      email: "ananya.sen@medicare.com",
      joiningDate: "2023-01-10",
      shift: "General (09:00 AM - 05:00 PM)",
      status: "Active"
    },
    {
      id: "STF003",
      name: "Ramesh Babu",
      role: "Lab Technician",
      department: "Pathology",
      phone: "9876000003",
      email: "ramesh.b@medicare.com",
      joiningDate: "2021-06-01",
      shift: "Morning (07:00 AM - 03:00 PM)",
      status: "Active"
    }
  ],

  notifications: [
    {
      id: "NOT001",
      title: "New Appointment Booked",
      message: "Rahul Sharma scheduled an appointment with Dr. Priya Nair.",
      timestamp: "2026-08-18T08:30:00",
      read: false,
      type: "appointment"
    },
    {
      id: "NOT002",
      title: "System Update",
      message: "MediCare HMS initialized with minimal clean seed dataset.",
      timestamp: "2026-08-18T07:00:00",
      read: false,
      type: "system"
    }
  ]
};

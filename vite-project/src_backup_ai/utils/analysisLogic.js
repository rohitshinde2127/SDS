export const analyzeSymptomsLocal = (text) => {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('chest pain') || lowerText.includes('heart') || lowerText.includes('cardiac') || lowerText.includes('breathless')) {
    return {
      condition: 'Potential Cardiac Issue',
      severity: 'High',
      suggestedMedicine: 'Aspirin (if advised by emergency services) / Seek emergency care',
      doctorType: 'Cardiologist',
      advice: [
        'Please visit a hospital or call emergency services immediately.',
        'Do not engage in physical activity and remain calm.'
      ]
    };
  }

  if (lowerText.includes('fever') && (lowerText.includes('cough') || lowerText.includes('cold') || lowerText.includes('throat'))) {
    return {
      condition: 'Viral Infection / Flu',
      severity: 'Moderate',
      suggestedMedicine: 'Paracetamol / Ibuprofen (for fever and body ache)',
      doctorType: 'General Physician',
      advice: [
        'Rest, stay hydrated, and monitor temperature regularly.',
        'Consult a physician if high fever persists beyond 3 days.'
      ]
    };
  }

  if (lowerText.includes('headache') && (lowerText.includes('vision') || lowerText.includes('migraine') || lowerText.includes('nausea'))) {
    return {
      condition: 'Migraine with Aura',
      severity: 'Moderate',
      suggestedMedicine: 'Pain relievers / Triptans (if prescribed)',
      doctorType: 'Neurologist',
      advice: [
        'Rest in a quiet, dark room and avoid screen time.',
        'Apply a cold compress to your forehead or temples.'
      ]
    };
  }

  if (lowerText.includes('stomach') || lowerText.includes('abdominal') || lowerText.includes('nausea') || lowerText.includes('vomit') || lowerText.includes('diarrhea')) {
    return {
      condition: 'Gastritis / Gastroenteritis',
      severity: 'Low',
      suggestedMedicine: 'Antacids / ORS (Oral Rehydration Salts)',
      doctorType: 'Gastroenterologist',
      advice: [
        'Avoid spicy, oily, and heavy foods. Stick to a bland diet (BRAT).',
        'Drink plenty of fluids in small, frequent sips.'
      ]
    };
  }

  if (lowerText.includes('skin') || lowerText.includes('rash') || lowerText.includes('itch') || lowerText.includes('redness') || lowerText.includes('allergy')) {
    return {
      condition: 'Dermatitis / Allergic Rash',
      severity: 'Low',
      suggestedMedicine: 'Antihistamines / Calamine lotion',
      doctorType: 'Dermatologist',
      advice: [
        'Avoid scratching the affected area to prevent secondary infection.',
        'Keep the skin clean and cool, and avoid harsh soaps.'
      ]
    };
  }

  if (lowerText.includes('tooth') || lowerText.includes('gum') || lowerText.includes('mouth')) {
    return {
      condition: 'Dental Inflammation / Cavity',
      severity: 'Moderate',
      suggestedMedicine: 'Pain relievers / Warm saline rinses',
      doctorType: 'Dentist',
      advice: [
        'Rinse your mouth with warm salt water 3-4 times a day.',
        'Avoid extremely hot, cold, or sugary foods and beverages.'
      ]
    };
  }

  // Default fallback
  return {
    condition: 'General Symptoms',
    severity: 'Low',
    suggestedMedicine: 'Over-the-counter multivitamin / Rest',
    doctorType: 'General Physician',
    advice: [
      'Monitor your symptoms closely for the next 24-48 hours.',
      'Maintain a healthy diet, stay hydrated, and ensure adequate sleep.'
    ]
  };
};

export const parseAIResponse = (text) => {
  const result = {
    condition: "General Symptoms",
    severity: "Low",
    suggestedMedicine: "Consult a healthcare professional",
    doctorType: "General Physician",
    advice: ["Monitor your symptoms.", "Maintain a healthy diet and sleep schedule."]
  };

  if (!text) return result;

  const lines = text.split("\n");
  let currentKey = "";
  let adviceLines = [];

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase().startsWith("condition:")) {
      result.condition = trimmed.replace(/condition:/i, "").trim();
      currentKey = "condition";
    } else if (trimmed.toLowerCase().startsWith("severity:")) {
      const sev = trimmed.replace(/severity:/i, "").trim();
      // Normalize severity
      if (sev.toLowerCase().includes("high")) result.severity = "High";
      else if (sev.toLowerCase().includes("moderate") || sev.toLowerCase().includes("medium")) result.severity = "Moderate";
      else result.severity = "Low";
      currentKey = "severity";
    } else if (trimmed.toLowerCase().startsWith("suggested medicine:")) {
      result.suggestedMedicine = trimmed.replace(/suggested medicine:/i, "").trim();
      currentKey = "suggestedMedicine";
    } else if (trimmed.toLowerCase().startsWith("doctor type:")) {
      result.doctorType = trimmed.replace(/doctor type:/i, "").trim();
      currentKey = "doctorType";
    } else if (trimmed.toLowerCase().startsWith("advice:")) {
      const adv = trimmed.replace(/advice:/i, "").trim();
      if (adv) adviceLines.push(adv);
      currentKey = "advice";
    } else {
      // Continuation lines
      if (currentKey === "advice") {
        if (!trimmed.includes(":")) {
          adviceLines.push(trimmed);
        }
      }
    }
  });

  if (adviceLines.length > 0) {
    result.advice = adviceLines.map(a => a.replace(/^[-*•\d.\s]+/, "").trim());
  }

  return result;
};

// Doctors Database mock for client side mapping
export const doctorsDB = [
  {
    id: "doc-1",
    name: "Dr. Amit Sharma",
    specialization: "General Physician",
    experience: "10 Years",
    rating: 4.8,
    reviews: 124,
    availability: "Available Today",
    avatarColor: "from-blue-400 to-indigo-600",
    fee: "₹500"
  },
  {
    id: "doc-2",
    name: "Dr. Priya Verma",
    specialization: "Cardiologist",
    experience: "8 Years",
    rating: 4.9,
    reviews: 98,
    availability: "Available Tomorrow",
    avatarColor: "from-rose-400 to-red-600",
    fee: "₹1000"
  },
  {
    id: "doc-3",
    name: "Dr. Rahul Mehta",
    specialization: "Dermatologist",
    experience: "6 Years",
    rating: 4.7,
    reviews: 86,
    availability: "Available Today",
    avatarColor: "from-teal-400 to-emerald-600",
    fee: "₹700"
  },
  {
    id: "doc-4",
    name: "Dr. Sahil Kamble",
    specialization: "Neurologist",
    experience: "8 Years",
    rating: 4.8,
    reviews: 74,
    availability: "Available Today",
    avatarColor: "from-purple-400 to-indigo-800",
    fee: "₹900"
  }
];

export const getRecommendedDoctor = (specialistType) => {
  if (!specialistType) return doctorsDB[0];
  
  const type = specialistType.toLowerCase();
  
  const found = doctorsDB.find(doc => 
    doc.specialization.toLowerCase().includes(type) || 
    type.includes(doc.specialization.toLowerCase())
  );
  
  return found || doctorsDB[0]; // Fallback to General Physician
};

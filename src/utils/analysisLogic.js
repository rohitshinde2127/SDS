export const analyzeSymptoms = (text) => {
    const lowerText = text.toLowerCase();

    // Rule-based logic (Demo purpose only)
    if (lowerText.includes('chest pain') || lowerText.includes('heart')) {
        return {
            condition: 'Potential Cardiac Issue',
            severity: 'High',
            guidance: 'Please visit a hospital immediately. Do not ignore chest pain.',
            specialist: 'Cardiologist'
        };
    }

    if (lowerText.includes('fever') && (lowerText.includes('cough') || lowerText.includes('cold'))) {
        return {
            condition: 'Viral Infection / Flu',
            severity: 'Medium',
            guidance: 'Rest, stay hydrated, and monitor temperature. Consult a doctor if fever persists.',
            specialist: 'General Physician'
        };
    }

    if (lowerText.includes('headache') && lowerText.includes('vision')) {
        return {
            condition: 'Migraine with Aura',
            severity: 'Medium',
            guidance: 'Rest in a dark room. Avoid screens.',
            specialist: 'Neurologist'
        };
    }

    if (lowerText.includes('stomach') || lowerText.includes('abdominal') || lowerText.includes('nausea')) {
        return {
            condition: 'Gastritis / Indigestion',
            severity: 'Low',
            guidance: 'Avoid spicy food. Drink water. Take antacids if needed.',
            specialist: 'Gastroenterologist'
        };
    }

    if (lowerText.includes('skin') || lowerText.includes('rash') || lowerText.includes('itch')) {
        return {
            condition: 'Dermatitis / Allergy',
            severity: 'Low',
            guidance: 'Avoid scratching. Apply soothing lotion.',
            specialist: 'Dermatologist'
        };
    }

    if (lowerText.includes('tooth') || lowerText.includes('gum')) {
        return {
            condition: 'Dental Issue',
            severity: 'Medium',
            guidance: 'Rinse with warm salt water.',
            specialist: 'Dentist'
        };
    }

    // Default fallback
    return {
        condition: 'General Symptoms',
        severity: 'Low',
        guidance: 'Monitor your symptoms. Maintain a healthy diet and sleep schedule.',
        specialist: 'General Physician'
    };
};

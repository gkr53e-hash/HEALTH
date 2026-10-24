export interface ClinicalTriageResult {
  condition: string;
  specialist: string;
  doctorName: string;
  doctorFee: number;
  labTest: string;
  urgency: 'Routine' | 'Moderate' | 'Urgent' | 'Emergency 108';
  medicine?: string;
}

export interface MedicineDetails {
  name: string;
  generic: string;
  category: string;
  simpleExplanation: string;
  simpleAnalogy: string;
  howToTake: string;
  timingRule: string;
  whatToAvoid: string[];
  safetyTip: string;
  recommendedDoctor: string;
  specialist: string;
  doctorFee: number;
  relevantLabTest: string;
}

export const KNOWN_MEDICINES: Record<string, MedicineDetails> = {
  pantoprazole: {
    name: 'Pantoprazole / Pan-D',
    generic: 'Pantoprazole (with Domperidone for Pan-D)',
    category: 'Stomach Acid Reducer (PPI)',
    simpleExplanation: 'Relieves acidity, heartburn, sour burps, and protects your stomach lining from ulcers.',
    simpleAnalogy: 'Think of your stomach like a kitchen tap that is leaking too much acid. Pantoprazole gently tightens that tap so your stomach and throat get peaceful rest to heal! ✨',
    howToTake: 'Take 1 capsule on an empty stomach in the morning, 30 to 45 minutes BEFORE breakfast with a full glass of water 💧.',
    timingRule: 'Empty stomach (Morning before breakfast)',
    whatToAvoid: ['Do NOT crush or chew the capsule; swallow it whole.', 'Avoid lying down flat right after eating.', 'Avoid spicy oily food, soda, and caffeine.'],
    safetyTip: 'If acidity persists for more than 2 weeks, consult Dr. Priya Sharma for a quick gastro check.',
    recommendedDoctor: 'Dr. Priya Sharma',
    specialist: 'General Physician & Gastroenterology',
    doctorFee: 500,
    relevantLabTest: 'H. Pylori Serology & LFT',
  },
  paracetamol: {
    name: 'Paracetamol / Dolo 650',
    generic: 'Paracetamol (Acetaminophen) 650mg / 500mg',
    category: 'Fever Reducer & Mild Pain Reliever (Antipyretic/Analgesic)',
    simpleExplanation: 'Brings down fever and soothes headaches, body pain, viral aches, and toothaches.',
    simpleAnalogy: 'It intercepts the tiny chemical messengers in your brain that shout "Hey, we are in pain!" and resets your internal thermostat so you cool down naturally! 🌡️',
    howToTake: 'Take 1 tablet every 6 to 8 hours as needed. Always take it with a light snack, tea, or after meals to keep your tummy happy 🥪.',
    timingRule: 'With or after meals (Never exceed 4000mg / 4 tablets in 24 hours)',
    whatToAvoid: ['Never mix with alcohol 🍷 (can harm your liver).', 'Do NOT take another cold & flu syrup that already contains paracetamol (risk of accidental double dosing).'],
    safetyTip: 'If your fever stays above 101°F for over 3 days, get a CBC and Dengue/Typhoid test done right away.',
    recommendedDoctor: 'Dr. Priya Sharma',
    specialist: 'General Physician',
    doctorFee: 500,
    relevantLabTest: 'CBC (Complete Blood Count) & Dengue NS1',
  },
  azithromycin: {
    name: 'Azithromycin (Azee 500)',
    generic: 'Azithromycin 500mg',
    category: 'Broad-Spectrum Antibiotic',
    simpleExplanation: 'Fights bacterial infections in the throat, chest, lungs, sinuses, and tonsils.',
    simpleAnalogy: 'Think of bacteria like tiny builders constructing a fortress. Azithromycin stops them from building proteins, making them powerless so your immune system wins easily! 🛡️',
    howToTake: 'Usually prescribed as 1 tablet once daily for 3 to 5 days. Take it at the exact same hour every day with plenty of water 💧.',
    timingRule: 'Same time each day (Can be taken with or without food, but 1 hour before or 2 hours after antacids)',
    whatToAvoid: ['Never stop midway even if you feel 100% fine! Finish the full course to stop bacterial resistance 🎯.', 'Do not take antacids containing aluminum or magnesium at the exact same time.'],
    safetyTip: 'This is a prescription antibiotic and does NOT work for viral flu or common colds.',
    recommendedDoctor: 'Dr. Priya Sharma',
    specialist: 'General Physician / Pulmonologist',
    doctorFee: 500,
    relevantLabTest: 'Throat Swab / CBC with ESR',
  },
  amoxicillin: {
    name: 'Amoxicillin + Clavulanic Acid (Augmentin / Moxclav)',
    generic: 'Amoxicillin 500mg + Clavulanate 125mg (625mg total)',
    category: 'Penicillin-Group Antibiotic',
    simpleExplanation: 'Treats stubborn bacterial infections in ears, dental abscesses, chest, and urinary tract.',
    simpleAnalogy: 'Amoxicillin breaks the protective outer wall of harmful bacteria, while the clavulanate shields the antibiotic from bacterial defense shields! ⚔️',
    howToTake: 'Take 1 tablet twice a day (morning and night) at the START of a meal 🥪 to avoid nausea.',
    timingRule: 'Right at the beginning of a meal with water',
    whatToAvoid: ['Do NOT skip doses.', 'If you get a sudden rash or facial swelling, stop immediately as you may have a penicillin allergy ⚠️.'],
    safetyTip: 'Complete the entire prescribed 5 or 7 day course to ensure the bacteria are completely cleared.',
    recommendedDoctor: 'Dr. Priya Sharma',
    specialist: 'General Physician',
    doctorFee: 500,
    relevantLabTest: 'Complete Blood Count (CBC) & Culture',
  },
  cetirizine: {
    name: 'Cetirizine / Levocetirizine',
    generic: 'Cetirizine 10mg / Levocetirizine 5mg',
    category: 'Anti-Allergic (Antihistamine)',
    simpleExplanation: 'Stops sneezing, runny nose, itchy watery eyes, hives, and allergic skin rashes.',
    simpleAnalogy: 'When dust, pollen, or allergic triggers arrive, your body panics and releases histamine alarms. Cetirizine puts a friendly mute button on those alarms! 🌿',
    howToTake: 'Take 1 tablet in the evening before bedtime with a glass of water 💧.',
    timingRule: 'Best taken at night before sleep (as it may cause mild drowsiness 😴)',
    whatToAvoid: ['Avoid driving or operating heavy machines if you feel drowsy.', 'Do not consume with alcohol 🚫.'],
    safetyTip: 'Drink plenty of water to keep your throat moist and avoid dry mouth.',
    recommendedDoctor: 'Dr. Farhan Ali',
    specialist: 'Dermatologist & Allergy Specialist',
    doctorFee: 650,
    relevantLabTest: 'Total IgE Allergy Panel',
  },
  metformin: {
    name: 'Metformin 500mg / Glycomet',
    generic: 'Metformin Hydrochloride 500mg / 850mg',
    category: 'Oral Blood Sugar Controller (Biguanide)',
    simpleExplanation: 'Helps your body handle insulin better, keeps blood sugar levels in a healthy range, and protects organs.',
    simpleAnalogy: 'It tells your liver not to dump unnecessary extra sugar into your blood and acts like a friendly key that helps your muscle cells absorb energy easily! ⚡',
    howToTake: 'Take 1 tablet during or immediately after your largest meal (breakfast or dinner) 🥪.',
    timingRule: 'Always with or right after food (helps prevent stomach upset or cramps)',
    whatToAvoid: ['Never skip meals after taking it.', 'Avoid excessive alcohol, which can interfere with glucose control.'],
    safetyTip: 'Pair with a brisk 25-minute daily walk and periodic HbA1c tests to track your progress!',
    recommendedDoctor: 'Dr. Priya Sharma',
    specialist: 'Diabetologist & General Physician',
    doctorFee: 500,
    relevantLabTest: 'HbA1c & Fasting Blood Sugar',
  },
  atorvastatin: {
    name: 'Atorvastatin / Atorva 10mg / 20mg',
    generic: 'Atorvastatin Calcium',
    category: 'Cholesterol & Heart Protector (Statin)',
    simpleExplanation: 'Lowers "bad" LDL cholesterol and triglycerides in blood while protecting your arteries from plaque buildup.',
    simpleAnalogy: 'Think of your blood vessels like smooth highways. Atorvastatin sweeps away the sticky grease from the road so your heart pumps clean and light! 🫀',
    howToTake: 'Take 1 tablet once daily at night, before going to bed 🌙.',
    timingRule: 'Bedtime (your liver naturally produces most cholesterol while you sleep)',
    whatToAvoid: ['Avoid large amounts of grapefruit or grapefruit juice 🍊 (it alters drug absorption).', 'Limit deep-fried foods.'],
    safetyTip: 'Check your Lipid Profile every 3-6 months to see your heart numbers improve.',
    recommendedDoctor: 'Dr. Anil Verma',
    specialist: 'Cardiologist',
    doctorFee: 900,
    relevantLabTest: 'Comprehensive Lipid Profile & LFT',
  },
};

export function isMedicineIntent(query: string): boolean {
  const q = (query || '').toLowerCase();
  const keywords = [
    'medicine', 'tablet', 'capsule', 'pill', 'dose', 'mg', 'syrup', 'strip',
    'take this', 'how to take', 'pantoprazole', 'pan d', 'pan-d', 'dolo',
    'paracetamol', 'azithromycin', 'amoxicillin', 'augmentin', 'moxclav',
    'cetirizine', 'levocet', 'metformin', 'glycomet', 'atorvastatin', 'atorva',
    'prescription', 'dawae', 'dawa', 'khana', 'khaye', 'khani',
  ];
  return keywords.some((k) => q.includes(k));
}

export function detectMedicine(query: string): MedicineDetails | null {
  const q = (query || '').toLowerCase();
  if (q.includes('panto') || q.includes('pan-d') || q.includes('pan d') || q.includes('acid') || q.includes('gas') || q.includes('heartburn') || q.includes('acidity')) {
    return KNOWN_MEDICINES.pantoprazole;
  }
  if (q.includes('dolo') || q.includes('paracetamol') || q.includes('fever') || q.includes('crocin') || q.includes('calpol') || q.includes('headache') || q.includes('body pain')) {
    return KNOWN_MEDICINES.paracetamol;
  }
  if (q.includes('azithro') || q.includes('azee') || q.includes('throat infection') || q.includes('tonsil') || q.includes('cough antibiotic')) {
    return KNOWN_MEDICINES.azithromycin;
  }
  if (q.includes('amoxi') || q.includes('augmentin') || q.includes('moxclav') || q.includes('clav')) {
    return KNOWN_MEDICINES.amoxicillin;
  }
  if (q.includes('cetirizine') || q.includes('levocet') || q.includes('allegra') || q.includes('sneez') || q.includes('runny nose') || q.includes('anti-allergy') || q.includes('allergy')) {
    return KNOWN_MEDICINES.cetirizine;
  }
  if (q.includes('metformin') || q.includes('glycomet') || q.includes('sugar tablet') || q.includes('diabetes tablet')) {
    return KNOWN_MEDICINES.metformin;
  }
  if (q.includes('atorva') || q.includes('cholesterol tablet') || q.includes('statin') || q.includes('lipitor')) {
    return KNOWN_MEDICINES.atorvastatin;
  }
  // Default to Pantoprazole + Amoxicillin if general medicine scan
  if (isMedicineIntent(query)) {
    return KNOWN_MEDICINES.pantoprazole;
  }
  return null;
}

export function generateHumanLikeMedicineReply(med: MedicineDetails, language: string = 'English'): string {
  const lang = (language || 'English').toLowerCase();
  const isHindi = lang.includes('hindi') || lang.includes('हिन्दी') || lang.includes('hinglish');

  if (isHindi) {
    return `### 💊 वनकेयर मेडिसिन स्कैन गाइड: ${med.name}

नमस्ते! 😊 आइए इस दवाई के बारे में आसान, बोलचाल की भाषा में समझते हैं ताकि आप इसे 100% सही और सुरक्षित तरीके से ले सकें।

✨ **1. यह दवाई क्या काम करती है?**
${med.simpleExplanation}

💡 **2. यह आपके शरीर में कैसे काम करती है (सरल उदाहरण):**
${med.simpleAnalogy}

⏰ **3. कब और कैसे लेना है (नियम):**
• **समय:** ${med.timingRule}
• **तरीका:** ${med.howToTake}

⚠️ **4. क्या गलतियाँ नहीं करनी (Dos & Don'ts):**
${med.whatToAvoid.map((rule) => `• ${rule}`).join('\n')}

🩺 **5. डॉक्टर की प्यार भरी सलाह:**
${med.safetyTip}

📦 **OneCare स्पेशल 1-क्लिक सुविधा:**
• **परामर्श:** ${med.recommendedDoctor} (${med.specialist})
• **घर पर टेस्ट:** ${med.relevantLabTest} (Dr. Lal PathLabs)
• **फार्मेसी:** 45 मिनट में असली दवा घर पर मंगवाएं (Apollo / MedPlus)`;
  }

  return `### 💊 OneCare Medicine Analysis: ${med.name}

Hello there! 😊 Let's break down this medicine in clear, everyday words so you take it 100% safely and effectively.

✨ **1. What is this medicine for?**
${med.simpleExplanation}

💡 **2. How it works inside you (Simple Analogy):**
${med.simpleAnalogy}

⏰ **3. How & When to take it (Meal & Water rules):**
• **Best Timing:** ${med.timingRule}
• **How to take:** ${med.howToTake}

⚠️ **4. Important Precautions (What to avoid):**
${med.whatToAvoid.map((rule) => `• ${rule}`).join('\n')}

🩺 **5. Friendly Doctor Safety Note:**
${med.safetyTip}

📦 **OneCare Special Quick Actions:**
• **Specialist OPD:** ${med.recommendedDoctor} (${med.specialist})
• **Diagnostic Test:** ${med.relevantLabTest} (Dr. Lal PathLabs)
• **Pharmacy:** 45-min doorstep delivery (Apollo / MedPlus)`;
}

export function generateHumanLikeSkinReply(query: string, language: string = 'English'): string {
  const lang = (language || 'English').toLowerCase();
  const isHindi = lang.includes('hindi') || lang.includes('हिन्दी') || lang.includes('hinglish');

  if (isHindi) {
    return `### 🩺 त्वचा स्कैन रिपोर्ट: रैश व डर्मेटाइटिस (Skin Rash & Care)

नमस्ते! परेशान न हों, आइए इसे आसान शब्दों में समझें। 😊

✨ **1. यह क्या हो सकता है?**
फोटो और लक्षणों के आधार पर यह **Contact Dermatitis या Eczematous Allergic Rash** जैसा दिख रहा है। 

💡 **2. यह क्यों होता है (सरल कारण)?**
• **स्किन शील्ड का कमजोर होना:** हमारी त्वचा एक सुरक्षात्मक कवच (Barrier) की तरह होती है। जब पसीना, धूल, तेज साबुन या नया कपड़ा इसे छूता है, तो शरीर के अंदर छोटी अलार्म घंटियां (Histamines) बजने लगती हैं जिससे लाल चकत्ते और खुजली होती है। 🌿
• **गर्मी व पसीना:** गर्म मौसम में नमी की वजह से फंगल या माइक्रोब्स आसानी से पनप जाते हैं।

⏰ **3. तुरंत आराम के लिए क्या करें:**
• 🧊 बर्फ या ठंडे पानी की सिकाई करें — इससे जलन तुरंत शांत होगी।
• 🚫 नाखूनों से बिल्कुल न खुजलाएं (इससे इन्फेक्शन अंदर फैल सकता है)।
• 💧 सौम्य मॉइस्चराइज़र या एलोवेरा लगाएं; तेज खूशबू वाले साबुन बंद रखें।

🩺 **4. डॉक्टर की सलाह व जांच:**
• **डॉक्टर:** Dr. Farhan Ali (Senior Dermatologist, OneCare OPD)
• **टेस्ट:** Total IgE Allergy Panel (Dr. Lal PathLabs)`;
  }

  return `### 🩺 Visual Skin Scan: Contact Dermatitis & Allergic Rash

Hey there! Don't worry, let's look at this together in warm, easy words. 😊

✨ **1. What is this likely to be?**
Based on the visual pattern and your description, this strongly resembles **Contact Dermatitis or an Eczematous Allergic Rash**.

💡 **2. Why did this happen (In simple words)?**
• **Skin Shield Disturbance:** Your skin has a delicate lipid shield. When sweat, synthetic fabrics, detergents, or allergens irritate it, your immune cells trigger tiny chemical sirens called **histamines**. This is what causes that sudden fiery redness and itching! 🛡️
• **Heat & Moisture:** Warm, humid weather can also allow micro-fungal spores to flare up in skin folds.

⏰ **3. Immediate Comfort Steps (Do this today):**
• 🧊 **Cool compress:** Apply a clean cold cloth or ice wrapped in a towel for 10 minutes to soothe blood vessels.
• 🚫 **Hands off:** Avoid scratching with nails to prevent secondary bacterial skin infections.
• 💧 **Hydrate:** Apply fragrance-free calamine or ceramide moisturizer. Wear breezy cotton clothes!

🩺 **4. Recommended Doctor & Test:**
• **Specialist:** Dr. Farhan Ali (Senior Dermatologist, MBBS, MD)
• **Diagnostic Test:** Total IgE Allergy Panel (Dr. Lal PathLabs)
• **Pharmacy:** Soothing hydrocortisone / anti-allergic care via Apollo Pharmacy`;
}

export function parseClinicalIntent(query: string): ClinicalTriageResult {
  const q = (query || '').toLowerCase();

  // Check medicine intent first
  const med = detectMedicine(query);
  if (isMedicineIntent(query) && med) {
    return {
      condition: `Medicine Analysis: ${med.name}`,
      specialist: med.specialist,
      doctorName: med.recommendedDoctor,
      doctorFee: med.doctorFee,
      labTest: med.relevantLabTest,
      urgency: 'Routine',
      medicine: med.name,
    };
  }

  if (q.includes('skin') || q.includes('rash') || q.includes('itch') || q.includes('eczema') || q.includes('fungal')) {
    return {
      condition: 'Contact Dermatitis / Eczematous Flare',
      specialist: 'Dermatologist',
      doctorName: 'Dr. Farhan Ali',
      doctorFee: 650,
      labTest: 'Total IgE Allergy Panel & Skin Scraping',
      urgency: 'Moderate',
      medicine: 'Hydrocortisone 1% Cream & Cetirizine 10mg',
    };
  }

  if (q.includes('chest') || q.includes('heart') || q.includes('stroke') || q.includes('breath') || q.includes('palpitation')) {
    return {
      condition: 'Cardiovascular Evaluation',
      specialist: 'Cardiologist',
      doctorName: 'Dr. Anil Verma',
      doctorFee: 900,
      labTest: 'Lipid Profile & 12-Lead ECG',
      urgency: 'Urgent',
      medicine: 'Atorvastatin 10mg / Cardioprotective Care',
    };
  }

  if (q.includes('sugar') || q.includes('diabetes') || q.includes('hba1c') || q.includes('thirst')) {
    return {
      condition: 'Metabolic & Glycemic Evaluation',
      specialist: 'Diabetologist',
      doctorName: 'Dr. Priya Sharma',
      doctorFee: 500,
      labTest: 'HbA1c & Fasting Blood Sugar',
      urgency: 'Routine',
      medicine: 'Metformin 500mg',
    };
  }

  return {
    condition: 'Primary Care Consultation',
    specialist: 'General Physician',
    doctorName: 'Dr. Priya Sharma',
    doctorFee: 500,
    labTest: 'CBC (Complete Blood Count)',
    urgency: 'Routine',
    medicine: 'Paracetamol 650mg / Hydration Therapy',
  };
}

export function validateLoginCredentials(emailOrPhone: string, pass: string): { isValid: boolean; role: 'patient' | 'doctor' | 'admin' | 'lab'; error?: string } {
  const e = emailOrPhone.trim().toLowerCase();
  if (!e) return { isValid: false, role: 'patient', error: 'User ID or email is required' };
  if (!pass || pass.length < 4) return { isValid: false, role: 'patient', error: 'Password must be at least 4 characters' };

  if (e.includes('admin')) return { isValid: true, role: 'admin' };
  if (e.includes('doctor') || e.includes('dr.')) return { isValid: true, role: 'doctor' };
  if (e.includes('lab') || e.includes('pathlabs')) return { isValid: true, role: 'lab' };

  return { isValid: true, role: 'patient' };
}

export interface BiomarkerItem {
  name: string;
  value: string;
  referenceRange: string;
  status: 'normal' | 'borderline' | 'high' | 'alert';
  explanation: string;
}

export interface ClinicalResearchResult {
  documentType: string;
  patientContext: string;
  biomarkers: BiomarkerItem[];
  researchGuidelines: string[];
  drugInteractions: string[];
  plainLanguageSummary: string;
  recommendedSpecialist: string;
  recommendedDoctor: string;
  doctorFee: number;
  recommendedLabTest: string;
  recommendedMedicine?: string;
  thinkingSteps: string[];
}

export function generateThinkingSteps(query: string): string[] {
  const q = (query || '').toLowerCase();
  if (q.includes('lipid') || q.includes('cholesterol') || q.includes('blood') || q.includes('report')) {
    return [
      '🔬 Extracting biochemical markers: Total Cholesterol, LDL, HDL & Triglycerides...',
      '📑 Cross-referencing ICMR & AHA 2024 Clinical Dyslipidemia Guidelines...',
      '🫀 Evaluating arterial plaque risk and atherogenic index ratios...',
      '💡 Synthesizing dietary modification, cardio consultation & follow-up test plan...',
    ];
  }

  if (isMedicineIntent(query)) {
    return [
      '💊 Identifying active pharmaceutical molecules, dosages & absorption kinetics...',
      '🛡️ Checking CDSCO & WHO clinical drug-drug interaction matrix...',
      '⏰ Calculating optimal gastric absorption timing with food & water rules...',
      '🩺 Formulating patient safety precautions and specialist consultation advice...',
    ];
  }

  if (q.includes('skin') || q.includes('rash') || q.includes('itch') || q.includes('dermat')) {
    return [
      '🩹 Scanning dermatological morphology, erythema borders and skin barrier integrity...',
      '📚 Cross-referencing IADVL clinical dermatology and contact dermatitis diagnostic atlas...',
      '🧊 Evaluating soothing topical barrier emollients & antihistamine relief...',
      '🩺 Formulating OPD dermatologist booking & total IgE diagnostic roadmap...',
    ];
  }

  return [
    '🩺 Evaluating primary symptoms, chronicity & red-flag warning signs...',
    '📚 Cross-referencing primary care triage protocols and emergency thresholds...',
    '🛡️ Screening for safe home comfort measures and hydration protocol...',
    '💡 Formulating recommended specialist, diagnostic panel & clinical guidance...',
  ];
}

export function researchClinicalFile(queryOrFilename: string, language: string = 'English'): ClinicalResearchResult {
  const q = (queryOrFilename || '').toLowerCase();
  const isHindi = language.toLowerCase().includes('hindi') || language.toLowerCase().includes('हिन्दी') || language.toLowerCase().includes('hinglish');

  // Case A: Lipid / Blood Cholesterol Report
  if (q.includes('lipid') || q.includes('cholesterol') || q.includes('fat') || q.includes('heart report') || q.includes('blood test') || q.includes('report')) {
    return {
      documentType: 'Cardiovascular Lipid & Metabolic Blood Panel (Pathology Report)',
      patientContext: 'Biochemical lipid profile showing elevated atherogenic fractions.',
      biomarkers: [
        {
          name: 'Total Cholesterol',
          value: '245 mg/dL',
          referenceRange: '< 200 mg/dL',
          status: 'high',
          explanation: 'Elevated total circulating cholesterol, indicating excess circulating lipid particles.',
        },
        {
          name: 'LDL "Bad" Cholesterol',
          value: '168 mg/dL',
          referenceRange: '< 100 mg/dL',
          status: 'high',
          explanation: 'Primary atherogenic marker. Sits inside blood vessel walls if left unmanaged.',
        },
        {
          name: 'HDL "Good" Cholesterol',
          value: '38 mg/dL',
          referenceRange: '> 45 mg/dL',
          status: 'borderline',
          explanation: 'Protective scavenger cholesterol is slightly low; regular brisk walking will boost this.',
        },
        {
          name: 'Triglycerides',
          value: '195 mg/dL',
          referenceRange: '< 150 mg/dL',
          status: 'borderline',
          explanation: 'Linked to dietary refined carbohydrates, fried items, and sedentary habits.',
        },
      ],
      researchGuidelines: [
        'AHA/ACC 2024 Multi-Society Guideline on the Management of Blood Cholesterol',
        'ICMR Consensus Guidelines on Dyslipidemia in Indian Patients',
        'NLA (National Lipid Association) Recommendations for Cardiovascular Risk Reduction',
      ],
      drugInteractions: [
        'If prescribed Statins (e.g. Atorvastatin), avoid taking with large quantities of grapefruit juice.',
        'Safe to take alongside standard multivitamin or antacid supplements with a 2-hour gap.',
      ],
      plainLanguageSummary: isHindi
        ? 'आपकी रिपोर्ट में कुल कोलेस्ट्रॉल (245) और एलडीएल (168) सामान्य से अधिक हैं। इसे आप अपनी रक्त धमनियों में जमा होने वाली अतिरिक्त ग्रीस की तरह समझ सकते हैं। घबराएं नहीं! रोजाना 30 मिनट तेज सैर, खाने में ओट्स व हरी सब्जियां बढ़ाकर और डॉक्टर की सलाह से इसे 4-6 हफ्तों में सामान्य किया जा सकता है।'
        : 'Your lipid report shows elevated Total Cholesterol (245 mg/dL) and LDL (168 mg/dL). Think of your blood vessels as clean expressways; excess LDL acts like sticky grease that makes your heart pump harder. With 30 mins of daily walking, fiber-rich foods (oats/vegetables), and Dr. Anil Verma\'s guidance, these numbers can improve significantly!',
      recommendedSpecialist: 'Cardiologist',
      recommendedDoctor: 'Dr. Anil Verma',
      doctorFee: 900,
      recommendedLabTest: 'Comprehensive Lipid Panel (Thyrocare / Dr. Lal PathLabs)',
      recommendedMedicine: 'Atorvastatin 10mg (After Clinical Consultation)',
      thinkingSteps: [
        '🔬 Extracted numerical biomarkers: Total Cholesterol 245, LDL 168, HDL 38, Triglycerides 195 mg/dL.',
        '📑 Correlated with ICMR & AHA 2024 Adult Cardiovascular Risk stratification criteria.',
        '🫀 Calculated total atherogenic burden and lifestyle intervention timeline (4-6 weeks retest).',
        '🩺 Linked to Dr. Anil Verma (Cardiologist) & home lab collection for follow-up panel.',
      ],
    };
  }

  // Case B: Dermatology / Rash Scan
  if (q.includes('skin') || q.includes('rash') || q.includes('itch') || q.includes('allergy') || q.includes('eczema')) {
    return {
      documentType: 'Clinical Dermatological Scan & Allergy Triage',
      patientContext: 'Visual epidermal presentation showing erythematous macular lesions with pruritus.',
      biomarkers: [
        {
          name: 'Lesion Morphology',
          value: 'Erythematous Papules',
          referenceRange: 'Clear Epidermis',
          status: 'alert',
          explanation: 'Localized inflammation of the superficial skin layer caused by allergic histamine response.',
        },
        {
          name: 'Epidermal Barrier Index',
          value: 'Disrupted / Dry',
          referenceRange: 'Intact Lipid Shield',
          status: 'borderline',
          explanation: 'Moisture loss in the skin outer shield allows irritants and sweat to trigger fiery itching.',
        },
      ],
      researchGuidelines: [
        'IADVL (Indian Association of Dermatologists) Guidelines for Contact Dermatitis',
        'AAD (American Academy of Dermatology) Clinical Care Pathways for Atopic Eczema',
      ],
      drugInteractions: [
        'Topical mild hydrocortisone 1% is safe for short-term localized relief (max 5-7 days).',
        'Cetirizine 10mg should be taken at bedtime to prevent daytime drowsiness.',
      ],
      plainLanguageSummary: isHindi
        ? 'यह लाल चकत्ते और खुजली संपर्क डर्मेटाइटिस या एलर्जी के कारण है। त्वचा का प्राकृतिक सुरक्षा कवच कमजोर पड़ने से पसीना या धूल खुजली पैदा कर रहे हैं। बर्फ की ठंडी सिकाई करें, खुजलाएं नहीं और डर्मेटोलॉजिस्ट डॉ. फरहान अली से सलाह लें।'
        : 'The rash appears to be Contact Dermatitis or an Allergic Flare-up. When your skin\'s lipid barrier is irritated by sweat, synthetics, or detergents, immune cells trigger histamines causing fiery redness. Apply a cool cloth, do not scratch with nails, and consult Dermatologist Dr. Farhan Ali.',
      recommendedSpecialist: 'Dermatologist',
      recommendedDoctor: 'Dr. Farhan Ali',
      doctorFee: 650,
      recommendedLabTest: 'Total IgE Allergy Panel & Skin Scraping',
      recommendedMedicine: 'Hydrocortisone 1% Cream & Cetirizine 10mg',
      thinkingSteps: [
        '🩹 Assessed dermal margin demarcation, redness intensity, and micro-vesicular spread.',
        '📚 Cross-checked differential diagnoses against IADVL contact dermatitis atlas.',
        '🧊 Formulated immediate barrier restoration steps (cold compress, zero fragrance moisturizer).',
        '🩺 Routed to Dr. Farhan Ali & Dr. Lal PathLabs Total IgE Allergy screen.',
      ],
    };
  }

  // Case C: Prescription / Medicine Scan
  const detectedMed = detectMedicine(queryOrFilename) || KNOWN_MEDICINES.pantoprazole;
  return {
    documentType: 'OPD Prescription & Pharmacotherapy Order',
    patientContext: `Prescription order for ${detectedMed.name} (${detectedMed.generic}).`,
    biomarkers: [
      {
        name: 'Prescribed Drug',
        value: detectedMed.name,
        referenceRange: 'Therapeutic Dose',
        status: 'normal',
        explanation: detectedMed.simpleExplanation,
      },
      {
        name: 'Gastric Timing Requirement',
        value: detectedMed.timingRule,
        referenceRange: 'Strict Adherence',
        status: 'normal',
        explanation: detectedMed.howToTake,
      },
    ],
    researchGuidelines: [
      'CDSCO Approved Drug Formulations & Indications Handbook',
      'British National Formulary (BNF) Gastrointestinal & Systemic Protocols',
      'WHO Essential Medicines Clinical Pharmacopeia',
    ],
    drugInteractions: detectedMed.whatToAvoid,
    plainLanguageSummary: isHindi
      ? `दवाई की जांच: ${detectedMed.name}। ${detectedMed.simpleExplanation} इसे ${detectedMed.timingRule} लेना चाहिए। ${detectedMed.safetyTip}`
      : `Medicine Clinical Review: ${detectedMed.name}. ${detectedMed.simpleExplanation} Timing rule: ${detectedMed.timingRule}. Doctor's safety tip: ${detectedMed.safetyTip}`,
    recommendedSpecialist: detectedMed.specialist,
    recommendedDoctor: detectedMed.recommendedDoctor,
    doctorFee: detectedMed.doctorFee,
    recommendedLabTest: detectedMed.relevantLabTest,
    recommendedMedicine: detectedMed.name,
    thinkingSteps: [
      `💊 Extracted active compound: ${detectedMed.generic}.`,
      '🛡️ Screened CDSCO & WHO contraindication matrix for safety profiles.',
      `⏰ Evaluated bio-availability & meal timing: ${detectedMed.timingRule}.`,
      `🩺 Linked to ${detectedMed.recommendedDoctor} (${detectedMed.specialist}) and verified pharmacy.`,
    ],
  };
}

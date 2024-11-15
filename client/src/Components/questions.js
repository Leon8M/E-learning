const questions = {
  Programming: [
    {
      question: "Which of the following is a JavaScript framework?",
      options: ["React", "Django", "Laravel", "Spring"],
      correctAnswer: "React",
    },
    {
      question: "What is the correct syntax to create a function in JavaScript?",
      options: ["function myFunction()", "function = myFunction()", "def myFunction()", "create function myFunction()"],
      correctAnswer: "function myFunction()",
    },
    {
      question: "What does HTML stand for?",
      options: ["HyperText Markup Language", "Hyper Tool Markup Language", "Home Tool Markup Language", "None of the above"],
      correctAnswer: "HyperText Markup Language",
    },
    {
      question: "Which of the following is used to style a webpage?",
      options: ["CSS", "HTML", "JavaScript", "JSON"],
      correctAnswer: "CSS",
    },
    {
      question: "Which method is used to add an item to the end of an array in JavaScript?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correctAnswer: "push()",
    },
    {
      question: "What does the '===' operator do in JavaScript?",
      options: ["Checks for equality without type conversion", "Checks for equality with type conversion", "Assigns a value", "None of the above"],
      correctAnswer: "Checks for equality without type conversion",
    },
    {
      question: "Which of the following is not a primitive data type in JavaScript?",
      options: ["String", "Boolean", "Object", "Number"],
      correctAnswer: "Object",
    },
    {
      question: "What does JSON stand for?",
      options: ["JavaScript Object Notation", "JavaScript Online Notation", "Java System Object Notation", "JavaScript Output Notation"],
      correctAnswer: "JavaScript Object Notation",
    },
    {
      question: "Which HTML tag is used to define an unordered list?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      correctAnswer: "<ul>",
    },
    {
      question: "What does the 'this' keyword refer to in JavaScript?",
      options: ["The current object", "The function", "The global object", "The previous function call"],
      correctAnswer: "The current object",
    }
  ],
  
  Medicine: [
    {
      question: "What is the normal range of blood pressure in adults?",
      options: ["120/80 mmHg", "100/70 mmHg", "140/90 mmHg", "130/85 mmHg"],
      correctAnswer: "120/80 mmHg",
    },
    {
      question: "Which vitamin is primarily obtained from sunlight?",
      options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
      correctAnswer: "Vitamin D",
    },
    {
      question: "Which part of the body is affected by asthma?",
      options: ["Lungs", "Heart", "Kidneys", "Liver"],
      correctAnswer: "Lungs",
    },
    {
      question: "What is the primary function of the red blood cells?",
      options: ["Transport oxygen", "Fight infections", "Carry nutrients", "Maintain blood pressure"],
      correctAnswer: "Transport oxygen",
    },
    {
      question: "Which of the following is the largest organ in the human body?",
      options: ["Liver", "Heart", "Skin", "Brain"],
      correctAnswer: "Skin",
    },
    {
      question: "Which disease is caused by a deficiency of insulin?",
      options: ["Diabetes", "Hypertension", "Anemia", "Arthritis"],
      correctAnswer: "Diabetes",
    },
    {
      question: "What does the 'ABO' blood type system refer to?",
      options: ["Antigens on red blood cells", "Size of red blood cells", "Blood clotting factor", "Type of blood vessels"],
      correctAnswer: "Antigens on red blood cells",
    },
    {
      question: "What is the name of the hormone that regulates blood sugar levels?",
      options: ["Insulin", "Adrenaline", "Cortisol", "Thyroxine"],
      correctAnswer: "Insulin",
    },
    {
      question: "Which part of the brain controls balance and coordination?",
      options: ["Cerebellum", "Cerebrum", "Medulla", "Hypothalamus"],
      correctAnswer: "Cerebellum",
    },
    {
      question: "What is the primary function of the heart?",
      options: ["Pumps blood throughout the body", "Regulates body temperature", "Controls movement", "Produces hormones"],
      correctAnswer: "Pumps blood throughout the body",
    }
  ],

  Psychology: [
    {
      question: "Who is considered the father of modern psychology?",
      options: ["Sigmund Freud", "Carl Jung", "Wilhelm Wundt", "B.F. Skinner"],
      correctAnswer: "Wilhelm Wundt",
    },
    {
      question: "Which of the following is a type of memory?",
      options: ["Short-term", "Long-term", "Working", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: "Which psychological approach focuses on observable behavior?",
      options: ["Cognitive", "Behaviorism", "Humanistic", "Psychoanalysis"],
      correctAnswer: "Behaviorism",
    },
    {
      question: "What is the theory of classical conditioning associated with?",
      options: ["B.F. Skinner", "Ivan Pavlov", "Sigmund Freud", "Carl Rogers"],
      correctAnswer: "Ivan Pavlov",
    },
    {
      question: "Which of the following is an example of operant conditioning?",
      options: ["A dog salivates at the sound of a bell", "A child receives a reward for good behavior", "A person avoids a loud noise", "None of the above"],
      correctAnswer: "A child receives a reward for good behavior",
    },
    {
      question: "What is the term for the tendency to attribute behaviors to internal factors rather than external ones?",
      options: ["Fundamental attribution error", "Self-serving bias", "Cognitive dissonance", "Projection"],
      correctAnswer: "Fundamental attribution error",
    },
    {
      question: "What is the primary focus of cognitive psychology?",
      options: ["Memory and perception", "Emotions", "Behavioral responses", "Social interaction"],
      correctAnswer: "Memory and perception",
    },
    {
      question: "Which of the following is a stage in Erikson's psychosocial development theory?",
      options: ["Trust vs. Mistrust", "Acquisition vs. Loss", "Obedience vs. Rebellion", "Development vs. Decay"],
      correctAnswer: "Trust vs. Mistrust",
    },
    {
      question: "Which neurotransmitter is commonly associated with feelings of happiness and pleasure?",
      options: ["Serotonin", "Dopamine", "Acetylcholine", "GABA"],
      correctAnswer: "Dopamine",
    },
    {
      question: "Which of the following is the most common type of psychological disorder in the U.S.?",
      options: ["Depression", "Schizophrenia", "Anxiety disorders", "Bipolar disorder"],
      correctAnswer: "Anxiety disorders",
    }
  ],

  Chemistry: [
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "O2", "HO2", "OH2"],
      correctAnswer: "H2O",
    },
    {
      question: "What is the pH of pure water?",
      options: ["7", "0", "14", "3"],
      correctAnswer: "7",
    },
    {
      question: "What is the atomic number of carbon?",
      options: ["6", "8", "12", "14"],
      correctAnswer: "6",
    },
    {
      question: "Which of the following is a noble gas?",
      options: ["Oxygen", "Nitrogen", "Argon", "Hydrogen"],
      correctAnswer: "Argon",
    },
    {
      question: "What is the molar mass of oxygen (O2)?",
      options: ["16 g/mol", "32 g/mol", "48 g/mol", "64 g/mol"],
      correctAnswer: "32 g/mol",
    },
    {
      question: "Which of the following is a compound?",
      options: ["Oxygen", "Carbon", "Water", "Nitrogen"],
      correctAnswer: "Water",
    },
    {
      question: "Which element has the chemical symbol Na?",
      options: ["Sodium", "Nitrogen", "Neon", "Nickel"],
      correctAnswer: "Sodium",
    },
    {
      question: "What is the chemical formula for methane?",
      options: ["CH4", "C2H6", "CO2", "CH3OH"],
      correctAnswer: "CH4",
    },
    {
      question: "What is the process of a solid turning into a liquid called?",
      options: ["Melting", "Freezing", "Condensation", "Evaporation"],
      correctAnswer: "Melting",
    },
    {
      question: "What type of bond is formed when electrons are shared between atoms?",
      options: ["Ionic bond", "Covalent bond", "Hydrogen bond", "Metallic bond"],
      correctAnswer: "Covalent bond",
    }
  ],
};

export default questions;

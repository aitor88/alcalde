const cards = [
    {
        name: "Izan Putiérrez",
        text: "Mis patinetes son el futuro, {playerName}, pero los jubilados los usan de barricada. ¿Apoyarás el progreso o cederás ante ellos?",
        character: "https://placehold.co/400x300/10b981/ffffff?text=Emprendedor",
        left: {
            text: "Multazo y que los retiren",
            effects: { pop: 7, tes: 4, med: -5, par: 0 },
            consequence: "Los vecinos aplauden, pero la startup te acusa de ludita en los medios."
        },
        right: {
            text: "Regularizarlo, es el futuro",
            effects: { pop: -6, tes: 0, med: 8, par: 3 },
            consequence: "Tu partido te ve como un moderno, pero los mayores te guardan rencor."
        }
    },
    {
        name: "Monseñor Benigno",
        text: "La Catedral es un lugar de culto, no un negocio. ¿Nos obligarás a pagar el IBI como a cualquier empresa, {playerName}?",
        character: "https://placehold.co/400x300/8b5cf6/ffffff?text=Obispo",
        left: {
            text: "La ley es la ley. Que paguen.",
            effects: { pop: 5, tes: 10, med: 0, par: -5 },
            consequence: "Las arcas se llenan y la gente te apoya, pero el ala democristiana de tu partido conspira."
        },
        right: {
            text: "Es un lugar de culto, no un negocio.",
            effects: { pop: -7, tes: -4, med: 0, par: 6 },
            consequence: "El obispo te da su bendición y el partido te respalda. La oposición te llama 'vendido'."
        }
    },
    {
        name: "Paco 'El Cuñao'",
        text: "Primo, mi escultura para la rotonda es un chollo y lo sabes. ¿Vas a hacer la vista gorda o me vas a tratar como a un extraño?",
        character: "https://placehold.co/400x300/ec4899/ffffff?text=Cuñado",
        left: {
            text: "¡Qué arte! Adjudicado.",
            effects: { pop: -8, tes: -10, med: 0, par: 5 },
            consequence: "Tu cuñado está contento, pero el pueblo cree que la rotonda es un engendro y un despilfarro."
        },
        right: {
            text: "Convocaré un concurso público.",
            effects: { pop: 4, tes: 0, med: 6, par: -3 },
            consequence: "Transparencia y buena prensa. Tu cuñado no te hablará en la próxima cena de Navidad."
        }
    },
    {
        name: "Dra. Ana Remedios",
        text: "Nos obligan a recortar en el centro de salud. ¿Qué sacrificamos, {playerName}, las urgencias nocturnas o el puesto de mis compañeros?",
        character: "https://placehold.co/400x300/dc2626/ffffff?text=Doctora",
        left: {
            text: "Cerraremos las urgencias nocturnas.",
            effects: { pop: -12, tes: 6, med: -5, par: 0 },
            consequence: "Cuadras las cuentas, pero la primera emergencia nocturna que acabe mal será tu tumba política."
        },
        right: {
            text: "Me niego. La sanidad es sagrada.",
            effects: { pop: 10, tes: -8, med: 6, par: 0 },
            consequence: "Eres un héroe para el pueblo, pero te enfrentas a una guerra abierta con el gobierno regional."
        }
    }
];

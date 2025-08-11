const cards = [
    // --- Cartas de Sátira y Humor ---
    {
        name: "Izan Putiérrez",
        text: "Una startup de patinetes eléctricos ha llenado las aceras. Los jubilados amenazan con usarlos de barricada.",
        character: "https://placehold.co/300x400/10b981/ffffff?text=Emprendedor",
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
        text: "La oposición exige que la Iglesia pague el IBI por la Catedral. Te he pedido una 'reunión discreta'.",
        character: "https://placehold.co/300x400/8b5cf6/ffffff?text=Obispo",
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
        text: "Te ofrezco mi escultura 'vanguardista' por un módico precio para la nueva rotonda. Es un chollo.",
        character: "https://placehold.co/300x400/ec4899/ffffff?text=Cuñado",
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
        name: "Agustín Fasto",
        text: "Quiero contratar a un DJ famoso por el triple del presupuesto para las fiestas. 'Dará prestigio', te aseguro.",
        character: "https://placehold.co/300x400/f97316/ffffff?text=Concejal",
        left: {
            text: "Que suene la música",
            effects: { pop: 9, tes: -12, med: 5, par: 0 },
            consequence: "Los jóvenes te adoran y sales en la tele, pero dejas un agujero en las cuentas municipales."
        },
        right: {
            text: "La orquesta de siempre y gracias",
            effects: { pop: -4, tes: 3, med: -3, par: 0 },
            consequence: "Los mayores contentos y te ahorras un dineral. Los jóvenes te llaman 'carca'."
        }
    },
    {
        name: "Manolo del Bar",
        text: "Quiero poner más mesas en la terraza, ocupando media acera. Me conoces de siempre, ¡enróllate!",
        character: "https://placehold.co/300x400/3b82f6/ffffff?text=Hostelero",
        left: {
            text: "Por supuesto, Manolo.",
            effects: { pop: 5, tes: 0, med: -4, par: 3 },
            consequence: "El gremio de hosteleros te apoya, pero la asociación de vecinos te declara la guerra."
        },
        right: {
            text: "Las normas son para todos.",
            effects: { pop: -6, tes: 0, med: 4, par: -3 },
            consequence: "Los peatones respiran aliviados, pero Manolo se asegura de que todo el mundo sepa que eres un 'estirado'."
        }
    },
    // --- Cartas de Calado y Decisiones Serias ---
    {
        name: "José Huelgas",
        text: "La fábrica de cerámicas, el corazón del pueblo, anuncia su cierre. Cientos de familias a la calle. Hay que actuar ya.",
        character: "https://placehold.co/300x400/475569/ffffff?text=Sindicalista",
        left: {
            text: "Subvención millonaria para que se queden.",
            effects: { pop: 10, tes: -12, med: 0, par: 0 },
            consequence: "Salvas los empleos hoy, pero hipotecas el futuro del ayuntamiento."
        },
        right: {
            text: "Crear un plan de re-formación profesional.",
            effects: { pop: -10, tes: -5, med: 0, par: 0 },
            consequence: "Es una inversión a largo plazo, pero ahora mismo la gente te quiere linchar."
        }
    },
    {
        name: "Begoña Ladrillo",
        text: "Mi constructora quiere edificar una urbanización de lujo en 'El Pinar', el último pulmón verde del municipio.",
        character: "https://placehold.co/300x400/ca8a04/ffffff?text=Promotora",
        left: {
            text: "¡A recalificar! El progreso es imparable.",
            effects: { pop: -9, tes: 12, med: 0, par: 8 },
            consequence: "Las arcas municipales rebosan y tu partido te aplaude. Los ecologistas se encadenan a los árboles."
        },
        right: {
            text: "Esa zona verde no se toca.",
            effects: { pop: 8, tes: -4, med: 0, par: -6 },
            consequence: "La gente te ve como un defensor de la naturaleza, pero la constructora financiará a tu rival."
        }
    },
    {
        name: "Dra. Ana Remedios",
        text: "Nos exigen recortar el presupuesto del centro de salud. O despedimos personal o cerramos las urgencias por la noche.",
        character: "https://placehold.co/300x400/dc2626/ffffff?text=Doctora",
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
    },
    {
        name: "Antonio Candado",
        text: "La inseguridad en mi barrio es insostenible. Los vecinos tenemos miedo de salir por la noche. ¡Haga algo!",
        character: "https://placehold.co/300x400/57534e/ffffff?text=Vecino",
        left: {
            text: "Más presencia policial en las calles.",
            effects: { pop: 7, tes: -6, med: 0, par: 5 },
            consequence: "La sensación de seguridad aumenta a corto plazo, pero algunos te acusan de crear un estado policial."
        },
        right: {
            text: "Invertir en programas sociales y educativos.",
            effects: { pop: -5, tes: -8, med: 0, par: -4 },
            consequence: "Atacas la raíz del problema, pero los resultados tardarán años. Ahora mismo, los vecinos te ven como un blando."
        }
    },
    {
        name: "Gema Verde",
        text: "El río baja de un color sospechoso. Creemos que una de las industrias del polígono está vertiendo residuos ilegalmente.",
        character: "https://placehold.co/300x400/059669/ffffff?text=Ecologista",
        left: {
            text: "Abrir una investigación a fondo.",
            effects: { pop: 6, tes: -7, med: 5, par: 0 },
            consequence: "La gente valora tu compromiso, pero los empresarios del polígono te declaran persona non grata."
        },
        right: {
            text: "Es solo arcilla del fondo, no hay que alarmar.",
            effects: { pop: -8, tes: 0, med: -6, par: 6 },
            consequence: "Los empresarios respiran aliviados, pero como el río vaya a más, el escándalo será mayúsculo."
        }
    }
];

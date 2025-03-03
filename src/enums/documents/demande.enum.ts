export const DemandeStatusEnum = {
    EN_ATTENTE: "EN_ATTENTE",
    REJETTER: "REJETTER",
    EN_COURS_DE_TRAITEMENT: "EN_COURS_DE_TRAITEMENT",
    EN_ATTENTE_DE_PAIEMENT: "EN_ATTENTE_DE_PAIEMENT",
    PAYEE: "PAYEE",
} as const

export const DemandePrioritEnum = {
    BASSE: "BASSE",
    MOYENNE: "MOYENNE",
    HAUTE: "HAUTE",
} as const 

export type DemandeStatusEnumType = typeof DemandeStatusEnum[keyof typeof DemandeStatusEnum];
export type DemandePrioritEnumType = typeof DemandePrioritEnum[keyof typeof DemandePrioritEnum];
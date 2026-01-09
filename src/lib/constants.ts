
export const Categories = {
    MENWATCHES: "menWatches",
    WOMENWATCHES: "womenWatches",
    PURSES: "purses",
    JEWELLERY: "jewellery",
} as const;

export type Categories = typeof Categories[keyof typeof Categories];
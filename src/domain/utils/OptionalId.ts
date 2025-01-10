export type OptionalId<T> = T extends { id: string } ? Omit<T, 'id'> & { id?: string } : T;

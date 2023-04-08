export type SortingType = 'A' | 'B' | 'C' | 'D';

export type SortingOption = Record<
  SortingType,
  {
    text: string;
    value: SortingType;
  }
>;

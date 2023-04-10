type SortingIds = 'A' | 'B' | 'C' | 'D';

export type SortingData = {
  text: string;
  value: SortingIds;
};

export type SortingOption = Record<SortingIds, SortingData>;

export type SortingIds = 'popular' | 'priceToHigh' | 'priceToLow' | 'rated';

export type SortingData = {
  text: string;
  value: SortingIds;
};

export type SortingOption = Record<SortingIds, SortingData>;

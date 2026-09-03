export type ShopperType = 'Men' | 'Women' | 'Kids' | 'Family';

export interface AppState {
  shopperType?: ShopperType;
  kidsAgeGroup?: string;
  familyWho?: string[];
  familyMost?: string;
  categories: string[];
  products: string[];
  colours: string[];
  quality?: string;
  fit?: string;
  fabric?: string;
  price?: string;
  staff?: string;
  storeExperience?: string;
  overallExperience?: string;
  improvementArea?: string;
  optionalComment?: string;
}

export type ReviewDrafts = {
  natural: string;
  short: string;
  polished: string;
};

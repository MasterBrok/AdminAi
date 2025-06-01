export interface GenderViewModel {
  id: string;
  value: string;
  state?: number;
}

export interface EditGenderViewModel {
  id: string;
  gender: string;
  state: number;
}

export interface AddGenderViewModel {
  gender: string;
}

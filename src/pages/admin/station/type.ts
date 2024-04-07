// location.d.ts (same as previous response)
export interface Location {
  Id: string;
  Name: string;
  Districts?: District[]; // Optional array of districts
}

export interface District {
  Id: string;
  Name: string;
  Wards?: Ward[]; // Optional array of wards
}

export interface Ward {
  Id: string;
  Name: string;
  Level: string;
}

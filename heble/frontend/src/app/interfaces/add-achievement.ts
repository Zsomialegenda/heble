//achievementek hozzáadásához létrehozott interface, ami felállít egy szerkezetet, hogy milyen adatokat várunk el a backend felől.
export interface AddAchievement {
  id: number;
  name: string;
  description: string;
  pushUpsRequired: number;
  pullUpsRequired:number;
  sitUpsRequired:number;
  squatsRequired:number;
  runningRequired:number;
}

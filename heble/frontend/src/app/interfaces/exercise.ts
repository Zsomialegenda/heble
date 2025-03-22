// exercise számára létrehozott interface, ami felállít egy szerkezetet, hogy milyen adatokat várunk el a backend felől.
export interface Exercise {
  pushUps?: number;
  pullUps?: number;
  sitUps?: number;
  squats?: number;
  running?: number;
  createdAt?: number;
  updatedAt?: number;
}

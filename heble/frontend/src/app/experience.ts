// experience számára létrehozott interface, ami felállít egy szerkezetet, hogy milyen adatokat várunk el a backend felől.
export interface Experience {
  id: number;
  userId: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
}

export class PetsDto {
  name: string;
}

export class UserPetsDto {
  userId: string;
  petId: string;
  name: string;
  level: number;
  type: number;
  stats: string;
  time: string;
}

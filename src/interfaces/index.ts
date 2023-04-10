export interface UserModel {
  name: string,
  email: string,
  phone: string,
  birth_date: string,
  city: string
}

export interface UserRow extends UserModel {
  id: number
}

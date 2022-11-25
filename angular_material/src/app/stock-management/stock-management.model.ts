enum status{
  active,
  deleted
}

export interface Ingredients {
  _id:string
  name:string
  status:status
  stock:number
}

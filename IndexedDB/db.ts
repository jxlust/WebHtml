import Dexie, { type EntityTable } from 'dexie'

interface Fruit {
  id: number
  name: string
  color: string
  price?: number
  [key: string]: any
}
interface Friend {
  id: number
  name: string
  age: number
  tags?: string[]
}

const db = new Dexie('MyDatabase') as Dexie & {
  fruits: EntityTable<Fruit, 'id'>
  friends: EntityTable<Friend, 'id'>
}
db.version(1).stores({
  fruits: '++id, name, color',
  friends: '++id, name, age, *tags',
})

export type { Fruit, Friend }
export { db }

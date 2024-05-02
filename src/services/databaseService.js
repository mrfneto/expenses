import { db } from '../firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where
} from 'firebase/firestore'

class databaseServices {
  _collection
  constructor(collectionName) {
    this._collection = collectionName
  }
  create = async data => await addDoc(collection(db, this._collection), data)

  update = async (data, id) =>
    await updateDoc(doc(db, this._collection, id), data)

  remove = async id => await deleteDoc(doc(db, this._collection, id))

  find = async id =>
    await getDoc(doc(db, this._collection, id)).then(doc => {
      return doc.exists() ? doc.data() : null
    })

  get = async (parameters = [], searchQuery = '') => {
    try {
      let q = collection(db, this._collection)

      parameters.forEach(parameter => {
        const [type, value] = parameter
        switch (type) {
          case 'filter':
            q = query(q, where(value.field, value.operator, value.value))
            break
          case 'andOrFilter':
            q = query(q, where(value.field, value.operator, value.value))
            break
          case 'sorting':
            q = query(q, orderBy(value.field, value.direction || 'desc'))
            break
          case 'limit':
            q = query(q, limit(value))
            break
          case 'startAfter':
            if (value) q = query(q, startAfter(value))
            break
          default:
            console.warn(`Tipo de parâmetro '${type}' não reconhecido.`)
        }
      })

      if (searchQuery) {
        q = query(
          q,
          where('searchField', '>=', searchQuery.toLowerCase()),
          where('searchField', '<=', searchQuery.toLowerCase() + '\uf8ff')
        )
      }

      const querySnapshot = await getDocs(q)

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return { data, lastVisible }
    } catch (error) {
      console.error('Error fetching collection:', error)
      throw error // Rethrow the error to handle it elsewhere if needed
    }
  }
}

export const expenseService = new databaseServices('expenses')

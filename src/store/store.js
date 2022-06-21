import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('counter', {
  state: () => {
    return {
      notes: [],
      count: 0,
    }
  },
  actions: {
    increment() {
      this.count++
    },
    getNotes() {
      if (localStorage.getItem('notes') !== null) {
        this.notes = JSON.parse(localStorage.getItem('notes'))
      }
    },
    addNote(text) {
      this.notes.push({text, id: uuid()})
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },
    deleteNote(id) {
      this.notes = this.notes.filter(note => note.id !== id)
      localStorage.setItem('notes', JSON.stringify(this.notes))
    }
  }
})
import { defineStore } from 'pinia'

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
    addNote(note) {
      this.notes.push(note)
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },
    deleteNote(noteToDelete) {
      this.notes = this.notes.filter(note => note !== noteToDelete)
      localStorage.setItem('notes', JSON.stringify(this.notes))
    }
  }
})
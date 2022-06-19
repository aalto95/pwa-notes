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
    addNote(note) {
      this.notes.push(note)
    }
  }
})
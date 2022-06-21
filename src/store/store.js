import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('counter', {
  state: () => {
    return {
      notes: [],
      pinnedNotes: [],
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
      if (localStorage.getItem('pinnedNotes') !== null) {
        this.pinnedNotes = JSON.parse(localStorage.getItem('pinnedNotes'))
      }
    },
    addNote(text) {
      this.notes.push({
        text,
        id: uuid()
      })
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },
    pinNote(note) {
      this.deleteNote(note.id)
      this.pinnedNotes.push(note)
      localStorage.setItem('pinnedNotes', JSON.stringify(this.pinnedNotes))
    },
    unpinNote(note) {
      this.pinnedNotes = this.pinnedNotes.filter((pinnedNote) => pinnedNote.id !== note.id)
      this.addNote(note.text)
      localStorage.setItem('pinnedNotes', JSON.stringify(this.pinnedNotes))
    },
    deletePinnedNote(id) {
      this.pinnedNotes = this.pinnedNotes.filter((pinnedNote) => pinnedNote.id !== id)
      localStorage.setItem('pinnedNotes', JSON.stringify(this.pinnedNotes))
    },
    deleteNote(id) {
      this.notes = this.notes.filter(note => note.id !== id)
      localStorage.setItem('notes', JSON.stringify(this.notes))
    }
  }
})
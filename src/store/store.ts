import { defineStore } from "pinia";
import { Note } from "../models/Note";
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application

export type RootState = {
  notes: Note[];
  db: IDBDatabase | null;
};

export const useStore = defineStore("notes", {
  state: () => {
    return {
      notes: [],
      db: null,
    } as RootState;
  },
  actions: {
    getNotes(): void {
      if (localStorage.getItem("notes") !== null) {
        this.notes = JSON.parse(localStorage.getItem("notes")!);
      }
    },
    addNote(note: Partial<Note>): void {
      this.notes.push({
        ...note,
        id: self.crypto.randomUUID(),
      });
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    deleteNote(id: Note["id"]): void {
      this.notes = this.notes.filter((note) => note.id !== id);
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    editNote(changedNote: Note): void {
      this.notes = this.notes.map((note) => {
        if (note.id === changedNote.id) {
          return changedNote;
        }
        return note;
      });
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    getNoteById(id: Note["id"]): Note {
      return this.notes.find((note) => note.id === id);
    },
    setDatabase(db: IDBDatabase): void {
      this.db = db;
    },
  },
});

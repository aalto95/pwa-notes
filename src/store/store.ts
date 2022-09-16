import { defineStore } from "pinia";
import { Note } from "../models/Note";
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application

export type RootState = {
  notes: Note[];
  pinnedNotes: Note[];
  addNotePromptIsActive: boolean;
  dragAndDropIsActive: boolean;
};

export const useStore = defineStore("notes", {
  state: () => {
    return {
      notes: [],
      pinnedNotes: [],
      addNotePromptIsActive: false,
      dragAndDropIsActive: false,
    } as RootState;
  },
  actions: {
    getNotes() {
      if (localStorage.getItem("notes") !== null) {
        this.notes = JSON.parse(localStorage.getItem("notes")!);
      }
      if (localStorage.getItem("pinnedNotes") !== null) {
        this.pinnedNotes = JSON.parse(localStorage.getItem("pinnedNotes")!);
      }
    },
    addNote(note: Partial<Note>) {
      this.notes.push({
        ...note,
        id: self.crypto.randomUUID(),
      });
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    pinNote(note: Note) {
      this.deleteNote(note.id);
      this.pinnedNotes.push(note);
      localStorage.setItem("pinnedNotes", JSON.stringify(this.pinnedNotes));
    },
    unpinNote(note: Note) {
      this.pinnedNotes = this.pinnedNotes.filter(
        (pinnedNote) => pinnedNote.id !== note.id
      );
      this.notes.push(note);
      localStorage.setItem("pinnedNotes", JSON.stringify(this.pinnedNotes));
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    deletePinnedNote(id: Note["id"]) {
      this.pinnedNotes = this.pinnedNotes.filter(
        (pinnedNote) => pinnedNote.id !== id
      );
      localStorage.setItem("pinnedNotes", JSON.stringify(this.pinnedNotes));
    },
    deleteNote(id: Note["id"]) {
      this.notes = this.notes.filter((note) => note.id !== id);
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    editNote(changedNote: Note) {
      this.notes = this.notes.map((note) => {
        if (note.id === changedNote.id) {
          return changedNote;
        }
        return note;
      });
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    editPinnedNote(changedPinnedNote: Note) {
      this.pinnedNotes = this.pinnedNotes.map((pinnedNote) => {
        if (pinnedNote.id === changedPinnedNote.id) {
          return changedPinnedNote;
        }
        return pinnedNote;
      });
      localStorage.setItem("pinnedNotes", JSON.stringify(this.pinnedNotes));
    },
    toggleAddNotePrompt(bool) {
      this.addNotePromptIsActive = bool;
    },
    toggleDragAndDrop(bool) {
      this.dragAndDropIsActive = bool;
    },
    getNoteById(id: Note["id"]) {
      return (
        this.notes.find((note) => note.id === id) ||
        this.pinnedNotes.find((note) => note.id === id)
      );
    },
  },
});

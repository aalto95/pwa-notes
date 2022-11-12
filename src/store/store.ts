import { defineStore } from "pinia";
import { Note } from "../models/Note";
import { Notification } from "../models/Notification";
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application

export type RootState = {
  notes: Note[];
  notification: Notification;
  db: IDBDatabase | null;
};

export const useStore = defineStore("notes", {
  state: () => {
    return {
      notes: [],
      notification: {
        type: 0,
        duration: 750,
        visible: false,
      },
      db: null,
    } as RootState;
  },
  actions: {
    getNotes(): void {
      if (localStorage.getItem("notes") !== null) {
        this.notes = JSON.parse(localStorage.getItem("notes")!);
      }
    },
    invokeNotification(type: 0 | 1 | 2): void {
      this.notification.type = type;
      this.notification.visible = true;
      setTimeout(() => {
        this.notification.visible = false;
      }, this.notification.duration);
    },
    addNote(note: Partial<Note>): void {
      this.notes.push({
        ...note,
        id: self.crypto.randomUUID(),
      });
      this.invokeNotification(0);
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    deleteNote(id: Note["id"]): void {
      this.notes = this.notes.filter((note) => note.id !== id);
      this.invokeNotification(2);
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    editNote(changedNote: Note): void {
      this.notes = this.notes.map((note) => {
        if (note.id === changedNote.id) {
          return changedNote;
        }
        return note;
      });
      this.invokeNotification(1);
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

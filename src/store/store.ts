import { db } from '@/db/dexie';
import { Note } from '@/models/Note';
import { Notification } from '@/models/Notification';
import { defineStore } from 'pinia';
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application

export type RootState = {
  notes: Note[];
  darkMode: boolean | null;
  notification: Notification;
};

export const useStore = defineStore('notes', {
  state: () => {
    return {
      notes: [],
      darkMode: null,
      notification: {
        type: 0,
        duration: 750,
        visible: false
      }
    } as RootState;
  },
  actions: {
    getNotes(): void {
      if (localStorage.getItem('notes') !== null) {
        this.notes = JSON.parse(localStorage.getItem('notes')!);
      }
    },
    invokeNotification(type: 0 | 1 | 2): void {
      this.notification.type = type;
      this.notification.visible = true;
      setTimeout(() => {
        this.notification.visible = false;
      }, this.notification.duration);
    },
    addNote(note: Omit<Note, 'id'>): void {
      this.notes.push({
        ...note,
        id: self.crypto.randomUUID()
      });
      this.invokeNotification(0);
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    deleteNote(id: Note['id'], imageId: Note['imageId']): void {
      this.notes = this.notes.filter((note) => note.id !== id);
      this.invokeNotification(2);
      localStorage.setItem('notes', JSON.stringify(this.notes));
      db.files.where('id').equals(imageId).delete();
    },
    editNote(changedNote: Note): void {
      this.notes = this.notes.map((note) => {
        if (note.id === changedNote.id) {
          return changedNote;
        }
        return note;
      });
      this.invokeNotification(1);
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    getNoteById(id: Note['id']): Note | undefined {
      return this.notes.find((note) => note.id === id);
    }
  }
});

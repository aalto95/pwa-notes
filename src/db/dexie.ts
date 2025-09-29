import Dexie from 'dexie';

export interface File {
  id: string;
  data: string; // base64 encoded data
  mimeType: string;
  createdAt: Date;
}

export class NotesDexie extends Dexie {
  files!: Dexie.Table<File, string>;

  constructor() {
    super('notesDatabase');
    this.version(1).stores({
      files: 'id, data, createdAt'
    });
  }
}

export const db = new NotesDexie();

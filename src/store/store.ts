import { defineStore } from "pinia";
import { db } from "@/db/dexie";
import type { Note } from "@/models/Note";
import type { Notification } from "@/models/Notification";
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application

export type RootState = {
	notes: Note[];
	darkMode: boolean | null;
	notification: Notification;
};

export const useStore = defineStore("notes", {
	state: () => {
		return {
			notes: [],
			darkMode: null,
			notification: {
				type: 0,
				duration: 750,
				visible: false,
			},
		} as RootState;
	},
	actions: {
		getNotes(): void {
			try {
				const storedNotes = localStorage.getItem("notes");
				if (storedNotes !== null && storedNotes !== "[]") {
					const parsedNotes = JSON.parse(storedNotes);
					// Validate that parsed data is an array
					if (Array.isArray(parsedNotes)) {
						this.notes = parsedNotes;
					} else {
						console.warn("Invalid notes data in localStorage, resetting to empty array");
						this.notes = [];
						localStorage.setItem("notes", JSON.stringify([]));
					}
				}
			} catch (error) {
				console.error("Error loading notes from localStorage:", error);
				this.notes = [];
				// Reset corrupted data
				localStorage.setItem("notes", JSON.stringify([]));
			}
		},
		invokeNotification(type: 0 | 1 | 2): void {
			this.notification.type = type;
			this.notification.visible = true;
			setTimeout(() => {
				this.notification.visible = false;
			}, this.notification.duration);
		},
		addNote(note: Omit<Note, "id">): void {
			try {
				const newNote: Note = {
					...note,
					id: crypto.randomUUID(),
				};

				this.notes.push(newNote);
				this.invokeNotification(0);
				localStorage.setItem("notes", JSON.stringify(this.notes));
			} catch (error) {
				console.error("Error adding note:", error);
				this.invokeNotification(2); // Show error notification
			}
		},
		async deleteNote(id: Note["id"], imageId: Note["id"]): Promise<void> {
			try {
				this.notes = this.notes.filter((note) => note.id !== id);
				this.invokeNotification(2);
				localStorage.setItem("notes", JSON.stringify(this.notes));

				// Delete associated image file
				if (imageId) {
					await db.files.where("id").equals(imageId).delete();
				}
			} catch (error) {
				console.error("Error deleting note:", error);
				this.invokeNotification(2); // Show error notification
			}
		},
		editNote(changedNote: Note): void {
			try {
				const noteIndex = this.notes.findIndex((note) => note.id === changedNote.id);
				if (noteIndex === -1) {
					console.warn("Note not found for editing:", changedNote.id);
					return;
				}

				this.notes[noteIndex] = changedNote;
				this.invokeNotification(1);
				localStorage.setItem("notes", JSON.stringify(this.notes));
			} catch (error) {
				console.error("Error editing note:", error);
				this.invokeNotification(2); // Show error notification
			}
		},
		getNoteById(id: Note["id"]): Note | undefined {
			return this.notes.find((note) => note.id === id);
		},
	},
});

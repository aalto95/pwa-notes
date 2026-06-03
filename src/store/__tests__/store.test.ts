import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useStore } from "@/store/store";

vi.mock("@/db/dexie", () => ({
	db: {
		files: {
			where: vi.fn(() => ({
				equals: vi.fn(() => ({
					delete: vi.fn(),
				})),
			})),
		},
	},
}));

describe("notes store", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
		localStorage.clear();
	});

	it("starts with empty notes and null darkMode", () => {
		const store = useStore();
		expect(store.notes).toEqual([]);
		expect(store.darkMode).toBeNull();
	});

	it("adds a note", () => {
		const store = useStore();
		store.addNote({ title: "Test", text: "Hello", imageId: "" });
		expect(store.notes).toHaveLength(1);
		expect(store.notes[0].title).toBe("Test");
		expect(store.notes[0].id).toBeDefined();
	});

	it("deletes a note", () => {
		const store = useStore();
		store.addNote({ title: "A", text: "", imageId: "" });
		store.addNote({ title: "B", text: "", imageId: "" });
		const [first] = store.notes;
		store.deleteNote(first.id, "");
		expect(store.notes).toHaveLength(1);
		expect(store.notes[0].title).toBe("B");
	});

	it("edits a note", () => {
		const store = useStore();
		store.addNote({ title: "Original", text: "", imageId: "" });
		const note = store.notes[0];
		store.editNote({ ...note, title: "Updated" });
		expect(store.notes[0].title).toBe("Updated");
	});

	it("finds a note by id", () => {
		const store = useStore();
		store.addNote({ title: "FindMe", text: "", imageId: "" });
		const note = store.notes[0];
		expect(store.getNoteById(note.id)).toEqual(note);
		expect(store.getNoteById("nonexistent")).toBeUndefined();
	});

	it("loads notes from localStorage on getNotes", () => {
		const data = [{ id: "1", title: "Stored", text: "", imageId: "" }];
		localStorage.setItem("notes", JSON.stringify(data));
		const store = useStore();
		store.getNotes();
		expect(store.notes).toEqual(data);
	});

	it("handles corrupted localStorage gracefully", () => {
		localStorage.setItem("notes", "{invalid json");
		const store = useStore();
		store.getNotes();
		expect(store.notes).toEqual([]);
	});

	it("invokes notification with correct type", async () => {
		const store = useStore();
		store.invokeNotification(0);
		expect(store.notification.visible).toBe(true);
		expect(store.notification.type).toBe(0);
	});
});

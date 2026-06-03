import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import NoteItem from "@/components/NoteItem.vue";
import type { Note } from "@/models/Note";

const note: Note = { id: "1", title: "My Note", text: "Some content", imageId: "" };

function factory() {
	return mount(NoteItem, {
		props: { note },
		global: {
			plugins: [createPinia()],
			stubs: {
				RouterLink: true,
			},
		},
	});
}

describe("NoteItem", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
		localStorage.clear();
	});

	it("renders note title", () => {
		const wrapper = factory();
		expect(wrapper.text()).toContain("My Note");
	});

	it("shows text when toggle is clicked", async () => {
		const wrapper = factory();
		const toggle = wrapper.find("button");
		await toggle.trigger("click");
		expect(wrapper.text()).toContain("Some content");
	});

	it("shows action bar on action button click", async () => {
		const wrapper = factory();
		const buttons = wrapper.findAll("button");
		const actionBtn = buttons[1];
		await actionBtn.trigger("click");
		expect(wrapper.find("button").exists()).toBe(true);
	});
});

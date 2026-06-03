import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Button from "primevue/button";
import PrimeVue from "primevue/config";
import { beforeEach, describe, expect, it } from "vitest";
import AppHeader from "@/components/AppHeader.vue";

function factory() {
	return mount(AppHeader, {
		global: {
			plugins: [createPinia(), PrimeVue],
			stubs: {
				RouterLink: {
					template: "<a><slot /></a>",
				},
			},
			components: {
				Button,
			},
		},
	});
}

describe("AppHeader", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
		localStorage.clear();
	});

	it("renders the header", () => {
		const wrapper = factory();
		expect(wrapper.find("header").exists()).toBe(true);
	});

	it("displays the title", () => {
		const wrapper = factory();
		expect(wrapper.text()).toContain("Notes");
	});
});

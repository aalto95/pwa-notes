import { beforeEach, describe, expect, it, vi } from "vitest";
import { useErrorHandler } from "@/composables/useErrorHandler";

vi.stubGlobal("Notification", {
	permission: "denied",
});

describe("useErrorHandler", () => {
	beforeEach(() => {
		const handler = useErrorHandler();
		handler.clearAllErrors();
	});

	it("adds and retrieves errors", () => {
		const handler = useErrorHandler();
		handler.addError({ message: "test error", code: "TEST_ERROR" });
		const errors = handler.getErrors();
		expect(errors).toHaveLength(1);
		expect(errors[0].message).toBe("test error");
		expect(errors[0].code).toBe("TEST_ERROR");
		expect(errors[0].id).toBeDefined();
		expect(errors[0].timestamp).toBeDefined();
	});

	it("clears a single error by id", () => {
		const handler = useErrorHandler();
		handler.addError({ message: "error 1" });
		handler.addError({ message: "error 2" });
		const [first] = handler.getErrors();
		handler.clearError(first.id);
		expect(handler.getErrors()).toHaveLength(1);
		expect(handler.getErrors()[0].message).toBe("error 2");
	});

	it("clears all errors", () => {
		const handler = useErrorHandler();
		handler.addError({ message: "e1" });
		handler.addError({ message: "e2" });
		handler.clearAllErrors();
		expect(handler.hasErrors()).toBe(false);
	});

	it("reports hasErrors correctly", () => {
		const handler = useErrorHandler();
		expect(handler.hasErrors()).toBe(false);
		handler.addError({ message: "error" });
		expect(handler.hasErrors()).toBe(true);
	});

	it("sends toast if set", () => {
		const handler = useErrorHandler();
		const toastAdd = vi.fn();
		handler.setToast({ add: toastAdd });
		handler.addError({ message: "toast error" });
		expect(toastAdd).toHaveBeenCalledWith(
			expect.objectContaining({ severity: "error", detail: "toast error" }),
		);
	});

	it("does not throw when notification permission is denied", () => {
		const handler = useErrorHandler();
		expect(() => handler.addError({ message: "safe" })).not.toThrow();
	});

	it("does not call toast when not set", () => {
		const handler = useErrorHandler();
		handler.addError({ message: "no toast" });
		expect(handler.getErrors()).toHaveLength(1);
	});
});

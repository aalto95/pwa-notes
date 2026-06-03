import { describe, expect, it } from "vitest";
import { base64ToDataUrl, isValidImageFile } from "@/utils/imageUtils";

describe("imageUtils", () => {
	describe("base64ToDataUrl", () => {
		it("returns a valid data URL", () => {
			const result = base64ToDataUrl("abc123", "image/png");
			expect(result).toBe("data:image/png;base64,abc123");
		});
	});

	describe("isValidImageFile", () => {
		it("returns true for valid image types", () => {
			const validMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
			for (const mime of validMimes) {
				const file = new File([""], "test", { type: mime });
				expect(isValidImageFile(file)).toBe(true);
			}
		});

		it("returns false for invalid image types", () => {
			const file = new File([""], "test.txt", { type: "text/plain" });
			expect(isValidImageFile(file)).toBe(false);
		});
	});
});

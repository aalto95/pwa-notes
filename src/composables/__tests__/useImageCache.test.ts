import { describe, expect, it, vi } from "vitest";
import { useImageCache } from "@/composables/useImageCache";

describe("useImageCache", () => {
	it("caches and retrieves an image", async () => {
		const { loadImage } = useImageCache();
		const result = await loadImage("img1", async () => "data:image/png;base64,abc");
		expect(result).toBe("data:image/png;base64,abc");
	});

	it("returns cached value on second load", async () => {
		const { loadImage } = useImageCache();
		const fn = vi.fn(async () => "data:cached");
		const first = await loadImage("img2", fn);
		expect(first).toBe("data:cached");
		expect(fn).toHaveBeenCalledTimes(1);
		const second = await loadImage("img2", fn);
		expect(second).toBe("data:cached");
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it("clears the cache", async () => {
		const { loadImage, clearCache, getCacheStats } = useImageCache();
		await loadImage("img3", async () => "data:img");
		clearCache();
		const stats = getCacheStats();
		expect(stats.count).toBe(0);
	});
});

import { describe, expect, it } from "vitest";
import { ANNOUNCE_SCHEMA } from "../src/routes/baseApi.js";

const announcePayload = {
	name: "Family.Guy.S24E12.MULTI.1080p.WEB.H264-HiggsBoson",
	guid: "https://digitalcore.club/api/v1/torrents/download/2465381/passkey",
	link: "https://digitalcore.club/api/v1/torrents/download/2465381/passkey",
	tracker: "digitalcore",
};

describe("announce API validation", () => {
	it("accepts announces without a cookie", () => {
		expect(ANNOUNCE_SCHEMA.parse(announcePayload)).toEqual(announcePayload);
	});

	it("treats a blank announce cookie as omitted", () => {
		expect(
			ANNOUNCE_SCHEMA.parse({
				...announcePayload,
				cookie: "   ",
			}),
		).toEqual(announcePayload);
	});
});

class a extends n {
	constructor(
		t,
		s = { headers: { "content-type": "application/json;charset=UTF-8" } },
	) {
		super(JSON.stringify(t), s);
	}
}
(await import("itty-router")).Router().post("/discord", async (e) => {
	const t = await e.json();
	if (t.type === (await import("discord-interactions")).InteractionType.PING)
		return new a({
			type: (await import("discord-interactions")).InteractionResponseType
				.PONG,
		});
	if (
		t.type ===
		(await import("discord-interactions")).InteractionType
			.APPLICATION_COMMAND
	)
		switch (t.data.name.toLowerCase()) {
			case "invite":
				return new a({
					type: 4,
					data: {
						content: `https://discord.com/oauth2/authorize?client_id=${
							r.parse(process.env).DISCORD_APPLICATION_ID
						}&scope=applications.commands`,
						flags: 64,
					},
				});
			default:
				return new a({ error: "Unknown Type" }, { status: 400 });
		}
	return new a({ error: "Unknown Type" }, { status: 400 });
}),
	(await import("itty-router"))
		.Router()
		.all("*", () => new n("404 | Not Found.", { status: 404 }));
var o = {
	async fetch(e, { DISCORD_PUBLIC_KEY: t } = r.parse(process.env)) {
		return e.method === "POST" &&
			!(await import("discord-interactions")).verifyKey(
				await e.clone().arrayBuffer(),
				e.headers.get("x-signature-ed25519") ?? "",
				e.headers.get("x-signature-timestamp") ?? "",
				t,
			)
			? (console.error("Invalid Request"),
			  new n("Bad request signature.", { status: 401 }))
			: (await import("itty-router")).Router().handle(e);
	},
};
const { default: r } = await import("./Environment.js"),
	{ Response: n } = await import("@cloudflare/workers-types");
export { r as Environment, n as Response, o as default };

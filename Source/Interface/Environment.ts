const { default: _Object } = await import("../Object/Environment.js");

export type Type = Zod.infer<typeof _Object>;

export type { Type as default };
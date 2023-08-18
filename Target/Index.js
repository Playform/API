import{Response as r}from"@cloudflare/workers-types";import{InteractionResponseType as p,InteractionType as a,verifyKey as c}from"discord-interactions";import{Router as u}from"itty-router";import i from"./Library/Environment.js";class s extends r{constructor(n,t={headers:{"content-type":"application/json;charset=UTF-8"}}){super(JSON.stringify(n),t)}}const o=u();o.post("/discord",async(e,n)=>{const t=await e.json();if(t.type===a.PING)return new s({type:p.PONG});if(t.type===a.APPLICATION_COMMAND)switch(t.data.name.toLowerCase()){case"invite":return new s({type:4,data:{content:`https://discord.com/oauth2/authorize?client_id=${n.DISCORD_APPLICATION_ID}&scope=applications.commands`,flags:64}});default:return new s({error:"Unknown Type"},{status:400})}return new s({error:"Unknown Type"},{status:400})}),o.all("*",()=>new r("404 | Not Found.",{status:404}));var I={async fetch(e,n=i){return e.method==="POST"&&!c(await e.clone().arrayBuffer(),e.headers.get("x-signature-ed25519")??"",e.headers.get("x-signature-timestamp")??"",n.DISCORD_PUBLIC_KEY)?(console.error("Invalid Request"),new r("Bad request signature.",{status:401})):o.handle(e,i)}};export{I as default};
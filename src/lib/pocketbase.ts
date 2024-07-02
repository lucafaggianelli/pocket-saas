import PocketBase from "pocketbase";

// During development, the PocketBase server is running on localhost:8090
// and the frontend is running on another port, so we need to specify the host
// But in production, the frontend is served by PocketBase itself, so we can use '/'
const pbHost = import.meta.env.PROD ? "/" : "http://127.0.0.1:8090";

export const pb = new PocketBase(pbHost);

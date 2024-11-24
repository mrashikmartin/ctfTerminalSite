import { writable } from "svelte/store";
import type { UserSchema } from "./schemas";

export const userStore = writable<UserSchema | undefined>(undefined);
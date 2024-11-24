import { authStateStore, domainStore } from "$lib/stores/firebaseStore";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";
import { getDomains } from "$lib/firebase/domainRepo";

export const load: PageLoad = async () => {
    if(get(domainStore) === undefined && get(authStateStore) === true) {
        await getDomains();
    }
}
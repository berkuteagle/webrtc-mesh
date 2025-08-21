const _HASH_CACHE = {};

export async function hash(value: string) {
    return _HASH_CACHE[value] ??= Array.from(
        new Uint8Array(
            await crypto.subtle.digest(
                "SHA-1",
                new TextEncoder().encode(value),
            ),
        ),
    ).map((b) => b.toString(36)).join("");
}

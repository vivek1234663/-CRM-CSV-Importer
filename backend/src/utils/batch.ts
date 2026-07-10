export function createBatches<T>(
    data: T[],
    size: number
) {
    const batches = [];

    for (let i = 0; i < data.length; i += size) {
        batches.push(data.slice(i, i + size));
    }

    return batches;
}
function createItems(): string[] {
    const itemsObj: string[] = [];

    for (let i = 0; i < 100; i++) {
        itemsObj[i] = `Item ${i}`;
    }

    return itemsObj;
}

export default createItems();
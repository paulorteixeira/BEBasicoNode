function generateRandomDate(from: any, to: any) {
    return new Date(
        from.getTime() +
        Math.random() * (to.getTime() - from.getTime()),
    ).toISOString();
}
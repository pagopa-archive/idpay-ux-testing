module.exports = {
    preset: 'jest-puppeteer',
    testTimeout: 60000,
    reporters: [
        "default",
        ["jest-junit", { outputDirectory: "__tests__/reports" }],
    ]
}
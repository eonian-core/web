// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Setup test environment for endpoints.ts
process.env.NEXT_PUBLIC_BSC_GRAPH_URL = 'test value'
process.env.NEXT_PUBLIC_ENVIRONMENT = 'DEVELOPMENT'

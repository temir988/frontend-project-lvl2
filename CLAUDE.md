Default to using Node.js and npm.

- Use `node <file>` instead of `ts-node <file>`
- Use `npm install` instead of `bun install`
- Use `npm run <script>` instead of `bun run <script>`

## Testing

```bash
npm run lint
npm run typecheck
npm test
```

To run tests use vitest:

```ts
import { test, expect } from "vitest";
```

For more information, see the vitest docs at https://vitest.dev/guide/

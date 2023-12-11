
## Configuration

To ensure that the application operates correctly within your environment, you might need to configure it according to your specific needs. This section outlines the necessary steps to configure your instance of _Clean Architecture MVVM for React_.

### Environment Variables

The project utilizes environment variables to manage configurations that differ across development, test, and production environments. You will find a `.env.example` file at the project's root, listing all the necessary environment variables.

To configure the environment variables:

1. Copy the `.env.example` file and rename the copy to `.env`.
```bash
cp .env.example .env
```

2. Open the `.env` file and fill in the required values, for example:
```plaintext
NXT_APP_API_ENDPOINT=https://your-api-endpoint.com
NXT_APP_OTHER_CONFIG=yourConfigValue
```

Ensure that you never commit the `.env` file to your repository since it can contain sensitive information.

### Environment Variables Configuration

To guarantee that the application functions correctly and securely, we use environment variables. These variables are crucial for managing essential settings and keys necessary for the application's operation across various environments.

Our project employs `zod` to define and validate the environment variable schema. Below is the current schema found in `env.ts`, which should be updated whenever you add new environment variables.

### Current Environment Variable Schema

The `env.ts` file contains a `zod` schema that validates and transforms environment variables. Below is an excerpt from the current schema:

```typescript
// env.ts
import { z } from 'zod';

export const envSchema = z.object({
  // Example of a validated environment variable
  NXT_APP_API_ENDPOINT: z
    .string({
      invalid_type_error: "NXT_APP_API_ENDPOINT must be a valid URL",
      required_error: "NXT_APP_API_ENDPOINT is required",
    })
    .url("NXT_APP_API_ENDPOINT must be a valid URL")
    .transform((value) => new URL(value)),
  // ... other validations
});
```

### Important Reminder

**Remember:** Environment variables are sensitive and should never be included in version control, especially if they contain secret keys or credentials. Make sure that the `.env` file is properly listed in your `.gitignore`.

### Additional Configuration

#### Changing the Prefix of Environment Variables

By default, the project uses `NXT_` as the prefix for environment variables. If you wish to change this prefix to something more specific to your project or organization, follow these steps:

1. Open the `vite.config.ts` file located at the root of your project.
2. Locate the `envPrefix` configuration which is passed within the Vite options. For example:
```typescript
// vite.config.ts
export default defineConfig({
  // ... other configurations
  envPrefix: 'NXT_',
});
```
3. Replace `'NXT_'` with the prefix of your choice. For instance, if you want to use `MYAPP_` as the prefix, it would be:
```typescript
// vite.config.ts
export default defineConfig({
  // ... other configurations
  envPrefix: 'MYAPP_',
});
```

4. Update all occurrences of the environment variables in your project to use the new prefix.

#### Updating the `.env` File

After changing the prefix in `vite.config.ts`, make sure you also rename the environment variables in your `.env`, `.env.example`, and `env.ts` files to reflect the change.

#### Checking the Configuration

It is crucial to verify that your application functions properly after modifying the prefix of the environment variables. Launch your application in development mode to ensure that the variables are correctly detected and that the application behaves as expected.

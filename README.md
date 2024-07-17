# Getting Started with ShookMyBow

# Getting Started

Clone the repository with the server submodule:

```bash
git clone --recursive git@github.com:2k4sm/shook-my-bow.git
```

# Getting Started with the Backend.

To get started with ShookMyBowBackend, follow these steps:

1. Navigate to the project directory:

   ```bash
   cd ./shook-my-bow/shook-my-bow-backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   bun install
   ```

3. Set up the environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file:
     ```bash
       DATABASE_URL=<your-mongodb-url>
       secret_key_jwt=<secret-key>
       stripe_key=<stripe-key>
       EMAIL_PASS=<email-password>
       EMAIL_USER=<support-email>
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   bun run dev
   ```

# Getting Started with the Frontend.

To get started with shook-my-bow, follow these steps:

1. Navigate to the project directory:
	```bash
	cd ./shook-my-bow
	```

2. Install the dependencies:
	```bash
	npm install
	```
	or
	```bash
	bun install
	```

3. Start the development server:
	```bash
	npm run start
	```
	or
	```bash
	bun run start
	```

4. Open your browser and navigate to `http://localhost:PORT` to access shookmybow.

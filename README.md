# Form Builder

Form Builder is a web application for creating, managing, and filling dynamic forms. It features an admin panel for form CRUD operations, a form editor with preview and sidebar settings, and a public section for viewing and submitting forms. Forms are persisted in a PostgreSQL database using Drizzle ORM. The application is built with Next.js and TypeScript, and includes optional AI integration for field generation via chat.

## Features

### Admin Panel (Private Zone, Protected by Authentication)
- **CRUD for Forms**:
    - Create, edit, and delete forms.
    - Each form consists of fields with the following types:
        - **text**: Single-line text field.
            - Options: `label`, `placeholder`, `required`, `minLength`, `maxLength`.
        - **number**: Numeric single-line field.
            - Options: `label`, `placeholder`, `required`, `min`, `max`, `step`.
        - **textarea**: Multi-line text field.
            - Options: `label`, `placeholder`, `required`, `minLength`, `maxLength`, `rows`.

- **Form Editor**:
    - Screen for creating/editing forms with a live preview.
    - Clicking on a field opens a sidebar for configuring its settings.

- **Database Storage**:
    - Form structures are saved to the database via Drizzle ORM.

### Public Section
- **Main Page**:
    - Displays a list of available (published) forms.

- **Form Filling**:
    - Users can open a published form and fill it out.
    - After submission, a modal window displays the entered data for confirmation.

### Bonus Feature
- Integrate an **AI Agent** (e.g., using LangChain.js or Grok API) to assist in creating or editing fields via chat.
    - Example: User inputs "Add a required phone field" → AI generates the appropriate field configuration.

## Tech Stack
- **Main Language**: TypeScript (JavaScript)
- **Framework**: Next.js
- **Validation Library**: Zod
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **UI Library**: Tailwind CSS
- **API Protocol**: GraphQL (via Apollo Client/Server)
- **Code Quality Tools**: ESLint
- **Package Manager**: PNPM
- **Module Bundler**: Webpack (integrated with Next.js)
- **Environment**: Docker Compose (for database setup)

## Prerequisites
- Node.js (v18 or higher)
- PNPM
- Docker (for PostgreSQL via Docker Compose)
- PostgreSQL (if not using Docker)

## Installation

1. **Clone the Repository**:

``
git clone <repository-url>
cd form-builder
``
2. **Install Dependencies**:
   
``
pnpm install
``

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with the following content:
````dotenv
DATABASE_URL=postgres://postgres:root@localhost:5432/formbuilder
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_GROQ_API_KEY=use-your-grok-token
````

- `DATABASE_URL`: PostgreSQL connection string.
- `NEXTAUTH_SECRET`: Secret for authentication (generate a secure one for production).
- `NEXTAUTH_URL`: Base URL of the application.
- `NEXT_PUBLIC_GROQ_API_KEY`: API key for Groq (used for AI features; optional for bonus task).

4. **Set Up the Database**:

``docker-compose up -d
``
- Start the database:

``pnpm drizzle-kit generate && pnpm drizzle-kit migrate
``

or

``pnpm run start-base``

## Usage

1. Start the development server:
``pnpm dev
``

2. Access the app:
- Public: `http://localhost:3000` (main page with form list).
- Auth: `http://localhost:3000/auth/signin` (authentication page).
- Admin: `http://localhost:3000/admin/forms` (requires authentication).

3. **Authentication**:
- Sign in via NextAuth (configure providers as needed, e.g., credentials or OAuth).

4. **AI Integration (Bonus)**:
- Use the chat interface in the form editor to interact with the AI agent.
- Example prompt: "Add a required email field with placeholder 'Enter your email'".

## Project Structure
- `src/app`: Next.js pages and API routes.
- `src/components`: React components (e.g., FieldRenderer, FormEditor).
- `src/lib/db`: Drizzle ORM schemas and database setup.
- `src/lib/types`: TypeScript definitions (e.g., formTypes.ts).
- `src/lib/db/schemas`: Zod schemas for validation (e.g., formSchema.ts, fieldSchemas.ts).
- `src/lib/hooks`: Custom hooks (e.g., useCreateFormHook.ts).

## Contributing
Contributions are welcome! Fork the repo, create a branch, and submit a pull request.

## License
MIT License.
# Bubba Sticker AI

Bubba Sticker AI is a web application designed to generate custom stickers using AI technology. The application allows users to create, manage, and share their sticker designs seamlessly.

## Project Structure

The project is organized into several key directories and files:

- **app/**: Contains the main application files.
  - **page.tsx**: Main entry point for the application, rendering the image generator interface.
  - **layout.tsx**: Defines the layout structure, including providers for state management.
  - **globals.css**: Global styles for the application.
  - **account/**: Manages user subscription functionalities.
    - **page.tsx**: Subscription management interface.
  - **gallery/**: Generates optimized static image pages.
    - **[id]/page.tsx**: Displays images based on the provided ID.
  - **learn/**: Contains AI-searchable guide articles.
    - **[slug]/page.tsx**: Displays guide articles based on the slug.

- **components/**: Contains reusable components for the application.
  - **PromptBuilder/**: Components for assembling user prompts.
  - **ImagePreview/**: Components for displaying generated images and controls.
  - **Auth/**: Components for user authentication and profile display.
  - **Layout/**: Navigation and footer components.
  - **PricingTable.tsx**: Displays pricing options.
  - **SEO.tsx**: Handles SEO-related tasks.
  - **ui/**: Contains reusable UI components like buttons and modals.

- **lib/**: Contains utility files for various functionalities.
  - **firebase.ts**: Initializes Firebase client.
  - **openai.ts**: Interacts with the OpenAI API.
  - **stripe.ts**: Manages customer sessions with Stripe.
  - **pricing.ts**: Functions for determining pricing.
  - **promptTemplate.ts**: Assembles user input into prompts.

- **public/**: Contains static assets.
  - **logo.svg**: Site logo.
  - **favicon.ico**: Site favicon.
  - **sample-images/**: Example sticker images.

- **styles/**: Contains global styles.

- **Configuration Files**:
  - **tailwind.config.ts**: Tailwind CSS configuration.
  - **firebase.json**: Firebase configuration.
  - **.firebaserc**: Firebase project settings.
  - **next.config.js**: Next.js configuration.

## Getting Started

To get started with the Bubba Sticker AI project, clone the repository and install the necessary dependencies:

```bash
git clone <repository-url>
cd bubba-sticker-ai
npm install
```

## Usage

After installing the dependencies, you can run the application locally:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to access the application.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
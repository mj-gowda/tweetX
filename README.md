# **Features**

### **Authentication and Account Management**
Our system ensures seamless and secure user experiences:
- Users can sign up using email and password
- Users can sign up using third-party authentication providers such as Google and GitHub
- Users can log in using email and password
- Users can log out
- Users can manage their subscriptions and payments

### **Create Post**
- Users can create posts which is checked by zod and has max 100 characters limit.
- Users can access their posts, followers and following through their profile page.

### **Follow any user on the platform**
- Users can see all users and follow them.
- Users can see the posts of all the users they have followed in their feed page.

# **Tech Stack**

This web app utilizes a robust set of modern technologies to deliver a high-quality user experience:

## **Frontend**

- **[Next.js](https://nextjs.org/)**: A React-based framework offering tools and conventions for server-side rendered (SSR) and statically generated web applications.

- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework promoting highly customizable and responsive design.

- **[Shadcn UI](https://ui.shadcn.com/)**: A collection of reusable, accessible, and customizable components built with Radix UI and Tailwind CSS. Shadcn UI offers an easy start for developers, irrespective of their experience with component libraries.

## **Backend**

- **[Node.js](https://nodejs.org/en/)**: A JavaScript runtime environment that executes JavaScript code outside of a web browser.


- **[Firebase]()**: Firebase Firestore.

- **[Clerk Auth](https://clerk.com/)**: A user-friendly authentication and user management platform. Clerk provides multiple authentication strategies and a comprehensive user management system. It is secure, scalable, and easy to use, with customizable UI components.

- **[Zod](https://github.com/colinhacks/zod)**: A TypeScript-first schema declaration and validation library used for type-safe REST APIs.


## **AI and Media Generation**

- **[OpenAI](https://openai.com/)**: Utilized for generating text and images. OpenAI’s GPT-3.5 is used for text generation, and DALL-E for image generation.

- **[Replicate AI](https://replicate.com/)**: Used for generating music and videos based on user inputs.

Each technology in this stack plays a crucial role in delivering a seamless and dynamic user experience.



## 1. **Clone the Project Locally**
Open your terminal and use the following command to clone the project:
```sh
git clone https://github.com/mj-gowda/tweetX

```


## 3. **Set Up Environment Variables**
Create a copy of the `.env.example` file and rename it to `.env.local`. Populate the `.env.local` with the necessary secrets.

Here are instructions for getting some of these secrets:

**Clerk Auth**
1. Create an account on Clerk's website.
2. Create a new application.
3. In your application dashboard, go to the settings section.
4. You will find the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in this section.
5. Add these keys to your environment variables in `.env.local`.

You also need to add the following URLs for Clerk Auth:
```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```


## 2. **Install Dependencies**
Navigate to the project's root directory and install the required dependencies using the following command:
```sh
pnpm install
```

## 3. **Run Project**
Once you've set up the environment variables, Prisma, and Stripe, use the following commands to run the project:

In one terminal, run the Next.js server:
```sh
pnpm run dev
```

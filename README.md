# Nepali Calendar

## Project Description

In today's digital age, finding out what today's date is in the Nepali calendar is easy, thanks to the plethora of online calendars and patros. However, these platforms are often cluttered with ads and unnecessary content. Our project aims to solve this by providing a simple, ad-free calendar that includes public holidays. This open-source project can be used for personal projects or organizations, but creating copies for sale is not allowed. We are continuously adding more features, so be sure to check out our roadmap.

We have also introduced a basic API for date conversion and to get the current date in AD or BS. The available endpoints are:

- `/api/convert/ad-bs/YYYY-MM-DD` to convert a date from AD to BS.
- `/api/convert/bs-ad/YYYY-MM-DD` to convert a date from BS to AD.
- To get today's date, you can simply use "today" in the endpoint `/api/convert/ad-bs/today`.

## Getting Started

To start and run the project locally, follow the standard Next.js documentation:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/). You are free to use and adapt the project for personal and organizational use, but commercial use is not permitted.

## Roadmap

- [ ] Obtain a .com.np domain
- [ ] Add more API endpoints with documentation
- [ ] Simplify the UI/UX
- [ ] Introduce fully customizable features
- [ ] Add a feature to create custom calendars for personal use and organizations
- [ ] Open to more ideas and contributions

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

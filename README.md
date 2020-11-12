  <h3 align="center"><a href="https://presentation-helper.vercel.app">presentation-helper.vercel.app</a></h3>
<h3 align="center">
  <img src="https://www.flaticon.com/svg/static/icons/svg/3534/3534083.svg" alt="Logo" height="100">
</h3>

<h3 align="center">
  Small tool to help you and your attendees ace in presentations. Create a room and share it in seconds. From that point on you can send snippets and links to the attendes in the room immediately.
</h3>

<br />


### Features
* **Simple** 💡 - create room and share content in seconds
* **Fast** 🚀 - Static + realtime updates with [Cloud Firestore](https://firebase.google.com/docs/firestore)
* **Scalable** 🌍 - [Next.js ISG](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration) combined with [Cloud Firestore](https://firebase.google.com/docs/firestore) allows us to create new URL for the rooms on the fly
* **Modern** 🛸 - built using fresh frameworks
* **Installable** 📱 - the web application is installable as a PWA offering a similar to native experience in all devices

#### Upcoming features
*  

### Technologies used
* made with [Next.js](https://presentation-helper.vercel.app) <img src="https://api.iconify.design/logos-nextjs.svg" alt="Next.js logo" width="20">
* persistent data (rooms and its content) in [Cloud Firestore](https://firebase.google.com/docs/firestore) <img src="https://api.iconify.design/logos:firebase.svg" alt="Firebase logo" width="9">
* styling with [tailwindcss](https://tailwindcss.com/) <img src="https://api.iconify.design/logos:tailwindcss-icon.svg" alt="Tailwind logo" width="25">
* icons from [Flaticon](https://www.flaticon.com/) <img src="https://media.flaticon.com/dist/min/img/logo/flaticon_negative.svg" alt="Flaticon logo" width="40">
* deployed in [Vercel](http://vercel.com/) <img src="https://logovtor.com/wp-content/uploads/2020/10/vercel-inc-logo-vector.png" alt="Vercel logo" width="40">

### Run in development mode
What you need:
* **backend**: create a firebase account and project
  * create firebase project
  * create web application in firebase project
  * create cloud firestore in firebase project 
  * grab *apiKey*, *databaseURL* and *projectId* from firebase configuration object - [more info in firebase docs](https://firebase.google.com/docs/web/setup#node.js-apps)

* **frontend**: this repository
```sh
git clone https://github.com/jose-donato/presentation-helper
cd presentation-helper
npm i
touch .env.local
npm run dev
```

`.env.local` file should look similar to this but with the credentials you grab from firebase:
```
NEXT_PUBLIC_FIREBASE_API_KEY="XXX"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YYY.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YYY"
```

### App preview
> The application is live, you can try it [here](https://presentation-helper.vercel.app)

![description](url)


### Scores
> carbon

> lighthouse



### Funding
I'm starting my career and at the same time finishing my masters' in Cyber Security. If I helped you in any way please consider to support me in [GitHub](https://github.com/sponsors/jose-donato) or [by buying me a coffee](https://www.buymeacoffee.com/josedonato).


### Contributing
Contributions are welcomed. 


### License
This project is licensed under MIT. Feel free to use it where you need. However, consider to support me if my work has helped you.

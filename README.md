# 🎮 BOBALAB Guide to Game-Building in Qualtrics

## 📖 Introduction
This guide is to help new BOBALAB game-builders with an easy game building process with two phases: web dev and Qualtrics port. I have added a template here for Phase 1 fully commented, and will share link to my Phase 2 Qualtrics link as a reference. This is by no means the ONLY way or even the BEST way, but it is in my opinion the simplest and pain-free way of being able to port on Qualtrics, while avoiding directly coding a game into Qualtrics.

Feel free to raise issues if something is unclear or not working, I'll try to respond as soon as possible. Or contact me at Kaijen on Discord.

## 🗂 Table of Contents
- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Tech Stack](#tech-stack)
- [Phase 1: Building on Web](#phase-1-building-on-web)
- [Phase 2: Porting to Qualtrics](#phase-2-porting-to-qualtrics)

## 💻 Tech Stack and Important Links
1) **HTML (HyperText Markup Language)**: The standard markup language used to create and structure sections on the web, such as headings, paragraphs, and links.
2) **CSS (Cascading Style Sheets)**: A stylesheet language used to describe the presentation of a document written in HTML, controlling layout, colors, and fonts.
3) **JavaScript**: A high-level, dynamic scripting language essential for creating interactive features on websites, enabling the manipulation of webpage elements.
4) **Qualtrics**: A cloud-based SECURE platform that provides tools for collecting and analyzing data for market research or in our case, user interactions.
   
## 🌐 Phase 1: Building on Web
### Step 1: Clone Starter Repo
1) Fork this project (create your own copy basically)
2) Clone your copied project locally using `git clone "https://github.com/<YOUR_USERNAME>/<YOUR_PROJECT_NAME>.git"`
3) Once you make changes, you can update them on your github through `git add .` -> `git commit -m "message"` -> `git push origin main`
### Step 2: Understand Starter Repo
1) First note there are four main files / folders
   - `index.html` -> Where you build components and layout for your game
   - `style.css` -> Where you can style these components
   - `script.js` -> Where all the magic of the game happens, primarily utilizing an object called Game
   - `images` -> A folder to keep all images and assets used
2) Go through each file and read the comments (2-3 min. read).
3) Almost every BOBALAB game contains these 3 components, which are all set up for you in this repo:
   -    Changing the parameters of a game through a JSON object (in the web version we use a JavaScript object `testInput`)
   -    Keeping track of player movements and timings through a playerString (in the web version we use an instance variable `moveString`)
   -    Moving through different pages (in the web version we use `this.show()` and `this.hide()` to show / hide specific pages as needed)
### Step 3: Build your Full Game
1) Build it to completion! Follow the Game structure, add instance variables, methods, and subclasses as needed. Take a look [here](https://github.com/kjeelani/food-truck-game) as a reference.
2) 

## 🚀 Phase 2: Porting to Qualtrics
### Step 1: Set Up Qualtrics Survey
1) Log into [Berkeley Qualtrics](https://berkeley.qualtrics.com/) and create a new survey. It should look like below:
![image](https://github.com/kjeelani/bobalab-gamebuilding-template/assets/47492167/e68c5d99-5128-4c5f-8911-f3731ca5059d)
2) Delete the current multiple-choice question and create a new Heat Map question.
   
### Step 2: Port HTML, CSS, and JavaScript to Qualtrics
1) Port HTML by clicking on the question title -> Rich Content Editor -> `<>` icon and pasting your HTML
![image](https://github.com/kjeelani/bobalab-gamebuilding-template/assets/47492167/db5e3071-0f36-43e7-b2ef-25b4e9464220)
![image](https://github.com/kjeelani/bobalab-gamebuilding-template/assets/47492167/ad8a7a25-ef25-4dde-86dd-9df968bf4965)
2) Port CSS by clicking on "Look and Feel" on the left -> Style -> Custom CSS (paste CSS here) -> Apply Changes
![image](https://github.com/kjeelani/bobalab-gamebuilding-template/assets/47492167/88677c3d-cf2a-4d70-b1a2-4a5a46bcabed)
![image](https://github.com/kjeelani/bobalab-gamebuilding-template/assets/47492167/c3038720-979e-40b3-b2d4-7b4c51b5a22a)
3) Port JavaScript by clicking on JavaScript in the question editor and pasting your JS in addOnload() function
![image](https://github.com/kjeelani/bobalab-gamebuilding-template/assets/47492167/ebf949bc-537d-4585-9d03-8c9267fd64af)
![image](https://github.com/kjeelani/bobalab-gamebuilding-template/assets/47492167/a4dbc7a7-b5b6-4f18-9914-f7d1c807521e)

### Step 3: Clean up JS
There are some important changes that need to be made in the Qualtrics JS.
1) The Submit Button in Qualtrics needs to be disabled until you want to enable it. SOLUTION:
```js
// Put this at the top of your JavaScript. Call enableNextButton() when the game is over
let Q = this;
Q.disableNextButton();
let enableNextButton = () => {Q.enableNextButton()};
```
2) You CANNOT use string template literals in Qualtrics (The $ is reserved for Qualtrics embeds). SOLUTION:
```js
// put this function at the top of your JavaScript
f(template, values) {
    return template.replace(/!\{(\w+)\}/g, (match, key) => {
        return values[key] !== undefined ? values[key] : '';
    });
}

f('We have !{number} !{object}.', {number: 10, object: "lightbulbs"}); // Returns "We have 10 lightbulbs."
```

### Step 4: Storing playerStr on submission
1) Go to Survey Flow tab on the left, then add a new Embedded Data element
2) Create a playerStr field, BUT DON'T SET IT'S VALUE
![image](https://github.com/kjeelani/bobalab-gamebuilding-template/assets/47492167/558e53ba-b9ba-43ac-b35f-403f37fc38f0)
3) Paste this code when you are ready to save your playerStr
```js
Qualtrics.SurveyEngine.setEmbeddedData( 'playerStr', playerStr ); //change playerStr when necessary
```

### Step 5: Upload testInput object as JSON
1) For BOBALAB, you will be asked to create multiple JSON files hosted online to be changed easily by others externally.
2) You can do so by following the instructions on our [bobalab-jsons](https://github.com/kjeelani/bobalab-jsons) repo









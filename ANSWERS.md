# ANSWERS.md

## 1. How to run

Clone the repo and run:

```bash
npm install
npm run dev
```

Live URL: http://habit-tracker-five-weld.vercel.app/

## 2. Stack & design choices

I used React because I've been learning it recently and wanted to develop my skills in it. Handling state is much easier in react and using localstorage means i didn't need a backend. The design decisions I made were highlighting the column of the current day with a darker background. I did this so when you open the app you instantly know the current day without having to check if yourself. I also decided to
put the streak counter at end of each row since it feels more natural.

## 3. Responsive & accessibility

## 3. Responsive & accessibility

On mobile (iPhone 13 Pro) the table fits on screen properly, the columns are a bit compressed but everything is visible and tappable. On a wider laptop it is displayed better with max-width so not too wide.

One accessibility feature I added was future date checkboxes are greyed out so you can't check check boxes in the future which is a functional design decision preventing accidental misclicks.

One thing I didn't implement was focus on the button being clicked. There isn't currently a visible focus ring for the button currently selected which is a feature that can be added in the future.

## 4. AI usage

I used Claude to help me build this. I asked it to explain concepts to me as we went along rather than just copy and paste the code. Things like how localStorage works or how a function is passed to useState, what localStorage.getItem returns etc.

Since CSS styling is an area I'm not that comfortable with I asked Claude to generate styling for me and it gave me a dark theme with a basic CSS. I then asked it to improve the CSS and teach me along the way.

One specific thing I changed was that Claude gave me the localStorage initialization inside useState using a lazy initializer function but since the syntax was unfamilar for me, I it for what it does and rewrote it as two plain variables that read from localStorage before the useState calls. Less structured but more easier to deal for me.

## 5. Honest gap

The streak counter is too basic. Right now it just counts consecutive days gonig back from current day but if you check for example Mnoday, Tuesday, Wednesday and forget Thursday, the streak resets to 0. Also there is no way to see longest streak or streak history currently. With another day I would add a "longest streak" counter as well that counts the maximum streak held for that habit even after current streak breaks.

const errorSubtext = document.getElementById("errorSubtext")!;

const errorTexts = ["This is not the webpage you are looking for", "404: This page went out in a blaze of glory. It's a legend in the Afterlife now.", "Test 1", "Test 2", "Test 3"];

errorSubtext.textContent = errorTexts[Math.floor(Math.random() * errorTexts.length)];;

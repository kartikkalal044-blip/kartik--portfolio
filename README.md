# Kartik Portfolio Website

A responsive, beginner-friendly multi-page resume and bio-data website built with HTML5, CSS3, JavaScript, and jQuery.

## Pages

- `index.html` — Home and introduction
- `resume.html` — Resume, education, skills, project, and learning recommendations
- `biodata.html` — Selected personal details, education, interests, and career objective
- `projects.html` — Online Harassment Detection System (in progress)
- `contact.html` — Contact information and a validated email-draft form

## Folder structure

```text
kartika-portfolio/
├── index.html
├── resume.html
├── biodata.html
├── projects.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   └── profile.jpg
│   └── documents/
└── README.md
```

## Run locally

1. Extract the ZIP file if you downloaded the ZIP.
2. Open the `kartika-portfolio` folder.
3. Double-click `index.html` to open it in a browser.
4. For a better development workflow, open the folder in Visual Studio Code and use the **Live Server** extension if you have it installed.
5. Navigate using the menu to check all five pages.

The site uses Google Fonts and jQuery from CDNs, so those resources need an internet connection. The main layout and content are stored locally.

## Important notes

- The contact form performs browser-side validation and opens a `mailto:` draft. It does not send, store, or process messages on a server.
- The Resume page has a **Print / Save as PDF** button. Choose **Save as PDF** in the browser print dialog to save a PDF.
- The certifications listed are suggestions to explore, not completed certifications.
- The Online Harassment Detection System is labelled **In progress**. Its listed machine-learning methods are planned/considered technologies and should be updated as implementation is finalized.
- No grades, internship, completed certifications, awards, or extra projects have been invented.
- Personal phone number is not displayed publicly.

## Publish with GitHub Pages

1. Sign in to GitHub.
2. Click **New repository**.
3. Name it `kartika-portfolio` (or another name you prefer).
4. For a simple public portfolio, set the repository to **Public**.
5. Create the repository.
6. Upload the contents of this folder to the repository's root. Make sure `index.html` is in the root, not inside another nested folder.
7. In the repository, open **Settings → Pages**.
8. Under the build/deployment source, choose **Deploy from a branch**.
9. Select the `main` branch and the `/(root)` folder, then save.
10. Wait for GitHub Pages to finish publishing. The site URL is typically `https://YOUR-USERNAME.github.io/kartika-portfolio/`.
11. Replace `YOUR-USERNAME` with your actual GitHub username and open the published URL.
12. Test each page, the theme toggle, the mobile menu, profile image, print button, and form validation.

GitHub's interface may change. If you do not see these exact labels, look for the repository's **Pages** section under **Settings**.

## Before publishing

Review your email address and college name carefully. A public website can be viewed by anyone. Do not add private information you do not want to share. If you later want a real contact form that sends messages, connect a backend or a form service and update the form code accordingly.

# s33 Final Project Example

This repo provides an example (hopefully helpful for you to follow!) of what a final project might look like, using React+Vite, Tailwind CSS, Material Tailwind, and Firebase for backend authentication and storage.

Note that many of the components are modified/customized versions of pre-built components available on Material Tailwind's site (see, e.g., LoginForm, ScratchTraxGallery).  Comments are provided at the top of those components identifying the MW source.

Of particular interest to you should be:
- Use of local state inside App, keeping track of what the current component (screen) to display should be, using a ternary (if-then) operator to determine which component(s) to display based on state, and also passing setter functions and/or state variables as arguments to other components as needed.
- An enumeration inside App to make code more reader friendly / robust.
- For forcing a refresh of any component, see the refresh/setRefresh and subsequent refreshTraxGallery code at the top of refreshTraxGallery, and notice how the latter is passed to another component to allow remote refreshing.
- For fetching a user-info JSON file from Firebase storage, see details in the loginUser function inside LoginForm.  (There are surely better approaches, e.g., using Firebase's backend DB, but this will let you get something going quickly using utilities you have already set up.)
- For pushing an updated user-info JSON file to storage, see details in the logoutUser and writeJsonFile functions inside ScratchTraxGallery.
- Extending the color scheme to include Bates-specific HTML coloring on buttons (see tailwind.config.js and input.css).

## Issue with CORS: Hack Fix

If you use the approach above for fetching a JSON from Firebase storage, your browser may not allow the file on getBytes request due to CORS (cross-origin resource sharing) rules.  While the following is far from an ideal / appropriate solution, it will let you get to test a working implementation quickly without having to dig into more details.

The easiest fix is to disable CORS checks when you start your browser.

See https://simplelocalize.io/blog/posts/what-is-cors/#3-disable-browser-cors-checks.

For Mac, this can be accomplished by running Chrome from the command line using:
```
open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/chrome-dev-disabled-security" --disable-web-security
```

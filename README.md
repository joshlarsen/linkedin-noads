# LinkedIn No Ads

A minimal Chrome extension that hides promoted (sponsored) posts on LinkedIn.

It detects promoted posts by looking for elements that contain an `<h2>` and a `<p>` with the text "Promoted", then applies `display: none` to hide them. A MutationObserver handles posts injected dynamically as you scroll.

## Install

1. Open `chrome://extensions` in Chrome
2. Enable **Developer mode** (toggle in the top right)
3. Click **Load unpacked** and select the `extension/` folder

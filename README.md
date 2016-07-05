# sub

This is a (prototypical, at the moment) attempt to generate instant subtitles
for spoken content, translate them and transmit them to connected clients. The
resulting application is split in two (three) parts:

- `/source`: translation input. Uses `webkitSpeechRecognition` (so the application
runs only in Chrome 50+ at the moment). Press the record button to start transmitting,
press it again to stop.
- `/:locale`: translation endpoint for the given `:locale` (e.g. `/de` will recieve
the input translated to german). Shows the current as well as the last "subtitle"
(e.g. out of "this is the first input", "this is the second", "and this is the third"
only the last two will be visible).
- `/`: redirects to `/${navigator.language}`.

## Getting started

This is a (fairly hacked) npm-based application. Therefore, after cloning, simply perform

```bash
npm install
npm start # or
npm run debug
```

## TODOs

- `/source` only accepts german input at the moment. The translation api would accept a
`&source=${locale}` url parameter, so the `/source` could emit `navigator.language` as
well and the server could pass this to the translation api.
- there is no build toolchain at the moment. At the current stage of the project it works
by simply running `node src/main/js/index`, but this could (should?) change in the future.
- there are no tests. Again, this is highly hacked and simply glueing together different
APIs (JavaScript SpeechRecognition into socket.io into google translate and back).

## [License](LICENSE)

The MIT License. Copyright (c) 2016 EFG Ludwigshafen.
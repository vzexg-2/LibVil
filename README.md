# LibVil
This is for personal use btw, I gotta save this to GitHub so I can later open it on another device.


:

```markdown

fetch("https://cdn.jsdelivr.net/gh/vzexg-2/libv@main/libv1.js")
  .then(r => r.text())
  .then(eval)
  .then(() => fetch("https://cdn.jsdelivr.net/gh/vzexg-2/libv@main/libv-slk.js"))
  .then(r => r.text())
  .then(eval);
```

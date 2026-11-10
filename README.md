# Counterparts: a study desk on the PLA and the Indian defence ecosystem

A small static site that sets the organisation of the People's Liberation Army and the Central Military Commission beside the Indian defence structure, with a counterpart (or a note that there is none) for each box. It follows the Takshashila design language: wine and marigold, Inter and Roboto Mono, hairline rules, no shadows and no rounded corners.

There is no build step and no dependency. Every page is plain HTML that loads `assets/style.css`, `assets/app.js` and one or more data files.

## Publishing on GitHub Pages

The public repository is `shakunasanaxe/Ind-Chin-Mil-Counterpart`. From this folder:

```bash
git init -b main
git add .
git commit -m "Add the PLA and India counterparts study desk"
git remote add origin https://github.com/shakunasanaxe/Ind-Chin-Mil-Counterpart.git
git push -u origin main
```

Then, on GitHub, open Settings, then Pages. Under Build and deployment choose Deploy from a branch, select `main` and the `/ (root)` folder, and save. The site appears within a minute or two at:

`https://shakunasanaxe.github.io/Ind-Chin-Mil-Counterpart/`

The `.nojekyll` file stops GitHub from processing the folder, and all links are relative, so the site works from that sub-path.

To preview locally, run `python3 -m http.server 8000` in this folder and open `http://localhost:8000`.

## Where things live

| Path | What it holds |
|---|---|
| `index.html` and the other `.html` files | One page per topic, listed in the left-hand tab list |
| `assets/style.css` | Design tokens and all components |
| `assets/app.js` | Navigation, carousel, tabs, bar chart, photo lightbox and the paired organisation chart |
| `assets/data-apex.js` | Apex command and the fifteen CMC organs |
| `assets/data-forces.js` | Services and arms, theatre commands, Western Theatre |
| `assets/data-domains.js` | Cyber and space, education, industry and procurement |
| `assets/data-misc.js` | Timeline, command ladder, ranks, equipment pairs, headline charts |

## Editing the content

An organisation chart is a pair of nested lists in a data file. A box looks like this:

```js
{ id: 'cn-m-jsd', n: 'Joint Staff Department', zh: '联合参谋部', py: 'Liánhé Cānmóubù',
  lv: 'Department; operational staff', c: 'F', d: 'What it does…', w: 'Why it matters…' }
```

`c` is the status: `E` established, `R` reported, `F` in flux. Counterparts are one line each in the `links` list at the end of the same dataset:

```js
['ia-c-ids', 'cn-m-jsd', 'p', 'Why they overlap and where they differ.']
```

Use `'d'` for a close counterpart and `'p'` for a partial overlap. A box with no link is shown as having no counterpart, and its `x` field can hold the explanation. The counterpart finder on the overview page reads the same data, so it updates automatically.

## Photographs

Photographs are hot-linked from Wikimedia Commons, and the file names are listed in the `IMG` table near the top of `assets/app.js`, together with the licence and author shown in each caption. Two images are stored locally in `assets/img/` (the DF-41 sketch by Mike1979 Russia, CC BY-SA 4.0, and the S-400 photograph by Dmitriy Fomin, CC BY 2.0). To add another, add a row to `IMG` and set the `img` key on that entry in `data-misc.js`; a path beginning `assets/` is treated as a local file. Check the licence on the Commons file page before adding anything.

## Currency of the content

The content was compiled in November 2026 from open sources, and it concentrates on structure because leadership in the PLA is changing quickly. Check any named appointment against official announcements before citing it. The Sources and Method page lists what was consulted.

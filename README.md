# Modulové kolejiště – struktura webu

Statický web pro GitHub Pages. Není potřeba žádný framework, build ani instalace balíčků.

## Jak je web rozdělený

Hlavní `index.html` je pouze **rozcestník areálů**. Nemá horní menu. Návštěvník sjede k výběru areálu a teprve kliknutím vstoupí do samostatné části webu.

Každý areál je potom uzavřený „web ve webu“:

- v Železárnách se naviguje pouze mezi stránkami Železáren,
- v Rafinerii se naviguje pouze mezi stránkami Rafinerie,
- Železárny neodkazují na Rafinerii a naopak,
- návrat na hlavní rozcestník je úmyslně jen na úvodní stránce konkrétního areálu.

## Struktura

```text
web2/
├── index.html                  # čistý hlavní rozcestník, bez horního menu
├── zelezarny/
│   ├── index.html              # hlavní stránka Železáren + statistiky + návrat na rozcestník
│   ├── stavba.html
│   ├── provoz.html
│   ├── lokomotivy.html
│   └── vozy.html
├── rafinerie/
│   └── index.html              # hlavní stránka Rafinerie + návrat na rozcestník
└── assets/
    ├── css/
    │   └── style.css           # celý vzhled webu
    ├── js/
    │   ├── layout.js           # oddělená menu a patičky jednotlivých areálů
    │   └── main.js             # menu, animace a drobné chování
    └── images/
        ├── common/
        ├── zelezarny/
        │   ├── stavba/
        │   ├── provoz/
        │   ├── lokomotivy/
        │   └── vozy/
        └── rafinerie/
```

## Co upravovat nejčastěji

### Texty a obsah
Otevři příslušný HTML soubor. Místa určená k běžné editaci jsou označená:

```html
<!-- EDITACE: ... -->
```

### Čtyři kruhy na hlavní stránce Železáren

Soubor:

```text
zelezarny/index.html
```

Najdi `stats-grid` a přepiš hodnoty pro:

- počet výhybek,
- délku kolejí,
- počet lokomotiv,
- počet vozů.

### Menu jednotlivých areálů

Soubor:

```text
assets/js/layout.js
```

Každý areál má vlastní konfiguraci. Přidání stránky do Železáren tedy nijak neovlivní Rafinerii.

### Vzhled

Soubor:

```text
assets/css/style.css
```

### Obrázky

Ukládej je podle obsahu do připravených složek, například:

```text
assets/images/zelezarny/stavba/
assets/images/zelezarny/provoz/
assets/images/zelezarny/lokomotivy/
assets/images/zelezarny/vozy/
```

## GitHub Pages

Obsah této složky nahraj přímo do kořene repozitáře `web2`.

Výsledné adresy:

```text
https://nkolejiste.github.io/web2/
https://nkolejiste.github.io/web2/zelezarny/
https://nkolejiste.github.io/web2/zelezarny/stavba.html
https://nkolejiste.github.io/web2/zelezarny/provoz.html
https://nkolejiste.github.io/web2/rafinerie/
```

## Důležité

`data-section` určuje, ke kterému samostatnému areálu stránka patří. `data-root` řeší správné relativní cesty. Při běžné editaci textů a obrázků není potřeba tyto atributy měnit.

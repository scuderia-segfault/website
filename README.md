# Scuderia Segfault: lokales WebStorm-Projekt

Die Website basiert auf dem bereitgestellten WebStorm/Vite-Template. Das Design wurde mit echten Bildern aus dem Scuderia-Drive und dem bestehenden Teamarchiv neu aufgebaut. GitHub Pages ist eingerichtet: https://scuderia-segfault.github.io/website/

## Starten

Diesen Ordner mit `package.json` in WebStorm öffnen. Node.js ab Version 22 verwenden.

```sh
npm ci
npm run dev
```

Vite zeigt die lokale Vorschauadresse an (normalerweise http://127.0.0.1:5173).
Die geteilte WebStorm-Konfiguration **Website – Vite** startet denselben Befehl.

## Struktur und Pflege

Jeder Eintrag ist eine eigene Datei; der Dateiname ist die ID und Teil der Adresse. Metadaten stehen als YAML im Kopf zwischen `---`.

- `content/projects/<id>.md`: Projekte (YAML-Kopf + Beschreibung in Markdown) → `projects/<id>.html`.
- `content/theses/<id>.md`: Abschlussarbeiten und Themen (YAML-Kopf + Abschnitte in Markdown) → `work/<id>.html`.
- `content/blog/<id>.md`, `content/news/<id>.md`: Beiträge → `blog/<id>/index.html`, `news/<id>/index.html`.
- `content/members/<id>.yml`: Mitglieder/Alumni (Anker `members.html#<id>`).
- `content/publications/<id>.yml`: Publikationen (Anker `research.html#<id>`, BibTeX `citations/<id>.bib`).
- `content/templates/`: kommentierte Vorlagen für alle sechs Inhaltstypen.
- `content/data/*.json`: selten geänderte Listen (Autos, Ergebnisse, Sponsoren, Videos, Archiv, Links).
- `public/uploads/`, `public/media/`: Bilder.
- `scripts/build.mjs`: erzeugt alle Seiten; `scripts/pages/` enthält ein Modul pro Seite, `scripts/lib/` Layout, Bausteine, Inhaltslader und Prüfregeln.
- `assets/style.css` und `assets/site.js`: Gestaltung, Suche, Filter und Videoansicht.

HTML-Seiten werden generiert und eingerückt formatiert (Prettier). Dauerhafte Änderungen an Inhalten, Generatoren und Assets durchführen. Nach Änderungen `npm run site:build` ausführen oder den Dev-Server neu starten. Code mit `npm run format` formatieren.

## Neue Inhalte anlegen

```sh
npm run new -- project lidar-mapping "LiDAR Mapping"
npm run new -- thesis lidar-localization "LiDAR Localization"
npm run new -- blog first-race "Our first race"
npm run new -- news race-update "Race update" --date 2026-12-01
npm run new -- member jane-doe "Jane Doe"
npm run new -- publication my-paper-title "My Paper Title"
```

Der Befehl kopiert die Vorlage aus `content/templates/`, setzt ID, Titel und Datum ein und überschreibt keine bestehende Datei. ID nur mit Kleinbuchstaben, Zahlen und Bindestrichen. Danach die kommentierten Felder ausfüllen.

Neue Einträge haben `draft: true` und werden nicht veröffentlicht. Vorschau mit Entwürfen: `npm run dev:drafts`. Nach der Freigabe `draft: false` setzen. Beiträge mit zukünftigem UTC-Datum erscheinen erst an diesem Tag. Mit `npm run validate:content` prüfen: fehlende Pflichtfelder, ungültige Daten, fehlende Bilder und falsche Verweise werden mit Dateinamen gemeldet. Nur vertrauenswürdige Teamtexte verwenden: Markdown kann HTML enthalten. Die Reihenfolge von Projekten, Themen und Mitgliedern steuert `order` (kleiner zuerst); Publikationen werden nach Jahr und ID sortiert.

## Build und spätere Pipeline

```sh
npm ci
npm run build
npm run check
```

Der Build erzeugt alle Seiten und kopiert Bilder nach `dist/`. Die Prüfung kontrolliert lokale Links, Assets, Anker, Metadaten und Entwurfsfilter.
Nur den Inhalt von `dist/` zum gewählten Webhost übertragen. Recherchedateien und private Drive-Dokumente werden nicht veröffentlicht.

Eine spätere CI/CD-Pipeline kann Änderungen an `content/`, `public/`, `assets/` und `scripts/` beobachten und diese drei Befehle ausführen. Für zeitgesteuerte Artikel zusätzlich einen regelmäßigen Build einrichten. Zugangsdaten gehören in die Secret-Verwaltung des späteren CI-Anbieters.

## Inhalte und belegte Grenzen

`CONTENT_REVIEW.md` dokumentiert Quellen und noch fehlende Angaben. Das Archiv enthält die gefundenen Teamberichte und die erfassten Forschungsnachweise; es ist keine Zusicherung, dass jede jemals entstandene Publikation aller Teammitglieder bereits erfasst ist.

Die alte Template-Konzeptseite UNIT-XII wurde durch einen neutralen Forschungseinstieg ersetzt: In den recherchierten Quellen war UNIT-XII nicht als eigenständiges Projekt belegt.

Videos werden erst nach Klick als YouTube-Player geladen. Vorschaubilder stammen von YouTube; die Schrift wird von Google Fonts geladen. Alle Team- und Projektfotos sind lokal gespeichert. Keine privaten Rohvideos oder internen Projektunterlagen sind in `public/` enthalten.

Eine Sicherung des vorherigen Projektstands liegt im benachbarten Ordner `Quellarchive` als `vor-design-ueberarbeitung-2026-11-02.zip`. Bestehende WebStorm-Einstellungen wurden beibehalten.


## Publikationen, Teamstatus und Sponsorenseite

Publikationen haben zusätzlich `authors`, `venue`, `type`, optional `doi`, `pdf`, `thumbnail`, `thumbnailSource` und `thumbnailPage`. Der Generator gruppiert die Datensätze nach Typ und Jahr und erstellt die BibTeX-Dateien automatisch in `public/citations/`. Ein Paperbild immer aus der konkreten Arbeit übernehmen und die Herkunft erfassen. Ohne Bild wird ein neutrales Dokument-Symbol gezeigt.

Die Datei `scripts/publications.mjs` enthält die gemeinsame Darstellung und den BibTeX-Export. Verfügbare Typen: `Journal`, `Conference`, `Workshop`, `Preprint`, `Book chapter`, `Thesis`, `Other`. Neue bibliografische Einträge mit `npm run new -- publication <id> "Titel"` anlegen.

In `content/members/*.yml` steuert `status` die Zuordnung: `Active Team`, `Associated Members` oder `Alumni`. Die aktuelle aktive Gruppe wurde von Agnes bestätigt. Neue Mitglieder mit einer eindeutigen `id`, Bild und verifizierten Angaben ergänzen. `scholar` nur bei eindeutigem Profil ausfüllen; andernfalls wird eine ausdrücklich als Suche beschriftete Scholar-Verknüpfung angeboten.

`content/data/sponsors.json` enthält Namen, Logos, Websites und die Quelle der Unterstützerangaben. Die Kontaktanfrage auf `sponsors.html` öffnet eine vorbereitete E-Mail an die öffentliche Teamadresse. Sie braucht kein Backend und sendet nichts automatisch ab. Bankdaten, Zahlungsabwicklung und feste Sponsoringpakete sind nicht eingerichtet.

Die Rennanimation liegt in `assets/racing-motion.js`, läuft nur bei sichtbarem Canvas und berücksichtigt die Einstellung für reduzierte Bewegung. Sie ist eine Illustration, keine Wiedergabe echter Fahrzeugtelemetrie.


## Redaktion und GitHub-Pipeline

Die schrittweise Anleitung steht in `EDITORIAL_WORKFLOW.md`. `content/data/site.json` bündelt die Verknüpfungen zur bestätigten Organisation scuderia-segfault, LinkedIn und TU Wien.

Vorbereitet: GitHub-Buildworkflow, Issue-Formular für Inhaltsänderungen, Pull-Request-Vorlage, KI-Redaktionshinweise und ein optionales Pages-Deployment-Beispiel. Das Repository ist https://github.com/scuderia-segfault/website. Änderungen auf `main` lösen den geprüften Build und die Veröffentlichung über `.github/workflows/deploy-pages.yml` aus. Pull Requests werden separat geprüft.

Der Abgleich der Publikationen mit arXiv ist in `PUBLICATION_AUDIT.md` dokumentiert. Google Scholar war beim direkten Prüfversuch zugriffsbeschränkt; die dortige Prüfung ist ausdrücklich nicht als abgeschlossen markiert. Für bestätigte arXiv-Treffer gibt es separate ARXIV-Verknüpfungen; Konferenz-/Journalfassungen behalten ihre eigenen Metadaten.

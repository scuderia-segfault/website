# Scuderia Segfault — lokales WebStorm-Projekt

Die Website basiert auf dem bereitgestellten WebStorm/Vite-Template. Das Design wurde mit echten Bildern aus dem Scuderia-Drive und dem bestehenden Teamarchiv neu aufgebaut. Veröffentlichung/Hosting ist noch nicht aktiviert.

## Starten

Diesen Ordner mit `package.json` in WebStorm öffnen. Node.js ab Version 22 verwenden.

```sh
npm ci
npm run dev
```

Vite zeigt die lokale Vorschauadresse an (normalerweise http://127.0.0.1:5173).
Die geteilte WebStorm-Konfiguration **Website – Vite** startet denselben Befehl.

## Struktur und Pflege

- `content/data/projects.json`: Projektseiten, Texte, Beteiligte, Quellen und passende Publikationen.
- `content/data/publications.json`: Bibliografie mit Jahr, Typ, Zitation und Originalnachweis.
- `content/data/members.json`: Mitglieder/Alumni, Interessen, belegte Beiträge, LinkedIn und Bildnachweise.
- `content/data/videos.json`: öffentliche Videoverweise und ihr ursprünglicher Kontext.
- `content/data/archive.json`: 21 übernommene Teamberichte mit Texten, Galerien und Bildnachweisen.
- `content/data/media-sources.json`: Herkunft der übernommenen Bilder.
- `content/news/*.md` und `content/blog/*.md`: neue redaktionelle Beiträge.
- `public/uploads/`: Bilder für neue Beiträge.
- `public/media/`: lokal gespeicherte, für das Web optimierte Archivbilder.
- `scripts/layout.mjs`: gemeinsame Navigation, Seitengerüst und Footer.
- `scripts/build-site.mjs`: erzeugt Hauptseiten sowie Projekt- und Archivseiten.
- `scripts/build-content.mjs`: erzeugt neue News- und Blogartikel aus Markdown.
- `assets/style.css` und `assets/site.js`: Gestaltung, Suche, Filter und Videoansicht.

HTML-Seiten werden generiert. Dauerhafte Änderungen an Daten, Generatoren und Assets durchführen.
Nach Änderungen an JSON oder Markdown `npm run site:build` ausführen; der laufende Vite-Server lädt erzeugte Seiten neu. Alternativ Dev-Server neu starten.

## Neue News und Blogartikel

Eine `example-post.md` in `content/news/` oder `content/blog/` kopieren. Dateiname nur mit Kleinbuchstaben, Zahlen und Bindestrichen, etwa `first-race.md`.

Der Kopf zwischen `---` ist **JSON**, kein YAML:

```markdown
---
{
  "title": "Our next race",
  "date": "2026-11-02",
  "author": "Scuderia Segfault",
  "summary": "A short introduction.",
  "draft": false
}
---

## Heading

Your **Markdown** text.

![Descriptive image text](../../uploads/your-image.jpg)
```

Pflichtfelder: `title`, `date` (YYYY-MM-DD), `draft` (true/false).
Entwürfe und Beiträge mit zukünftigem UTC-Datum werden nicht veröffentlicht.
Nur vertrauenswürdige Teamtexte verwenden: Markdown kann HTML enthalten.
Bilder nach `public/uploads/` legen. Die Beispielentwürfe werden nicht veröffentlicht.

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

Die Datei `scripts/publications.mjs` enthält die gemeinsame Darstellung und den BibTeX-Export. Verfügbare Typen: `Journal`, `Conference`, `Workshop`, `Preprint`, `Book chapter`, `Thesis`, `Other`. Neue bibliografische Einträge werden in `content/data/publications.json` ergänzt und mit `npm run site:build` übernommen.

In `members.json` steuert `status` die Zuordnung: `Active Team`, `Associated Members` oder `Alumni`. Die aktuelle aktive Gruppe wurde von Agnes bestätigt. Neue Mitglieder mit einer eindeutigen `id`, Bild und verifizierten Angaben ergänzen. `scholar` nur bei eindeutigem Profil ausfüllen; andernfalls wird eine ausdrücklich als Suche beschriftete Scholar-Verknüpfung angeboten.

`content/data/sponsors.json` enthält Namen, Logos, Websites und die Quelle der Unterstützerangaben. Die Kontaktanfrage auf `sponsors.html` öffnet eine vorbereitete E-Mail an die öffentliche Teamadresse. Sie braucht kein Backend und sendet nichts automatisch ab. Bankdaten, Zahlungsabwicklung und feste Sponsoringpakete sind nicht eingerichtet.

Die Rennanimation liegt in `assets/racing-motion.js`, läuft nur bei sichtbarem Canvas und berücksichtigt die Einstellung für reduzierte Bewegung. Sie ist eine Illustration, keine Wiedergabe echter Fahrzeugtelemetrie.


## Redaktion und GitHub-Pipeline

Die schrittweise Anleitung steht in `EDITORIAL_WORKFLOW.md`. `content/data/site.json` bündelt die Verknüpfungen zur bestätigten Organisation scuderia-segfault, LinkedIn und TU Wien. `content/data/opportunities.json` steuert die Mitmachbereiche der Join-Seite.

Vorbereitet: GitHub-Buildworkflow, Issue-Formular für Inhaltsänderungen, Pull-Request-Vorlage, KI-Redaktionshinweise und ein optionales Pages-Deployment-Beispiel. Noch kein Website-Repository angelegt oder verbunden und keine Veröffentlichung aktiviert.

Der Abgleich der Publikationen mit arXiv ist in `PUBLICATION_AUDIT.md` dokumentiert. Google Scholar war beim direkten Prüfversuch zugriffsbeschränkt; die dortige Prüfung ist ausdrücklich nicht als abgeschlossen markiert. Für bestätigte arXiv-Treffer gibt es separate ARXIV-Verknüpfungen; Konferenz-/Journalfassungen behalten ihre eigenen Metadaten.

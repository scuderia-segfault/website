# Inhalte einfach aktualisieren

## Zielbild

Datei/Bilder hochladen → Entwurf → Pull Request → automatische Prüfungen → fachliche Freigabe → Veröffentlichung.

Die Website bleibt eine statische Website. Es wird kein zusätzlicher Server und für die Grundfunktion kein KI-Dienst benötigt.

## Was bereits vorbereitet ist

- `.github/workflows/website.yml`: prüft Pull Requests und Pushes, baut die Website und stellt `dist/` als herunterladbares Artefakt bereit.
- `.github/ISSUE_TEMPLATE/website-update.yml`: Formular, um News, Publikationen, Projekte, Mitmachmöglichkeiten, Mitglieder- oder Sponsoränderungen mit Quellen einzureichen.
- `.github/pull_request_template.md`: kurze Übergabe an die Redaktion.
- `.github/copilot-instructions.md`: Regeln für quellenbasierte KI-Entwürfe.
- `content/templates/`: Markdown-Vorlagen für News und Blog.
- `npm run new:post`: legt einen neuen Entwurf an und überschreibt keine existierende Datei.
- `docs/pipeline/deploy-pages.yml.example`: optionaler, noch nicht aktiver Pages-Workflow.

Diese Dateien liegen lokal. Es wurde kein neues Repository angelegt, nichts zu GitHub hochgeladen und kein Hosting aktiviert.

## GitHub-Ziel

Organisation: https://github.com/scuderia-segfault

Die öffentlich sichtbare Repository-Liste enthielt bei der Prüfung nur `scuderia_gymnasium`. Ein Website-Repository wurde über den verbundenen Zugriff ebenfalls nicht gefunden. Ein separates Repository wie `website` wäre passend; der Name ist ein Vorschlag, kein bereits angelegtes Ziel. Den bestehenden Software-Quellcode nicht durch die Website ersetzen.

## Einfacher Weg ohne Terminal

Nach Einrichtung des Website-Repositories:

1. In GitHub `content/news/` oder `content/blog/` öffnen.
2. Eine Vorlage aus `content/templates/` kopieren, Text ergänzen und `draft: true` beibehalten.
3. Bilder über „Add file → Upload files“ nach `public/uploads/` hochladen. Dateinamen und Bildnachweise in den Beitrag eintragen.
4. Änderungen auf einem neuen Branch speichern und einen Pull Request öffnen.
5. Die automatische Prüfung abwarten. Das Build-Artefakt ist ein Download für die Vorschau, noch keine gehostete PR-Vorschau.
6. Nach fachlicher Freigabe `draft` auf `false` setzen und den Pull Request zusammenführen.
7. Solange kein Deployment eingerichtet ist, `dist/` manuell zum Webhost übertragen. Mit aktivierter Veröffentlichung übernimmt das später der passende Workflow.

Alternativ eine Idee mit Text, Links und Bildern über das Issue-Formular einreichen; ein Teammitglied oder eine beauftragte KI bereitet daraus den Pull Request vor.

## Lokal in WebStorm

```sh
npm run new:post -- --type news --slug race-update --title "Race update"
npm run validate:content
npm run build
npm run check
```

Für Blogartikel `--type blog` verwenden. Der neue Beitrag ist standardmäßig ein Entwurf.

## Welche Datei für welchen Bereich?

| Bereich | Quelle |
|---|---|
| News / Blog | `content/news/*.md`, `content/blog/*.md` |
| Mitmachen / Themen / spätere Ausschreibungen | `content/data/opportunities.json` |
| Projekte | `content/data/projects.json` |
| Publikationen | `content/data/publications.json` |
| Mitglieder / Status | `content/data/members.json` |
| Sponsoren | `content/data/sponsors.json` |
| LinkedIn / GitHub / TU / späteres Website-Repository | `content/data/site.json` |

## KI als optionale Hilfe

Ein guter erster Schritt ist KI-Unterstützung beim Entwurf im Chat oder über GitHub Copilot. Die KI bekommt Quelltext/Notizen und Medien, formuliert einen Markdown-Entwurf und schlägt die notwendigen JSON-Änderungen in einem Pull Request vor. Ein Teammitglied prüft Namen, Termine, Ergebnisse, Publikationsstatus und Bildnachweise. Automatisches Mergen oder eigenständiges Veröffentlichen ist nicht Bestandteil des vorbereiteten Workflows.

Ein kostenpflichtiger KI-Anbieter oder API-Schlüssel ist noch nicht eingerichtet. Ein späterer automatischer Import aus Drive sollte ebenfalls zunächst einen Entwurf/PR erzeugen. Scholar-Zugriffsbeschränkungen werden nicht mit Scraping umgangen; für bibliografische Vorschläge eignen sich arXiv, ORCID und DOI-Metadaten mit anschließender Kontrolle.

## Veröffentlichung aktivieren — erst nach Auswahl des Hosts

Für GitHub Pages muss das Repository unter Settings → Pages auf GitHub Actions gestellt und der Beispielworkflow nach `.github/workflows/deploy-pages.yml` kopiert werden. Er veröffentlicht ausschließlich nach manuellem Start. Für eine automatische Veröffentlichung nach Merge kann später ein Push-Trigger auf den bestätigten Hauptbranch ergänzt werden. Für eine TU-gehostete Seite wird stattdessen ein Upload-Schritt mit den vom Webbetrieb bereitgestellten Zugangsdaten benötigt.

Secrets werden in GitHub verwaltet. Für redaktionelle Freigaben eine Branch-Regel mit Pull-Request-Review einrichten; eine lokale Datei kann diese Repository-Einstellung nicht aktivieren.

## Offizielle Referenzen

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://github.com/actions/checkout
- https://github.com/actions/setup-node
- https://github.com/actions/upload-artifact

Die Join-Seite orientiert sich im Aufbau an https://www.trustcps.eu/join.html, verwendet aber eigene Texte und keine unbestätigten offenen Stellen oder Forschungszusagen.

## Arbeiten und gemeinsamer Forschungsbereich
`research.html` bündelt Projekte und Publikationen. Die bisherigen URLs bleiben erreichbar. `content/data/work-items.json` verwaltet Themen, Typ, Status, Aufgaben, Voraussetzungen und Projektbezug. `Topic proposal` bedeutet einen zu besprechenden Vorschlag. `Open` erst nach bestätigter Verfügbarkeit und Betreuung verwenden; `Closed` entfernt das Thema aus der Übersicht. Detailseiten werden automatisch gebaut. News und Blog liegen getrennt unter `content/news` und `content/blog`; neue Kurzbeiträge mit `npm run new:post` als Entwurf anlegen.

Import 03.11.2026: 12 eindeutige Themen aus dem heruntergeladenen Katalog, eine öffentliche AIDA-PhD-Ausschreibung und drei markierte AIDA-Mastervorschläge. Doppelte LiDAR-Lokalisierung zusammengeführt. `sections` enthält heading/paragraphs; `contact` kann die Teamadresse überschreiben.

# BEKK utgiftsrapport

## Komme i gang

* Installer en nyere ruby ( med f.eks. rvm eller rbenv)
* Installer Bundler: gem install bundler
* I denne katalogen: bundle install
* Installer mongodb med fra apt, brew e.l 
* Hvis windows: start mongodb med mongod.exe --dbpath c:\mongodb\data
* Deretter _bundle exec rackup_ for å starte utviklingsserver
* http://localhost:9292/index.html

# Backlog

## Teknisk
* Integrasjon mot SSO

## Funksjonalitet
* Endre rapportvisning slik at man kan velge å levere rapport
** Alle ikke-leverte utgifter som er med i rapporten skal da merkes som levert
* Vise, kollapset, andre perioder man har levert utgifter for.

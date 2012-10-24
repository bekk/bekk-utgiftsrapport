# BEKK utgiftsrapport

## Komme i gang

* Installer en nyere ruby ( med f.eks. rvm eller rbenv)
* Installer Bundler: gem install bundler
* I denne katalogen: bundle install
* Installer mongodb med fra apt, brew e.l 
* Hvis windows: start mongodb med `mongod.exe --dbpath c:\mongodb\data`
* Hvis Mac: start mongodb med `mongod`
* Deretter `bundle exec rackup` for å starte utviklingsserver
* `http://localhost:9292/index.html`
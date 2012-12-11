# BEKK utgiftsrapport

## Komme i gang

* Installer en nyere ruby ( med f.eks. rvm eller rbenv)
* Installer Bundler: `gem install bundler`
* I denne katalogen: `bundle install`
* Installer WKHTMLTOPDF: https://github.com/pdfkit/pdfkit/wiki/Installing-WKHTMLTOPDF
* Hvis Windows: Kommenter inn linjen i init_pdfkit i utgiftsrapport.rb
* Installer mongodb fra apt, brew e.l (hvis Windows, last ned fra nettsiden deres)
* Hvis Windows: start mongodb med `mongod --dbpath c:\mongodb\data`
* Hvis Mac: start mongodb med `mongod`
* Deretter `bundle exec rackup` for å starte utviklingsserver
* `http://localhost:9292/index.html`

# Backlog

## Teknisk
* Integrasjon mot SSO
* Gjøre klart for akseptansetester (rspec/capybara/steak/poltergeist|phantom.js etc?)
* Legge på sky.bekk.no

## Funksjonalitet
* ~~Utgifter skal markeres som levert når man velger å levere en rapport~~
* ~~Logg ut-knapp, slik at man faktis kan logge inn og ut~~
* Endre rapportvisning slik at man kan velge å levere rapport
* Vise, kollapset, andre perioder man har levert utgifter for.
* Få rapport som PDF
* Utvide rapport til å bli lik XLS
* Mulighet for å enkelt kunne legge til lunsj/interwebz
* Admin-grensesnitt for regnskap (se info om hver ansatt, og hvor mye utestående bilag det er, osv)

## Bugs
* Sesjoner ser ut til å henge igjen én request, selv om den er cleared på serveren

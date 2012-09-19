class Utgiftsrapport < Sinatra::Base
  get "/" do
    "Hello WOrldz!"
  end

  configure do
    mime_type :json, 'application/json'
  end

  get '/service' do
    content_type :json
    "{name: 'Utgiftsrapporteringssystem Enterprise Edition', version: 0.1}"
  end

end
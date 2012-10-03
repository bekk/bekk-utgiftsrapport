class Utgiftsrapport < Sinatra::Base
  get "/" do
    send_file File.join(settings.public_folder, 'index.html')
  end

  configure do
    mime_type :json, 'application/json'
  end

  get '/service' do
    content_type :json
    "{name: 'Utgiftsrapporteringssystem Enterprise Edition', version: 0.1}"
  end

end
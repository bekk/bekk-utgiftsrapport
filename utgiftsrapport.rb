class Utgiftsrapport < Sinatra::Base
  configure :development do 
    register Sinatra::Reloader
  end

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

  post '/utgift' do
    init_db    
    # TODO: Legg hent user_id fra egnet sted
    if params[:id].nil?
      inserted = @coll.insert({'user_id' => 1, 'data' => params[:data].to_s })
    else
      inserted = @coll.update({'_id' => BSON::ObjectId(params[:id])}, {'user_id' => 1, 'data' => params[:data].to_s})
    end
    content_type :json
    inserted.to_s
  end

  get '/utgift' do
    init_db
    inserted = @coll.find({'user_id' => 1})
    content_type :json
    inserted.first.to_s
  end


private

  def init_db
    @conn = Mongo::Connection.new
    @db = @conn['test']
    @coll = @db['usysdev']
  end
end

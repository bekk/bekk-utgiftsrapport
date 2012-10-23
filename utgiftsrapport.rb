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
    if params[:id].nil? || params[:id].empty?
      utgift = @coll.insert({'user_id' => 1,  'tittel' => params[:tittel].to_s, 'sum' => params[:sum]})
    else
      utgift = @coll.update({'_id' => BSON::ObjectId(params[:id])}, {'user_id' => 1, 'tittel' => params[:tittel].to_s, 'sum' => params[:sum]})
    end
    content_type :json
    utgift.to_s
  end

  get '/utgift' do
    init_db
    utgift = @coll.find({'_id' => BSON::ObjectId(params[:id])})
    content_type :json
    utgift.first.to_json
  end

  delete '/utgift' do
    init_db
    utgift = @coll.remove({'_id' => BSON::ObjectId(params[:id])})
    content_type :json
    utgift.to_json
  end

  get '/utgifter' do
    init_db
    utgifter = @coll.find({'user_id' => 1})
    content_type :json
    utgifter.to_a.to_json
  end


private

  def init_db
    @conn = Mongo::Connection.new
    @db = @conn['test']
    @coll = @db['usysdev']
  end
end
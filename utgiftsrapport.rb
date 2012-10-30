require 'date'
require 'pdfkit'
class Utgiftsrapport < Sinatra::Base
  configure :development do 
    register Sinatra::Reloader
  end
  enable :sessions

  post "/" do
    session[:user] = params[:user]
    p params[:user]
    send_file File.join(settings.public_folder, 'index.html')
    true
  end

  get "/" do
    send_file File.join(settings.public_folder, 'index.html')
  end

  get "/rapport" do
      init_db
      html = "<table><tr><th>Beskrivelse</th><th>Sum</th><th>Dato</th></tr>"
      results = @coll.find({'user_id' => 1})
      results.each do |f|
	p f
	html += "<tr>"
	html += "<td>#{f["tittel"]}</td><td>#{f["sum"]}</td><td>#{f["created_at"]}</td>"
	html += "</tr>"
      end
      html += "</table>"
      kit = PDFKit.new(html)
      content_type 'application/pdf'
      kit.to_pdf
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
    p session[:user] 
    # TODO: Legg hent user_id fra egnet sted
    if params[:id].nil? || params[:id].empty?
      utgift = @coll.insert({'user' => session[:user],  'tittel' => params[:tittel].to_s, 'sum' => params[:sum], :created_at => Time.now})
    else
      utgift = @coll.update({'_id' => BSON::ObjectId(params[:id])}, {'user_id' => session[:user], 'tittel' => params[:tittel].to_s, 'sum' => params[:sum]})
    end
    content_type :json
    utgift.to_json
  end

  get '/utgift' do
    init_db
    utgift = @coll.find({'_id' => BSON::ObjectId(params[:id])})
    content_type :json
    utgift.first.to_json
  end

  delete '/utgift' do
    init_db
    result = @coll.remove({'_id' => BSON::ObjectId(params[:id])})
    content_type :json
    result.to_json
  end

  get '/utgifter' do
    init_db
    utgifter = @coll.find({'user' => session[:user]})
    content_type :json
    utgifter.to_a.to_json
  end

  post '/rapport' do
    # marker alle ikke-leverte utgiftsrapporter som levert
    # dytt ut en pdf
    content_type :json
    "Hello World".to_json
  end


private

  def init_db
    @conn = Mongo::Connection.new
    @db = @conn['test']
    @coll = @db['usysdev']
  end
end

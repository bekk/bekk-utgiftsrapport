require 'date'
require 'pdfkit'

class Utgiftsrapport < Sinatra::Base
  register Sinatra::Session
  enable :sessions

  configure :development do 
    register Sinatra::Reloader
  end

  configure do
    set :session_fail, '/login'
    set :session_secret, 'b4k3k4k3!'
    mime_type :json, 'application/json'
  end

  get "/" do
    session!
    send_file File.join(settings.public_folder, 'index.html')
  end

  get '/login' do
    if session?
      redirect '/'
    else
      send_file File.join(settings.public_folder, 'login.html')
    end
  end

  post '/login' do
    #require "net/ldap"
    #ldap_con = Net::LDAP.new(:host => "midgard.bekk.no", :port => 389, :base => "dc=bekk,dc=no", :auth => { :method => :simple, :username => params[:user], :password => params[:password]})
    #if ldap_con.bind
      #session[:user] = params[:user]
      #p "#{params[:user]} logget inn"
    #end
    #send_file File.join(settings.public_folder, 'index.html')
    if params[:user]
      session_start!
      session[:user] = params[:user]
      redirect '/'
    else
      redirect '/login'
    end
  end

  get '/logout' do
    session_end!(true)
    redirect '/login'
  end

  get '/service' do
    content_type :json
    "{name: 'Utgiftsrapporteringssystem Enterprise Edition', version: 0.1}"
  end

  get '/utgift' do
    init_db
    utgift = @coll.find({'_id' => BSON::ObjectId(params[:id])})
    content_type :json
    utgift.first.to_json
  end

  post '/utgift' do
    init_db
    # TODO: Legg hent user_id fra egnet sted
    if params[:id].nil? || params[:id].empty?
      utgift = @coll.insert({'user' => session[:user],  'tittel' => params[:tittel].to_s, 'sum' => params[:sum], 'levert' => params[:levert], :created_at => Time.now})
    else
      utgift = @coll.update({'_id' => BSON::ObjectId(params[:id])}, {'user_id' => session[:user], 'tittel' => params[:tittel].to_s, 'sum' => params[:sum], 'levert' => params[:levert]})
    end
    content_type :json
    utgift.to_json
  end

  delete '/utgift' do
    init_db
    result = @coll.remove({'_id' => BSON::ObjectId(params[:id])})
    content_type :json
    result.to_json
  end

  get '/utgifter' do
    init_db
    utgifter = @coll.find({'user' => session[:user]}).sort(:created_at => :desc)
    content_type :json
    utgifter.to_a.to_json
  end

  post '/utgifter/lever' do
    init_db
    utgifter = params[:utgifter]
    utgifter.each do |utgift|
      p utgift
      @coll.update(
        {'_id' => BSON::ObjectId(utgift.to_s)},
        {
          '$set' => { 'levert' => true }
        }
      )
    end
  end

  get "/rapport" do
      init_db
      html = "<table><tr><th>Beskrivelse</th><th>Sum</th><th>Dato</th></tr>"
      results = @coll.find({'user_id' => params[:user]})
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

  post '/rapport' do
    # marker alle ikke-leverte utgiftsrapporter som levert
    # dytt ut en pdf
    content_type :json
    "Hello World".to_json
  end


private

  def current_user
    @current_user = session[:user] if session[:user]
  end

  def init_db
    @conn = Mongo::Connection.new
    @db = @conn['test']
    @coll = @db['usysdev']
  end
end

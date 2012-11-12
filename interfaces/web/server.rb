require 'rubygems'
require 'sinatra'
require "sinatra/reloader"

get '/' do
	if params[:command]
		system("../proxy.rb #{params[:command]}")
		"Calling: proxy.rb #{params[:command]}"
	end
end
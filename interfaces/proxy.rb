#!/usr/bin/env ruby
require 'rubygems'
require 'serialport'
 
port = SerialPort.new( '/dev/tty.usbserial-A800JZ5H', 9600 )
 
# Read a string from the Arduino
port.write(ARGV[0])

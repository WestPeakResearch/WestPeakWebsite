require "fileutils"

def main
  puts "creating a new report"

  print "name: "
  name = gets.chomp

  filename_ending = "_" + (name.gsub " ", "_") + ".pdf"
  filename = Dir.glob("*" + filename_ending)[0]
  print "filename is " + filename
  
  ticker = filename.split("_")[0]
  print "ticker is " + ticker
  
  print "date: "
  date = gets.chomp

  print "company: "
  company = gets.chomp

  print "summary: "
  summary = gets.chomp

  print "stock exchange (defalut value is NASDAQ): "
  stock_exchange = gets.chomp
  if stock_exchange == ""
    stock_exchange = "NASDAQ"
  end

  # input confirmation
  writeback = <<~EOS
    ---
    type: "report"
    paper: "#{filename}"
    author: "#{name}"
    company: "#{company}"
    date: "#{date}"
    summary: "#{summary}"
    title: "#{stock_exchange}: #{ticker}"
    ---
  EOS

  print writeback
  print "proceed? (y/n): "
  proceed = gets.chomp
  if proceed == "n"
    return
  end

  # move pdf
  pdf_origin = "./tmp/" + filename
  pdf_dest = "./static/" + filename
  begin
    FileUtils.move pdf_origin, pdf_dest
  rescue
    puts "cannot move pdf, please check"
  else
    puts "pdf moved"
  end

  # write markdown
  md_dest = "./src/content/Reports" + filename.sub("pdf", "md")
  File.write(md_dest, writeback)
  puts "markdown written"

  print "process complete, repeat? (y/n): "
  repeat = gets.chomp
  if repeat == "y"
    puts "restarting"
    main
  end
end

puts "welcome to the report creator"
puts ""
puts "please put pdfs under a folder called tmp, naming convention TICKER_First_Last.pdf"
puts ""
main

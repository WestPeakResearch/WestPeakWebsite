require "fileutils"

# helper function for getting multiple lines of text
def multi_gets
  all_text = ""
  while all_text << STDIN.gets
    return all_text.sub "DONE", "" if all_text["DONE"]
  end
end

def main
  puts "creating a new member"
  # decide JA or SA creation
  puts "only JA or SA are supported currently"
  print "are you creating a JA? (y/n): "
  ja_yes_no = gets.chomp
  position = "Senior Analyst"
  if ja_yes_no == "y"
    position = "Junior Analyst"
    puts "starting JA creation process"
  else
    puts "starting SA creation process"
  end

  # get member name
  print "name: "
  name = gets.chomp
  name_folder = name.gsub " ", "-"
  name_photo = (name.gsub " ", "_") + ".jpg"

  # get degree
  print "degree (default value 'Bachelor of Commerce - General'): "
  degree = gets.chomp
  if degree == ""
    degree = "Bachelor of Commerce - General"
  elsif degree == "BIE"
    degree = "Bachelor of International Economics"
  end

  # get year
  print "year (default value 2): "
  year = gets.chomp
  if year == ""
    year = "2"
  end

  degree_year = degree + " | Year " + year

  # get bio
  puts "bio (multiline input, type DONE to end): "
  bio = multi_gets

  # input confirmation
  writeback = <<~EOS
    ---
    type: "team"
    name: "#{name}"
    degree: "#{degree_year}"
    position: "#{position}"
    management: "False"
    research: []
    headshot: #{name_photo}
    ---

    #{bio}
  EOS
  print writeback
  print "proceed? (y/n): "
  proceed = gets.chomp
  if proceed == "n"
    return
  end

  # make folder
  folder = "./src/content/Team/" + name_folder
  FileUtils.mkdir folder
  puts "folder created"

  # move headshot
  photo_origin = "./memberphotos/" + name_photo
  photo_dest = folder + "/" + name_photo
  begin
    FileUtils.move photo_origin, photo_dest
  rescue
    puts "photo not found, skipping"
  else
    puts "photo moved"
  end

  # write markdown
  md_dest = folder + "/index.md"
  File.write(md_dest, writeback)
  puts "markdown written"

  print "process complete, repeat? (y/n): "
  repeat = gets.chomp
  if repeat == "y"
    puts "restarting"
    main
  end
end

puts "welcome to the member creator"
puts ""
puts "please put analyst photos under a folder called memberphotos, naming convention First_Last.jpg"
puts ""
main

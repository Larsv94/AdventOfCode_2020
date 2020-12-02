def complies_to_password_rule(range,char, pwd):
  char_count = pwd.count(char)
  return char_count >= int(range[0]) and char_count <= int(range[1])


with open("./input.txt") as file:
  input_values = [x.split(" ") for x in file.read().split("\n")]
  processed = [[x[0].split("-"),x[1].replace(":",""),x[2]] for x in input_values]
  correct_passwords = [x for x in processed if complies_to_password_rule(x[0],x[1],x[2])]
  print(len(correct_passwords))
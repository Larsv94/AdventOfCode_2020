import math

def getRow(code="",rows = range(128)):
  length = len(rows)
  if(length ==1):
    return rows[0]
  slicePos = int(length/2)
  next = rows[:slicePos] if code[0] == 'F' else rows[slicePos:length]
  return getRow(code[1:],next)

def getCol(code="",rows = range(8)):
  length = len(rows)
  if(length ==1):
    return rows[0]
  slicePos = int(length/2)
  next = rows[:slicePos] if code[0] == 'L' else rows[slicePos:length]
  return getCol(code[1:],next)

def customSum(IDs,maxRow):
  count = sum(range(0,8)) + sum(range(maxRow*8,maxRow*8+8))
  for id in IDs:
    if(id>7 and id<maxRow*8):
      count += id
  return count


with open("./input.txt") as file:
  lines = [x.strip() for x in file.readlines()]
  positions = [[getRow(x[:7]),getCol(x[-3:])] for x in lines]
  seatIDs = [x[0]*8+x[1] for x in positions]
  maxID = max(seatIDs)
  print("Part one: "+str(maxID))

  highestRow = math.ceil((maxID-7)/8)
  highestID = highestRow * 8 + 7 - 1
  totalSumIDS = ((highestID + 1) * (highestID+2))/2  #total in list = n*(n+1)/2 = (n+1)*(n+2)/2
  actualSumIDS = customSum(seatIDs,highestRow)

  print("Part two: " + str(totalSumIDS - actualSumIDS))

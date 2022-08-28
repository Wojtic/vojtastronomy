from os import listdir
import shutil

PATH = "/home/vojta/Dokumenty/škola/Poznamky/Poznámky/"
OUTPUT_PATH = "/home/vojta/Dokumenty/programovani/web/vojtastronomy/markdown/"

for f in listdir(PATH):
  if '(web)' in f:
    shutil.copyfile(PATH + f, OUTPUT_PATH + f) 

from os import listdir
import shutil

PATH = "/home/vojta/Dokumenty/škola/Poznamky/Poznámky/"
OUTPUT_PATH = "/home/vojta/Dokumenty/programovani/web/vojtastronomy/src/files/markdown/"

files = []

for f in listdir(PATH):
    if '(web)' in f:
        shutil.copyfile(PATH + f, OUTPUT_PATH + f)
        files.append('{"path":"' + f.replace(" ", "_")
                     [:len(f) - 9] + '", "filename": "' + f[:len(f) - 3] + '"}')


f = open("/home/vojta/Dokumenty/programovani/web/vojtastronomy/src/files/names.json", "w")
f.write("[" + ",".join(files) + "]")
f.close()

import csv
import json

lines = []

with open('daily-minimum-temperatures.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=',')

    for row in csv_reader:
        lines.append(row)

result = []

for line in lines:
    year, month_and_day = line['date'].split('-', maxsplit=1)
    result.append([year, month_and_day, float(line['temperature'])])

with open('data.json', 'w') as outfile:
    json.dump(result, outfile)

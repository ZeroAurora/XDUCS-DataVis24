import json

with open("data/road10map/boundaryroad10.geojson") as geo:
    boundary = json.load(geo)

with open("data/road10map/crosswalkroad10.geojson") as geo:
    crosswalk = json.load(geo)

# with open("data/road10map/laneroad10.geojson") as geo:
#     lane = json.load(geo)

with open("data/road10map/signalroad10.geojson") as geo:
    signal = json.load(geo)

with open("data/road10map/stoplineroad10.geojson") as geo:
    stopline = json.load(geo)

for geo in [boundary, crosswalk, signal, stopline]:
    for feature in geo["features"]:
        feature["properties"]["name"] = geo["name"]

features = boundary["features"] + crosswalk["features"] + signal["features"] + stopline["features"]

output = {
    "type": "FeatureCollection",
    "features": features
}

with open("road10.geojson", "w") as geo:
    json.dump(output, geo)

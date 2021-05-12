# Enjoy Colorado! Hike a Fourteener, Grab a Beer, and Relax

## Description of Application
People can use this interactive website to help plan an adventure in Colorado focused around hiking a fourteener. The key feature of the website is a map of Colorado with the following markers and information bound to them:
- **Mountain Peaks:** Markers for every mountain peak in Colorado that is 14,000 feet or higher. When the markers are clicked on, information is presented about the peaks such as the mounatin range the peak is in, its elevation, its latitude and longitude, the standard route and the distance of that route, the elevation gain, and the level of difficulty.
- **Breweries:** Markers for breweries within a 20 mile radius of each mountain peak. When the markers are clicked on, information is presented about the breweries such as the name, a nearby fourteener, and the brewery address.
- **Campgrounds:** Markers for National Park, National Forest, State Park, BLM, TVA, Army engineers, and military-only campgrounds within a 20 mile radius of each mountain peak. When the markers are clicked on, information is presented about the campsites such as the name, a nearby fourteener, and the miles from it.
- **Gas Stations:** Markers for gas stations within a 20 mile radius of each mountain peak. When the markers are clicked on, information is presented about the gas stations such as the name, a nearby fourteener, and the miles from it.
- **Charging Stations:** Markers for charging stations within a 20 mile radius of each mountain peak. When the markers are clicked on, information is presented about the charging stations such as the name, a nearby fourteener, and the miles from it.
- **Hot Springs:** Markers for hot springs within a 20 mile radius of each mountain peak. When the markers are clicked on, information is presented about the hot springs such as the name, a nearby fourteener, and the miles from it.

In addition to the map, the website has the following elements:
- A carousel of images including photos of some of the peaks, hiking gifs, etc.
- A page with a html table of the brewery data.
- A page with a html table of the fourteener data.
- A page with a html table of the campsite data. 

## Method
1. Downloaded gas station and charging station data.
2. Scraped and cleaned brewery data.
3. Scraped and cleaned hot springs data.
4. Accessed previously compiled data from our ETL project on Colorado Fourteeners.
5. Opened the gas and charging station GeoJSON files and connected to a Mongo database in Jupyter notebook.
6. Paired down the data from the GeoJSON files to the station names, latitudes, and longitudes and put the information into dataframes.
7. Read in the campsite, brewery, hotsprings, and mountain csv files that had been compiled from multiple sources and began calculating each of these features within a 20 mile radius of each peak.
8. After a series of mergers, we ended up with a Mongo database with two collections. One colleciton had all the fourteener specific information and the other collection had all the features within a 20 mile radius of each peak.
9. This local Mongo database was then exported as JSON files which were uploaded to a Mongo Atlas database.
10. Used Flask to set-up a conneciton to the database in Mongo Atlas and wrote d3 functions to run through the data to plot markers in mapbox using leaflet with custom icons and appropriate pop-up information bound to them.
11. Converted fourteener, brewery, and campsite csv files to html tables in Jupyter notebook
12. Created html using bootstrap css styling elements, including a navigation bar and a carousel of images, to display the map and pages for the html data tables. Also, used leaflet css.
13. Used 6 routes in Flask, two for the collections created and four were used for calling the four seperate html files. 
14. Created two directors within static folder: gifs and img which for our saved gifs, images, and icons. 

## Data Sources
- **14er Project/ETL Project:** https://github.com/dalberghini/14er_project
- **Brew Crew Project:** https://github.com/JohnMowry77/brewcrew_project  
- **Brewery Data:** Scraped from https://www.colorado.com/colorado-breweries
- **Campsite Data:** Southwest_camp_data.csv from http://www.uscampgrounds.info/takeit.html to which we added headers.
- **Charging Station Data:** GeoJSON downloaded from https://map.igismap.com/gis-data/united%20states-colorado/charging_station_point
- **Fourteeners Data:** 14ers_data.csv from https://www.kaggle.com/mikeshout/14erpeaks
- **Fourteeners Trailhead by Road Difficulty Data:** Scraped from https://www.14ers.com/php14ers/trailheads_bydifficulty.php
- **Gas Stations Data:** GeoJSON downloaded form https://map.igismap.com/gis-data/united%20states-colorado/petrol_and_gas_stations_point
- **Hot Springs Data:** Scraped from https://www.colorado.com/articles/29-colorado-hot-springs-quick-guide to which we added latitudes and longitudes from Google API.

## Contributors
David Alberghini, Mark Blankenship, John Mowry, and Bryce Wilkinson
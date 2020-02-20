CREATE DATABASE parkdev1;

DROP TABLE IF EXISTS bay_sensors;
DROP TABLE IF EXISTS bay_info;

CREATE TABLE bay_sensors(
    id SERIAL PRIMARY KEY,
    bay_id VARCHAR(200),
    st_marker_id VARCHAR(200),
    status VARCHAR(200),
    lat NUMERIC(25,20),
    lon NUMERIC(25,20),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE bay_info(
    id SERIAL PRIMARY KEY,  
    bayid VARCHAR(200),
    deviceid VARCHAR(200),
    description1 VARCHAR(2000),
    description2 VARCHAR(2000),
    description3 VARCHAR(2000),
    description4 VARCHAR(2000),
    description5 VARCHAR(2000),
    description6 VARCHAR(2000),
    typedesc1 VARCHAR(2000),
    typedesc2 VARCHAR(2000),
    typedesc3 VARCHAR(2000),
    typedesc4 VARCHAR(2000),
    typedesc5 VARCHAR(2000),
    typedesc6 VARCHAR(2000)
);





-- SELECT s.bay_id, COUNT(*)
-- FROM bay_restrictions r, bay_sensors s
-- WHERE s.bay_id = r.bayid
-- GROUP BY s.bay_id
-- HAVING COUNT(*) > 1;

-- SELECT bay_id, COUNT(*)
-- FROM bay_sensors
-- GROUP BY bay_id
-- HAVING COUNT(*) > 1;

-- SELECT * FROM bay_restrictions r, bay_sensors s
-- WHERE s.bay_id = r.bayid
-- ORDER BY s.bay_id;



-- From https://data.melbourne.vic.gov.au/Transport/On-street-Parking-Bay-Sensors/vh2v-4nfs
-- The way the datasets join is as follows. 
--The on-street parking bay sensors join to the on-street parking bays by the marker_id attribute. 
--The on-street parking bay sensors join to the on-street car park bay information by the bay_id attribute. 
--The on-street parking bays and the on-street car park bay information don’t currently join.


-- On-street Parking Bay Sensors: the current status of each sensor.
-- On-street Car Park Bay Information: restrictions that apply to 
--each bay with a sensor, at various times of the week. 
-- On-street Parking Bays: the location and shape of every bay, 
--including the nearly 20,000 without sensors. 

-- count sensor rows varies ~2.7k
-- count info rows 4589
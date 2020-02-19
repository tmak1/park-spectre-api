CREATE DATABASE parkdev1;

/c parkdev1

CREATE TABLE bay_sensors(
    id SERIAL PRIMARY KEY,
    bay_id VARCHAR(200),
    st_marker_id VARCHAR(200),
    status VARCHAR(200),
    lat NUMERIC(25,20),
    lon NUMERIC(25,20)
);

CREATE TABLE bays(
    id SERIAL PRIMARY KEY,
    bay_id VARCHAR(200),
    marker_id VARCHAR(200),
    meter_id VARCHAR(200),
    rd_seg_id VARCHAR(200),
    rd_seg_dsc VARCHAR(2000),
    type VARCHAR(200),
    lat NUMERIC(25,20),
    lon NUMERIC(25,20)
);

CREATE TABLE bay_restrictions(
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

DROP TABLE IF EXISTS bay_sensors;
DROP TABLE IF EXISTS bays;
DROP TABLE IF EXISTS bay_restrictions;


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

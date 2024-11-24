-- create view of overspeed objects, velocity > 60. for each id, keep the one with highest speed
-- requires view has columns id, type, velocity, time
CREATE OR REPLACE VIEW overspeed AS
    SELECT *
    FROM road_data t1
    INNER JOIN (
        SELECT id, MAX(velocity) AS max_velocity
        FROM road_data
        WHERE velocity > 60
        GROUP BY id
    ) t2
    ON t1.id = t2.id AND t1.velocity = t2.max_velocity;

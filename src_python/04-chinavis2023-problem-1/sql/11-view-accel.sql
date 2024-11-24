CREATE OR REPLACE VIEW acceleration AS
WITH acceleration_data AS (
    SELECT
        id,
        type,
        time,
        velocity,
        any(velocity) OVER (PARTITION BY id ORDER BY time ROWS BETWEEN 1 PRECEDING AND 1 PRECEDING) AS prev_velocity,
        any(time) OVER (PARTITION BY id ORDER BY time ROWS BETWEEN 1 PRECEDING AND 1 PRECEDING) AS prev_time,
        COALESCE((velocity - prev_velocity) / 3.6 / (dateDiff('us', time, prev_time) / 1000000), 0) AS acceleration
    FROM road_data
)
SELECT
    a.id,
    a.type,
    a.time,
    a.acceleration
FROM acceleration_data a
JOIN (
    SELECT
        id,
        MAX(ABS(acceleration)) AS max_acceleration
    FROM acceleration_data
    WHERE ABS(acceleration) > 10 AND isNotNull(acceleration)
    GROUP BY id
) m ON a.id = m.id AND a.acceleration = m.max_acceleration;

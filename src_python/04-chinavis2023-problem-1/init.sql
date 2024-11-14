DROP TABLE IF EXISTS road_data;
CREATE TABLE road_data (
    id UInt64,
    seq UInt64,
    is_moving Bool,
    position Tuple(x Float64, y Float64, z Float64),
    shape Tuple(x Float64, y Float64, z Float64),
    orientation Float64,
    velocity Float64,
    type UInt64,
    heading Float64,
    time DateTime64(6)
) ENGINE = MergeTree
ORDER BY (time, id, seq);

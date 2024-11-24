DROP TABLE IF EXISTS student_info;
CREATE TABLE student_info (
    student_ID String,
    sex String,
    age Int64,
    major String
)
ENGINE = MergeTree
ORDER BY student_ID;

DROP TABLE IF EXISTS title_info;
CREATE TABLE title_info (
    title_ID String,
    score Int64,
    knowledge String,
    sub_knowledge String,
    passed_count Int64,
    total_count Int64,
    avg_retries Float64,
    avg_score Float64,
    avg_score_percentage Float64
)
ENGINE = MergeTree
ORDER BY title_ID;

DROP TABLE IF EXISTS submit_record;
CREATE TABLE submit_record (
    class String,
    time DateTime64(3, 'Asia/Shanghai'),
    state String,
    score Int64,
    title_ID String,
    method String,
    memory Int64,
    timeconsume Int64,
    student_ID String,
    error_type_count Float64,
    retry_count Int64,
    score_bonus Float64,
    tc_bonus Float64,
    mem_bonus Float64,
    error_type_penalty Float64,
    retry_time_penalty Int64,
    rank Int64,
    rank_bonus Float64,
    total_score Float64
)
ENGINE = MergeTree
ORDER BY (title_ID, student_ID);

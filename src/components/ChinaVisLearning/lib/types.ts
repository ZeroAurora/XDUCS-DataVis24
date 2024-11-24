export interface SubmitRecordRowData {
  class: string;
  time: string;
  state: string;
  score: number;
  title_ID: string;
  method: string;
  memory: number;
  timeconsume: number;
  student_ID: string;
  error_type_count: number;
  retry_count: number;
  score_bonus: number;
  tc_bonus: number;
  mem_bonus: number;
  error_type_penalty: number;
  retry_time_penalty: number;
  rank: number;
  rank_bonus: number;
  total_score: number;
}

export interface StudentInfoRowData {
  student_ID: string;
  sex: string;
  age: number;
  major: string;
}

export interface TitleInfoRowData {
  title_ID: string;
  score: number;
  knowledge: string;
  sub_knowledge: string;
  passed_count: number;
  total_count: number;
  avg_retries: number;
  avg_score: number;
  avg_score_percentage: number;
}

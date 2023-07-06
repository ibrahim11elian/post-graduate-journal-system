export type DATA = {
  researcher_name: string;
  workplace: string;
  rank: string;
  email: string;
  phone: number;
  research_date: string;
  research_title: string;
  research_pdf: File;
  research_summary: File;
  cv: File;
  //   //   journal_edition: number;
  //   //   edition_date: string;
  //   //   ex_out_ltr: number;
  //   //   ex_in_ltr: number;
  //   //   ex_result: string;
  //   //   judge_name: string[];
  //   //   judge_letter: string[];
  //   //   judge_ltr_date: string[];
  //   //   sci_result: string[];
};

export function isValid(formData: DATA): boolean {
  for (const key in formData) {
    if (!formData[key]) {
      return false;
    }
  }
  return true;
}

export const ANALYTICS_EVENTS = {
  pageView: "page_view",
  contactFormError: "contact_form_error",
  contactFormSubmit: "contact_form_submit",
  waitlistSubmit: "waitlist_submit",
  waitlistSubmitError: "waitlist_submit_error",
  resourceView: "resource_view",
  resourceBookClick: "resource_book_click",
  resourceCitationClick: "resource_citation_click",
  worksheetDownloadClick: "worksheet_download_click",
  intensiveFitCheckStart: "intensive_fit_check_start",
  intensiveFitCheckStepView: "intensive_fit_check_step_view",
  intensiveFitCheckAnswer: "intensive_fit_check_answer",
  intensiveFitCheckComplete: "intensive_fit_check_complete",
  intensiveFitCheckExit: "intensive_fit_check_exit",
  intensiveFitCheckCtaClick: "intensive_fit_check_cta_click",
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/**
 * §9 — Form, validation, and system messages (canonical copy).
 */

export const S9 = {
  emailEmpty: 'Enter your work email.',
  emailInvalid: 'Enter a valid work email.',
  organisationEmpty: 'Enter your organisation name.',
  industryEmpty: 'Select your industry.',
  orgSizeEmpty: 'Select your organisation size.',
  primaryObjectiveEmpty: 'Select your primary objective.',
  submitFailed: 'Your request could not be submitted right now. Please try again or contact us directly.',
  submitSuccess: 'Your request has been received. We will review your inputs and respond with the appropriate next steps.',
  submitting: 'Submitting...',
  /** Contact & documentation: §9.2 inline validation (not enumerated in §9.3) */
  nameEmpty: 'Enter your name.',
  messageEmpty: 'Enter your message.',
  roleEmpty: 'Enter your role.',
  reviewObjectiveEmpty: 'Describe your review objective.',
  environmentTypeEmpty: 'Describe your environment type.',
  primaryAreaEmpty: 'Describe your primary area of interest.',
  currentChallengeEmpty: 'Describe your current challenge.',
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidWorkEmail(value: string): boolean {
  const t = value.trim();
  return EMAIL_RE.test(t);
}

export function shouldSimulateSubmitFailure(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('simulateSubmit') === 'fail';
}

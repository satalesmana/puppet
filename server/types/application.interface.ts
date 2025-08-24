export interface RootApplications {
  data: Data,
  errors: Error[]
}

export interface Data {
  applications: Applications
}

export interface Applications {
  result: Result[]
  pageInfo: PageInfo
  __typename: string
}

export interface Result {
  id: string
  adcentreCandidateId: string
  adcentreProspectId: string
  candidateId: string
  applicationId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  mostRecentJobTitle: string
  mostRecentCompanyName: string
  mostRecentRoleMonths: number
  appliedDateUtc: string
  statusFolder: string
  isRead: boolean
  isPriorityApply: boolean
  metadata: Metadata
  candidateStats: CandidateStats
  rating: Rating
  source: string
  billableStatus: any
  matchedQualities: MatchedQuality[]
  attachmentsV2: AttachmentsV2
  verifications: Verifications
  questionnaireSubmission: QuestionnaireSubmission
  profile: Profile
  fit: Fit
  __typename: string
}

export interface Metadata {
  result: Result2
  __typename: string
}

export interface Result2 {
  emailCount: number
  noteCount: number
  hasResume: boolean
  hasCoverLetter: boolean
  hasSelectionCriteria: boolean
  __typename: string
}

export interface CandidateStats {
  result: Result3
  __typename: string
}

export interface Result3 {
  totalApplicationCount: number
  __typename: string
}

export interface Rating {
  rating: number
  __typename: string
}

export interface MatchedQuality {
  id: string
  isTop: boolean
  displayLabel: string
  relevanceScore: number
  __typename: string
}

export interface AttachmentsV2 {
  result: Result4[]
  __typename: string
}

export interface Result4 {
  attachmentId: string
  attachmentType: string
  hasConvertedPdf: boolean
  fileName: any
  __typename: string
}

export interface Verifications {
  result: any[]
  __typename: string
}

export interface QuestionnaireSubmission {
  result: Result5
  __typename: string
}

export interface Result5 {
  id: string
  questions: Question[]
  __typename: string
}

export interface Question {
  id: string
  legacyId: any
  text: string
  answers: Answer[]
  status: string
  answerType: string
  source: string
  __typename: string
}

export interface Answer {
  id: string
  legacyId: any
  text: string
  verification: any
  __typename: string
}

export interface Profile {
  result: Result6
  __typename: string
}

export interface Result6 {
  education: Education[]
  licences: Licence[]
  skills: Skill[]
  workHistory: WorkHistory[]
  rightsToWork: RightsToWork[]
  rightsToWorkV2: RightsToWorkV2[]
  verificationsStats: VerificationsStats
  verifications: Verifications2
  homeLocation: HomeLocation
  nationalities: Nationalities
  referenceChecksStats: ReferenceChecksStats
  __typename: string
}

export interface Education {
  id: string
  name: string
  completed: boolean
  completionDate?: CompletionDate
  highlights?: string
  institute: string
  credential: any[]
  verification: any
  __typename: string
}

export interface CompletionDate {
  year: number
  month?: number
  __typename: string
}

export interface Licence {
  id: string
  name: string
  issuingOrganisation?: string
  issueDate?: IssueDate
  expiryDate?: ExpiryDate
  noExpiryDate: boolean
  description?: string
  formattedExpiryDate?: string
  credential: any[]
  verification: any
  __typename: string
}

export interface IssueDate {
  month: number
  year: number
  __typename: string
}

export interface ExpiryDate {
  month: number
  year: number
  __typename: string
}

export interface Skill {
  keyword: string
  __typename: string
}

export interface WorkHistory {
  id: string
  title: string
  company: string
  startDate: StartDate
  endDate?: EndDate
  achievements?: string
  __typename: string
}

export interface StartDate {
  month: number
  year: number
  __typename: string
}

export interface EndDate {
  month: number
  year: number
  __typename: string
}

export interface RightsToWork {
  country: string
  answer: string
  __typename: string
}

export interface RightsToWorkV2 {
  id: string
  displayLabel: string
  __typename: string
}

export interface VerificationsStats {
  totalCount: number
  __typename: string
}

export interface Verifications2 {
  result: Result7
  __typename: string
}

export interface Result7 {
  verifiedIdentity: any
  workHistory: any[]
  education: any[]
  licences: any[]
  rightToWork: any[]
  __typename: string
}

export interface HomeLocation {
  id: string
  displayDescription: string
  __typename: string
}

export interface Nationalities {
  result: any[]
  __typename: string
}

export interface ReferenceChecksStats {
  result: any
  __typename: string
}

export interface Fit {
  result: any
  __typename: string
}

export interface PageInfo {
  pageNumber: number
  pageSize: number
  total: number
  totalPages: number
  __typename: string
}

export interface RootFetchPelamar {
  count: number
  data: Data
  expInfo: string
}

export interface Data {
  applications: Application[]
  statusBreakdown: StatusBreakdown
  order: string
}

export interface Application {
  id: string
  note: any
  createdAt: string
  updatedAt: string
  JobId: string
  attachments?: any[]
  expiryDate: string
  metadata: Metadata
  employerMetadata: EmployerMetadata
  status: string
  source: string
  firstReadAt: string
  FirstReaderId: string
  resume: any
  expectedSalary: number
  phone: any
  relevancePercentage: number
  ApplicantId: string
  Applicant: Applicant
  whatsAppDetails: WhatsAppDetails
  screeningQuestion: any
  isExpiringSoon: boolean
  firstShortlistedAt: string
}

export interface Metadata {
  streamChannelId: string
}

export interface EmployerMetadata {
  accessLevel: string
}

export interface Applicant {
  id: string
  name: string
  intro?: string
  nationality: any
  location: string
  gender: string
  candidateStatus: string
  birthDate: string
  lastSeen: string
  createdAt: string
  updatedAt: string
  workDurationInMonths: number
  salary: Salary
  highestEducationLevel: string
  profilePics: ProfilePic[]
  experiences?: Experience[]
  educations: Education[]
  skills: Skill[]
  network: any
  portfolio: any
  latestWorkExperience?: LatestWorkExperience
  latestEducationExperience: LatestEducationExperience
  locationFormattedNames: LocationFormattedName[]
  hierarchicalLocation: HierarchicalLocation
  jobRolePreferences: JobRolePreference[]
  hasResume: boolean
  email: string
  resume: string
  firstName: string
  lastName: string
  UnlockedByCompanies: any
  isTalentBookmarked: boolean
  isUnlocked: boolean
  phone: string
  whatsappNumber: string
  careerStartDate: string
  ccas?: Cca[]
  awards?: Award[]
  certificates?: Certificate[]
  ugcFullName: string
  distanceText?: string
  FeedData: any
}

export interface Salary {
  currencyCode: string
  latest: any
  expectation: number
}

export interface ProfilePic {
  source: string
  key: string
}

export interface Experience {
  id: string
  title: string
  organization?: string
  description?: string
  startDate?: string
  endDate?: string
  isPresent: boolean
  type: string
}

export interface Education {
  id: string
  isPresent: boolean
  degree?: string
  school: string
  educationLevel: string
  fieldOfStudy: string
  translationKey: string
  startDate: string
  endDate: string
}

export interface Skill {
  id: string
  name: string
}

export interface LatestWorkExperience {
  id: string
  title: string
  organization: string
  description?: string
  startDate: string
  endDate?: string
  isPresent: boolean
  type: string
}

export interface LatestEducationExperience {
  id: string
  isPresent: boolean
  degree?: string
  school: string
  educationLevel: string
  fieldOfStudy: string
  translationKey: string
  startDate: string
  endDate: string
}

export interface LocationFormattedName {
  locationId: string
  formattedName: string
}

export interface HierarchicalLocation {
  id: string
  parentId: string
  latitude: number
  longitude: number
  level: number
  defaultName: string
  formattedName: string
  name: string
  translationKey: string
  slug: string
  countryCode: string
  administrativeLevelId: string
  administrativeLevelDefaultName: string
  administrativeLevelTranslationKey: string
  administrativeLevelPrefix: string
  administrativeLevelPrefixTranslationKey: string
  parents: Parent[]
  parent: Parent4
  children: any[]
}

export interface Parent {
  id: string
  parentId: string
  latitude: number
  longitude: number
  level: number
  defaultName: string
  formattedName: string
  name: string
  translationKey: string
  slug: string
  countryCode: string
  administrativeLevelId: string
  administrativeLevelDefaultName: string
  administrativeLevelTranslationKey: string
  administrativeLevelPrefix: string
  administrativeLevelPrefixTranslationKey: string
  parents?: Parent2[]
  parent?: Parent3
  children: any[]
}

export interface Parent2 {
  id: string
  parentId: string
  latitude: number
  longitude: number
  level: number
  defaultName: string
  formattedName: string
  name: string
  translationKey: string
  slug: string
  countryCode: string
  administrativeLevelId: string
  administrativeLevelDefaultName: string
  administrativeLevelTranslationKey: string
  administrativeLevelPrefix: string
  administrativeLevelPrefixTranslationKey: string
  parents: any
  parent: any
  children: any[]
}

export interface Parent3 {
  id: string
  parentId: string
  latitude: number
  longitude: number
  level: number
  defaultName: string
  formattedName: string
  name: string
  translationKey: string
  slug: string
  countryCode: string
  administrativeLevelId: string
  administrativeLevelDefaultName: string
  administrativeLevelTranslationKey: string
  administrativeLevelPrefix: string
  administrativeLevelPrefixTranslationKey: string
  parents: any
  parent: any
  children: any[]
}

export interface Parent4 {
  id: string
  parentId: string
  latitude: number
  longitude: number
  level: number
  defaultName: string
  formattedName: string
  name: string
  translationKey: string
  slug: string
  countryCode: string
  administrativeLevelId: string
  administrativeLevelDefaultName: string
  administrativeLevelTranslationKey: string
  administrativeLevelPrefix: string
  administrativeLevelPrefixTranslationKey: string
  parents: Parent5[]
  parent: Parent6
  children: any[]
}

export interface Parent5 {
  id: string
  parentId: string
  latitude: number
  longitude: number
  level: number
  defaultName: string
  formattedName: string
  name: string
  translationKey: string
  slug: string
  countryCode: string
  administrativeLevelId: string
  administrativeLevelDefaultName: string
  administrativeLevelTranslationKey: string
  administrativeLevelPrefix: string
  administrativeLevelPrefixTranslationKey: string
  parents: any
  parent: any
  children: any[]
}

export interface Parent6 {
  id: string
  parentId: string
  latitude: number
  longitude: number
  level: number
  defaultName: string
  formattedName: string
  name: string
  translationKey: string
  slug: string
  countryCode: string
  administrativeLevelId: string
  administrativeLevelDefaultName: string
  administrativeLevelTranslationKey: string
  administrativeLevelPrefix: string
  administrativeLevelPrefixTranslationKey: string
  parents: any
  parent: any
  children: any[]
}

export interface JobRolePreference {
  id: string
  experience: any
  jobCategoryId: any
  jobTitleId: any
  createdAt: any
  updatedAt: any
  hierarchicalJobCategoryId: string
  hierarchicalJobCategory: HierarchicalJobCategory
}

export interface HierarchicalJobCategory {
  id: string
  parentId: string
  name: string
  level: number
  defaultName: string
  isPaidJobPossible: boolean
  translation_key: string
  createdAt: string
  updatedAt: string
  parents: Parent7[]
  children: any[]
}

export interface Parent7 {
  id: string
  parentId: string
  name: string
  level: number
  defaultName: string
  isPaidJobPossible: boolean
  translation_key: string
  createdAt: string
  updatedAt: string
  parents: Parent8[]
  children: any[]
}

export interface Parent8 {
  id: string
  parentId: string
  name: string
  level: number
  defaultName: string
  isPaidJobPossible: boolean
  translation_key: string
  createdAt: string
  updatedAt: string
  parents: any[]
  children: any[]
}

export interface Cca {
  id: string
  userId: any
  title: string
  activity: string
  startDate: string
  endDate?: string
  isPresent: boolean
  notes: string
  type: string
}

export interface Award {
  id: string
  title: string
  userId?: string
  achievement: string
  startDate: any
  endDate: string
  isPresent: boolean
  notes: string
  type: string
}

export interface Certificate {
  id: string
  userId: any
  organization: string
  title: string
  startDate: string
  endDate?: string
  isPresent: boolean
  notes: string
  type: string
}

export interface WhatsAppDetails {
  whatsAppNumber: string
  isAvailable: boolean
}

export interface StatusBreakdown {
  ASSESSMENT: number
  HIRED: number
  INTERVIEWING: number
  IN_REVIEW: number
  NEW: number
  OFFERED: number
  REJECTED: number
}

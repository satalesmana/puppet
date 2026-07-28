export interface IndeedFetchPelamanrReq{
  cookies: string
  positionId: string
  initial_id: string
  taskId:any
}

export interface RootIndeedPelamar {
  data: DataIndeedPelamar
  errors:any
}

export interface DataIndeedPelamar {
  findRCPMatches: FindRcpmatches
}

export interface FindRcpmatches {
  matchConnection: MatchConnection
}

export interface MatchConnection {
  matches: Match[]
}

export interface Match {
  candidateSubmission: CandidateSubmission
}

export interface CandidateSubmission {
  id: string
  data: Data2
}

export interface Data2 {
  profile: Profile
}

export interface Profile {
  name: Name
  location: Location
  contact: Contact
}

export interface Name {
  displayName: string
}

export interface Location {
  country: string
  location: string
}

export interface Contact {
  phoneNumber: string
}

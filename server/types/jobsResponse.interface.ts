export interface JobsResponseDataRoot {
  data: Data
  errors: Error[]
}

export interface Data {
  jobs: Jobs
}

export interface Jobs {
  result: Result
  __typename: string
}

export interface Result {
  edges: Edge[]
  totalCount: number
  __typename: string
}

export interface Edge {
  node: Node
  __typename: string
}

export interface Node {
  id: string
  advertiserJobReference: any
  owner: Owner
  createdDate: string
  expiryDate: string
  listingDate: string
  locationId: string
  locations: Location[]
  postType: string
  status: string
  title: string
  daysRemaining: number
  candidatesCount: number
  newCandidatesCount: number
  canBeUpgraded: boolean
  canBeRefreshed: boolean
  performanceRating: PerformanceRating
  payPerPlacementEligibility: PayPerPlacementEligibility
  isIndirectJobButCanBeChanged: boolean
  __typename: string
}

export interface Owner {
  fullName: string
  __typename: string
}

export interface Location {
  description: string
  country: string
  __typename: string
}

export interface PerformanceRating {
  score: any
  status: string
  __typename: string
}

export interface PayPerPlacementEligibility {
  reason: string
  __typename: string
}

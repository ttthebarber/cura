import { Database } from './database'

export type Vendor = Database['public']['Tables']['vendors']['Row']
export type VendorInsert = Database['public']['Tables']['vendors']['Insert']
export type VendorUpdate = Database['public']['Tables']['vendors']['Update']

export type RiskAssessment = Database['public']['Tables']['risk_assessments']['Row']
export type RiskAssessmentInsert = Database['public']['Tables']['risk_assessments']['Insert']
export type RiskAssessmentUpdate = Database['public']['Tables']['risk_assessments']['Update']

export type Alert = Database['public']['Tables']['alerts']['Row']
export type AlertInsert = Database['public']['Tables']['alerts']['Insert']
export type AlertUpdate = Database['public']['Tables']['alerts']['Update']

export type CheckType = 'sanctions' | 'bankruptcy' | 'business_registry' | 'domain' | 'news'
export type RiskLevel = 'low' | 'medium' | 'high'
export type VendorStatus = 'pending' | 'approved' | 'rejected'
export type AssessmentStatus = 'pending' | 'completed' | 'failed'
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical'

export interface VendorWithAssessments extends Vendor {
  risk_assessments: RiskAssessment[]
}

export interface VendorStats {
  total: number
  pending: number
  approved: number
  rejected: number
  highRisk: number
  mediumRisk: number
  lowRisk: number
}

export interface SanctionsFindings {
  matches: Array<{
    name: string
    list: string
    score: number
    details?: string
  }>
  totalScore: number
}

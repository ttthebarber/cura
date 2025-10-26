export interface Database {
  public: {
    Tables: {
      vendors: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string | null
          phone: string | null
          website: string | null
          address: string | null
          business_registration_number: string | null
          risk_score: number
          risk_level: 'low' | 'medium' | 'high'
          status: 'pending' | 'approved' | 'rejected'
          last_assessed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email?: string | null
          phone?: string | null
          website?: string | null
          address?: string | null
          business_registration_number?: string | null
          risk_score?: number
          risk_level?: 'low' | 'medium' | 'high'
          status?: 'pending' | 'approved' | 'rejected'
          last_assessed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          website?: string | null
          address?: string | null
          business_registration_number?: string | null
          risk_score?: number
          risk_level?: 'low' | 'medium' | 'high'
          status?: 'pending' | 'approved' | 'rejected'
          last_assessed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      risk_assessments: {
        Row: {
          id: string
          vendor_id: string
          check_type: 'sanctions' | 'bankruptcy' | 'business_registry' | 'domain' | 'news'
          status: 'pending' | 'completed' | 'failed'
          score: number
          findings: any | null
          checked_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          vendor_id: string
          check_type: 'sanctions' | 'bankruptcy' | 'business_registry' | 'domain' | 'news'
          status?: 'pending' | 'completed' | 'failed'
          score?: number
          findings?: any | null
          checked_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          vendor_id?: string
          check_type?: 'sanctions' | 'bankruptcy' | 'business_registry' | 'domain' | 'news'
          status?: 'pending' | 'completed' | 'failed'
          score?: number
          findings?: any | null
          checked_at?: string | null
          created_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          vendor_id: string
          user_id: string
          severity: 'low' | 'medium' | 'high' | 'critical'
          title: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          vendor_id: string
          user_id: string
          severity: 'low' | 'medium' | 'high' | 'critical'
          title: string
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          vendor_id?: string
          user_id?: string
          severity?: 'low' | 'medium' | 'high' | 'critical'
          title?: string
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}

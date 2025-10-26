-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create vendors table
CREATE TABLE vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  website TEXT,
  address TEXT,
  business_registration_number TEXT,
  risk_score INTEGER DEFAULT 0,
  risk_level TEXT DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  last_assessed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create risk_assessments table
CREATE TABLE risk_assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE NOT NULL,
  check_type TEXT NOT NULL CHECK (check_type IN ('sanctions', 'bankruptcy', 'business_registry', 'domain', 'news')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  score INTEGER DEFAULT 0,
  findings JSONB,
  checked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create alerts table
CREATE TABLE alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for vendors table
CREATE POLICY "Users can view their own vendors" ON vendors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own vendors" ON vendors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own vendors" ON vendors
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vendors" ON vendors
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for risk_assessments table
CREATE POLICY "Users can view assessments for their vendors" ON risk_assessments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM vendors 
      WHERE vendors.id = risk_assessments.vendor_id 
      AND vendors.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert assessments for their vendors" ON risk_assessments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM vendors 
      WHERE vendors.id = risk_assessments.vendor_id 
      AND vendors.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update assessments for their vendors" ON risk_assessments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM vendors 
      WHERE vendors.id = risk_assessments.vendor_id 
      AND vendors.user_id = auth.uid()
    )
  );

-- Create RLS policies for alerts table
CREATE POLICY "Users can view their own alerts" ON alerts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own alerts" ON alerts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts" ON alerts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alerts" ON alerts
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_vendors_user_id ON vendors(user_id);
CREATE INDEX idx_vendors_status ON vendors(status);
CREATE INDEX idx_vendors_risk_level ON vendors(risk_level);
CREATE INDEX idx_risk_assessments_vendor_id ON risk_assessments(vendor_id);
CREATE INDEX idx_risk_assessments_check_type ON risk_assessments(check_type);
CREATE INDEX idx_alerts_user_id ON alerts(user_id);
CREATE INDEX idx_alerts_is_read ON alerts(is_read);
CREATE INDEX idx_alerts_severity ON alerts(severity);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for vendors table
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

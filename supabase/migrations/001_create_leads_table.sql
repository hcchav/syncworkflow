-- Create leads table for storing form submissions
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  next_show VARCHAR(50) NOT NULL CHECK (next_show IN ('Soon', '30-60 days', '60-90 days', 'Not scheduled')),
  notes TEXT,
  source VARCHAR(100) NOT NULL DEFAULT 'boat-tradeshow-landing',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Create index on source for analytics
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from API (anonymous users)
CREATE POLICY "Allow inserts for leads" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow reads for authenticated users only
CREATE POLICY "Allow reads for authenticated users" ON leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

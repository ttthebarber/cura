import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { User, Mail, Bell, Shield } from 'lucide-react'

export default function SettingsPage() {
  // Mock user data for frontend development
  const user = {
    email: 'user@example.com'
  }

  return (
    <div className="mx-5 space-y-6">
      <div className="animate-fade-up">
        <h1 className="text-xl font-bold text-gray-900 pb-4 tracking-[1px]">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
        {/* Account Settings */}
        <Card className="rounded-[35px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-600">
              <User className="h-5 w-5" />
              Account Settings
            </CardTitle>
            <CardDescription>
              Manage your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email || ''}
                disabled
                className="bg-gray-50"
              />
              <p className="text-sm text-gray-500">
                Email cannot be changed. Contact support if needed.
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="rounded-[35px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-600">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure how you receive alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>High Risk Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified of high-risk vendors</p>
                </div>
                <Button variant="outline" size="sm">
                  Enabled
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Assessment Complete</Label>
                  <p className="text-sm text-gray-500">Notify when risk assessments finish</p>
                </div>
                <Button variant="outline" size="sm">
                  Enabled
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Summary</Label>
                  <p className="text-sm text-gray-500">Receive weekly risk summary</p>
                </div>
                <Button variant="outline" size="sm">
                  Disabled
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="rounded-[35px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-600">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
                </div>
                <Button variant="outline" size="sm">
                  30 min
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="rounded-[35px]">
          <CardHeader>
            <CardTitle className="text-gray-600">Data & Privacy</CardTitle>
            <CardDescription>
              Manage your data and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Export My Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Download Reports
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}

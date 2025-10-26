import SignupForm from '@/components/auth/signup-form'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="animate-fade-up">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-[1px]">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your existing account
            </a>
          </p>
        </div>
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <SignupForm />
        </div>
      </div>
    </div>
  )
}

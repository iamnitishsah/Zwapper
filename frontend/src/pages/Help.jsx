import { HelpCircle, Users, MessageSquare, User, Settings, ArrowRight } from 'lucide-react';

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Help & Support</h1>
        <p className="text-lg text-gray-600">
          Learn how to use Zwapper to connect with skill partners
        </p>
      </div>

      {/* Getting Started */}
      <div className="card p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Your Account</h3>
              <p className="text-gray-600 mb-3">
                Sign up with your full name, email, and a unique username. Your username will be used by others to find your profile.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Choose a username that's easy to remember</li>
                <li>• Use a strong password to protect your account</li>
                <li>• Verify your email address</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Your Profile</h3>
              <p className="text-gray-600 mb-3">
                Add your skills, location, and availability to help others find you.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• List skills you can teach others</li>
                <li>• Add skills you want to learn</li>
                <li>• Set your location and availability</li>
                <li>• Choose your privacy settings</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">3</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Skill Partners</h3>
              <p className="text-gray-600 mb-3">
                Browse the community to find people with the skills you want to learn.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Search by skill name or username</li>
                <li>• Filter by availability and location</li>
                <li>• View detailed profiles</li>
                <li>• Send swap requests</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">4</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Learning & Teaching</h3>
              <p className="text-gray-600 mb-3">
                Connect with your skill partners and begin your learning journey.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Send and receive swap requests</li>
                <li>• Coordinate meeting times</li>
                <li>• Share knowledge and learn together</li>
                <li>• Build lasting connections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Features Guide */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="card p-6">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Discover Users</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Browse public profiles to find people with the skills you want to learn. Use search filters to narrow down results by location, availability, and specific skills.
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Search by skill or username</li>
            <li>• Filter by availability</li>
            <li>• Sort by distance or date</li>
            <li>• View detailed profiles</li>
          </ul>
        </div>

        <div className="card p-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="w-6 h-6 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Manage Requests</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Send swap requests to users and manage incoming requests. Track the status of your requests and coordinate with your skill partners.
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Send swap requests</li>
            <li>• Accept or reject requests</li>
            <li>• Track request status</li>
            <li>• Cancel pending requests</li>
          </ul>
        </div>

        <div className="card p-6">
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Profile Management</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Keep your profile up to date with your current skills, availability, and preferences. Control your privacy settings and visibility.
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Update skills and availability</li>
            <li>• Set privacy preferences</li>
            <li>• Manage location settings</li>
            <li>• Control profile visibility</li>
          </ul>
        </div>

        <div className="card p-6">
          <div className="flex items-center mb-4">
            <Settings className="w-6 h-6 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Dashboard</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Access your personal dashboard to manage your profile, view requests, and track your learning progress.
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Edit profile information</li>
            <li>• View request history</li>
            <li>• Manage settings</li>
            <li>• Track activity</li>
          </ul>
        </div>
      </div>

      {/* Tips */}
      <div className="card p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips for Success</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Creating Your Profile</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Be specific about your skills and experience level</li>
              <li>• Set realistic availability that you can maintain</li>
              <li>• Add a clear location to help with local connections</li>
              <li>• Keep your profile updated as you learn new skills</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Making Connections</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Send personalized swap requests with clear messages</li>
              <li>• Be respectful of others' time and availability</li>
              <li>• Follow up on accepted requests promptly</li>
              <li>• Be open to learning from different skill levels</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How do I find someone to learn a specific skill from?
            </h3>
            <p className="text-gray-600">
              Use the search function on the Home page to search by skill name or username. You can also filter results by availability and location to find the best matches.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What should I include in a swap request?
            </h3>
            <p className="text-gray-600">
              Be clear about what skill you want to learn and what skill you can offer in return. Include any specific details about your experience level and availability.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I make my profile private?
            </h3>
            <p className="text-gray-600">
              Yes, you can control your profile visibility in your Dashboard settings. Private profiles won't appear in search results but you can still send requests to other users.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How do I coordinate meeting times with my skill partner?
            </h3>
            <p className="text-gray-600">
              Once a swap request is accepted, you can communicate through the platform to coordinate meeting times, locations, and session details.
            </p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Help?</h2>
        <p className="text-gray-600 mb-6">
          If you have questions or need assistance, please contact our support team.
        </p>
        <button className="btn-primary">
          Contact Support
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Help; 
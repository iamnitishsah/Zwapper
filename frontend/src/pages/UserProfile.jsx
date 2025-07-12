import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usersAPI } from '../services/api';
import { MapPin, Clock, ArrowRight, MessageSquare } from 'lucide-react';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await usersAPI.getByUsername(username);
        setUser(response.data.data);
      } catch (error) {
        setError('User not found or profile is private');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const formatAvailability = (availability) => {
    if (!availability || (!availability.days?.length && !availability.timeSlots?.length)) {
      return 'Not specified';
    }

    const days = availability.days?.length ? availability.days.join(', ') : '';
    const times = availability.timeSlots?.length ? availability.timeSlots.join(', ') : '';
    
    if (days && times) {
      return `${days} - ${times}`;
    } else if (days) {
      return days;
    } else if (times) {
      return times;
    }
    
    return 'Not specified';
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/home" className="btn-primary">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="card p-8 mb-8">
        <div className="flex items-start space-x-6">
          <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">
              {user.fullName?.charAt(0) || user.username?.charAt(0) || 'U'}
            </span>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user.fullName}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              @{user.username}
            </p>
            
            {/* Location */}
            {user.location?.address && (
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{user.location.address}</span>
              </div>
            )}
            
            {/* Availability */}
            <div className="flex items-center text-gray-600 mb-6">
              <Clock className="w-5 h-5 mr-2" />
              <span>{formatAvailability(user.availability)}</span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/swap-request/new?recipient=${user._id}`}
                className="btn-primary flex items-center justify-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Request Swap
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/home"
                className="btn-secondary flex items-center justify-center"
              >
                Back to Search
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Skills Offered */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Skills I Can Teach
          </h2>
          {user.skillsOffered?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.map((skill, index) => (
                <span key={index} className="tag-primary">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills listed</p>
          )}
        </div>

        {/* Skills Wanted */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Skills I Want to Learn
          </h2>
          {user.skillsWanted?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.map((skill, index) => (
                <span key={index} className="tag-secondary">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills listed</p>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="card p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          About
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Member Since</h3>
            <p className="text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Profile Status</h3>
            <span className={`tag ${user.isPublic ? 'tag-primary' : 'tag-secondary'}`}>
              {user.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="card p-8 mt-8 text-center bg-primary-50 border-primary-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-gray-600 mb-6">
          Send a swap request to {user.fullName} and start your learning journey together.
        </p>
        <Link
          to={`/swap-request/new?recipient=${user._id}`}
          className="btn-primary text-lg px-8 py-3"
        >
          Request Skill Swap
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default UserProfile; 
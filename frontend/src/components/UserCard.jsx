import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

const UserCard = ({ user }) => {
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

  const truncateSkills = (skills, maxLength = 3) => {
    if (!skills || skills.length === 0) return [];
    return skills.slice(0, maxLength);
  };

  return (
    <div className="card p-6 hover:shadow-md transition-shadow">
      {/* User Header */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-sm">
            {user.fullName?.charAt(0) || user.username?.charAt(0) || 'U'}
          </span>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {user.fullName}
          </h3>
          <p className="text-sm text-gray-500">
            @{user.username}
          </p>
        </div>
      </div>

      {/* Location */}
      {user.location?.address && (
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{user.location.address}</span>
        </div>
      )}

      {/* Availability */}
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <Clock className="w-4 h-4 mr-1" />
        <span>{formatAvailability(user.availability)}</span>
      </div>

      {/* Skills Offered */}
      {user.skillsOffered?.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Offers:</h4>
          <div className="flex flex-wrap gap-1">
            {truncateSkills(user.skillsOffered).map((skill, index) => (
              <span key={index} className="tag-primary">
                {skill}
              </span>
            ))}
            {user.skillsOffered.length > 3 && (
              <span className="text-xs text-gray-500">
                +{user.skillsOffered.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Skills Wanted */}
      {user.skillsWanted?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Wants to learn:</h4>
          <div className="flex flex-wrap gap-1">
            {truncateSkills(user.skillsWanted).map((skill, index) => (
              <span key={index} className="tag-secondary">
                {skill}
              </span>
            ))}
            {user.skillsWanted.length > 3 && (
              <span className="text-xs text-gray-500">
                +{user.skillsWanted.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Link
          to={`/user/${user.username}`}
          className="flex-1 btn-secondary text-center"
        >
          View Profile
        </Link>
        <Link
          to={`/swap-request/new?recipient=${user._id}`}
          className="flex-1 btn-primary text-center"
        >
          Request Swap
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default UserCard; 
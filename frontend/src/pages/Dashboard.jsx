import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usersAPI } from '../services/api';
import { Save, MapPin, Clock, User, Shield } from 'lucide-react';

const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    location: {
      address: '',
      coordinates: { lat: null, lng: null }
    },
    skillsOffered: [],
    skillsWanted: [],
    availability: {
      days: [],
      timeSlots: []
    },
    isPublic: true
  });
  const [newSkill, setNewSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const days = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const timeSlots = [
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
    { value: 'night', label: 'Night' }
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        location: {
          address: user.location?.address || '',
          coordinates: user.location?.coordinates || { lat: null, lng: null }
        },
        skillsOffered: user.skillsOffered || [],
        skillsWanted: user.skillsWanted || [],
        availability: {
          days: user.availability?.days || [],
          timeSlots: user.availability?.timeSlots || []
        },
        isPublic: user.isPublic !== false
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'isPublic') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value
      }
    }));
  };

  const handleAvailabilityChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [type]: prev.availability[type].includes(value)
          ? prev.availability[type].filter(item => item !== value)
          : [...prev.availability[type], value]
      }
    }));
  };

  const addSkill = (type) => {
    if (newSkill.trim() && !formData[type].includes(newSkill.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], newSkill.trim().toLowerCase()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (type, skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await usersAPI.updateProfile(formData);
      updateUser(response.data.data);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage your profile and preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={user?.username || ''}
                className="input bg-gray-50"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Location
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.location.address}
              onChange={handleLocationChange}
              className="input"
              placeholder="Enter your location"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
          
          {/* Skills Offered */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills I Can Teach
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="input flex-1"
                placeholder="Add a skill you can teach"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill('skillsOffered');
                  }
                }}
              />
              <button
                type="button"
                onClick={() => addSkill('skillsOffered')}
                className="btn-primary"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skillsOffered.map((skill, index) => (
                <span key={index} className="tag-primary flex items-center">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill('skillsOffered', skill)}
                    className="ml-1 text-primary-800 hover:text-primary-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Skills Wanted */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills I Want to Learn
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="input flex-1"
                placeholder="Add a skill you want to learn"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill('skillsWanted');
                  }
                }}
              />
              <button
                type="button"
                onClick={() => addSkill('skillsWanted')}
                className="btn-primary"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skillsWanted.map((skill, index) => (
                <span key={index} className="tag-secondary flex items-center">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill('skillsWanted', skill)}
                    className="ml-1 text-gray-600 hover:text-gray-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Availability
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Days
              </label>
              <div className="space-y-2">
                {days.map(day => (
                  <label key={day.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.availability.days.includes(day.value)}
                      onChange={() => handleAvailabilityChange('days', day.value)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{day.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Times
              </label>
              <div className="space-y-2">
                {timeSlots.map(time => (
                  <label key={time.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.availability.timeSlots.includes(time.value)}
                      onChange={() => handleAvailabilityChange('timeSlots', time.value)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{time.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Privacy Settings
          </h2>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Make my profile public (visible to other users)
            </span>
          </label>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-md ${
            message.includes('successfully') 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex items-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard; 
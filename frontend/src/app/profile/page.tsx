import Link from 'next/link';

// This would typically come from an authentication system
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+506 8888-8888',
  address: 'San José, Costa Rica',
  profileImage: '/images/avatar-placeholder.jpg',
  memberSince: '2023-01-15',
};

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar with user info */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="flex flex-col items-center text-center">
              {/* Profile image placeholder */}
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-500 text-4xl font-bold">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h2 className="text-xl font-bold">{mockUser.name}</h2>
              <p className="text-gray-500">Member since {new Date(mockUser.memberSince).toLocaleDateString()}</p>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <button className="btn btn-primary w-full mb-2">Edit Profile</button>
              <button className="btn btn-secondary w-full">Change Password</button>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 text-sm mb-1">Full Name</label>
                  <p className="font-medium">{mockUser.name}</p>
                </div>
                <div>
                  <label className="block text-gray-500 text-sm mb-1">Email Address</label>
                  <p className="font-medium">{mockUser.email}</p>
                </div>
                <div>
                  <label className="block text-gray-500 text-sm mb-1">Phone Number</label>
                  <p className="font-medium">{mockUser.phone}</p>
                </div>
                <div>
                  <label className="block text-gray-500 text-sm mb-1">Address</label>
                  <p className="font-medium">{mockUser.address}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Medical History */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Medical History</h3>
            <p className="text-gray-500 italic mb-4">Your medical history is private and only shared with providers when you schedule a service.</p>
            <button className="btn btn-secondary">Update Medical History</button>
          </div>
          
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 text-center text-gray-500">
                You haven't placed any orders yet.
              </div>
              <div className="bg-gray-50 p-4 text-center">
                <Link href="/products" className="text-blue-600 hover:underline">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
          
          {/* Saved Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Saved Items</h3>
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 text-center text-gray-500">
                You haven't saved any items yet.
              </div>
              <div className="bg-gray-50 p-4 text-center">
                <Link href="/products" className="text-blue-600 hover:underline">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

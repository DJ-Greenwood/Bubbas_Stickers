import React from 'react';

const UserProfile = ({ user }) => {
    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {user.displayName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Subscription Plan:</strong> {user.subscriptionPlan}</p>
            {/* Add more user details as needed */}
        </div>
    );
};

export default UserProfile;
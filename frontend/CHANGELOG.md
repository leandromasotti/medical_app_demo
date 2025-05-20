# Changelog

All notable changes to the Medical Marketplace Frontend will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Profile Page Feature**
  - Created new profile page at `src/app/profile/page.tsx`
  - Implemented responsive layout with grid system
    - Single column on mobile devices
    - Three-column layout on desktop (1:2 ratio sidebar to main content)
  - **User Information Sidebar**
    - Added profile picture placeholder with user initials
    - Displayed user name and membership date
    - Added "Edit Profile" and "Change Password" buttons
  - **Personal Information Section**
    - Displayed user's full name, email address, phone number, and address
    - Implemented responsive grid layout for information display
  - **Medical History Section**
    - Added privacy notice about medical data sharing
    - Included "Update Medical History" button for future functionality
  - **Recent Orders Section**
    - Implemented empty state with message when no orders exist
    - Added link to browse products
  - **Saved Items Section**
    - Implemented empty state with message when no saved items exist
    - Added link to browse products
  - Used mock user data for demonstration purposes
    - Created mockUser object with sample user information
    - Structured data to simulate future integration with authentication system

- **Navigation Updates**
  - Updated navigation in `src/app/layout.tsx` to include a link to the profile page
  - Maintained consistent styling with existing navigation links

### Technical Details
- Utilized existing Tailwind CSS classes for consistent styling
- Leveraged Next.js App Router for the new profile route
- Implemented responsive design principles throughout the profile page
- Created modular components within the profile page for better maintainability
- Added placeholder functionality for future authentication integration

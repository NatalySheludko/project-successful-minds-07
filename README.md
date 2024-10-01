This project involves building a "Water Tracker" web application with multiple components for tracking daily water intake. Water Tracker responsive, with breakpoints at 1440px (desktop), 768px (tablet), and 320px (mobile). Here’s an overview of the main components:

## Global Setup:
Global Styling Variables: Implement global variables for styling components.
Redux Configuration: Organize Redux for state management.
Token Storage: Use redux-persist for storing the authorized user's token in localStorage.

## Main Application Structure:
- App: Handles API operations for fetching user data and managing public/private routes.
- SharedLayout: Renders on the root route (/). Contains the Header and wraps all nested routes.
- Header Component (for both authorized and non-authorized users).

**Non-authorized user**:
- Logo: A clickable logo that redirects to the WelcomePage.
- UserAuth: Button that redirects to the /signin route.

**Authorized user**:
- Logo: Clickable logo that redirects to the HomePage.
- UserLogo: Button that displays the user’s avatar, name, or email initials. Clicking opens the UserLogoModal.
- UserLogoModal: Modal with: setting: opens SettingModal, logoutBtn.

**Modals:**
- SettingModal: allows the user to update personal details (photo, gender, name, email, and password).
Includes password visibility toggle, server error notifications, and form submission logic.
- UserLogoutModal: confirms log out with options to cancel or proceed with session removal.

**Pages for Non-Authorized Users:**
WelcomePage (/welcome): 
- WaterConsumptionTracker: introduction to tracking water consumption with a "Try tracker" button that redirects to /signup.
- WhyDrinkWater: highlights the health benefits of drinking water.
- SignupPage (/signup): contains the AuthForm for user registration. Validates all fields, with error handling, and redirects to the SigninPage upon success.
- MVP-2: Automatically authorizes the user and redirects to HomePage.
- SigninPage (/signin): contains the AuthForm for user login. Includes navigation to SignupPage and possibly a "Forgot Password?" feature for future development.

**Pages for Authorized Users:**
- HomePage (/home): displays daily water tracking statistics:
- DailyNorma: shows user’s daily water goal.
- WaterRatioPanel: displays progress and opens a modal for logging water intake.
- TodayWaterList: lists the day’s water consumption.
- MonthStatsTable: shows water consumption statistics for the month.
  


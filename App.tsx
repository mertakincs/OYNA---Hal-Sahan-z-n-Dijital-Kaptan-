
import React, { useState } from 'react';
import { UserRole, AppView, MatchListing } from './types';
import SplashScreen from './views/SplashScreen';
import AuthScreen from './views/AuthScreen';
import RoleSelection from './views/RoleSelection';
import Dashboard from './views/Dashboard';
import PitchDiscovery from './views/PitchDiscovery';
import Marketplace from './views/Marketplace';
import OwnerPanel from './views/OwnerPanel';
import PaymentScreen from './views/PaymentScreen';
import MyTeam from './views/MyTeam';
import AICoach from './views/AICoach';
import ServiceDashboard from './views/ServiceDashboard';
import ProfileScreen from './views/ProfileScreen';
import Notifications from './views/Notifications';
import BookingAddons from './views/BookingAddons';
import SettingsScreen from './views/SettingsScreen';
import VotingScreen from './views/VotingScreen';
import MotmReveal from './views/MotmReveal';
import OynaTv from './views/OynaTv';
import MatchDiscovery from './views/MatchDiscovery';
import MatchJoin from './views/MatchJoin';
import PremiumScreen from './views/PremiumScreen';
import ChatScreen from './views/ChatScreen';
import MatchTicket from './views/MatchTicket';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('SPLASH');
  const [role, setRole] = useState<UserRole | null>(null);

  // Mock state to carry add-on total to payment
  const [addOnTotal, setAddOnTotal] = useState(0);
  
  // Mock state for MOTM Discount Coupon
  const [hasMotmCoupon, setHasMotmCoupon] = useState(false);

  // Mock state for Selected Match Listing
  const [selectedMatch, setSelectedMatch] = useState<MatchListing | null>(null);

  // Mock state for Premium User
  const [isUserPro, setIsUserPro] = useState(false);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === UserRole.OWNER) {
      setView('OWNER_PANEL');
    } else if (selectedRole === UserRole.REFEREE || selectedRole === UserRole.GOALKEEPER) {
      setView('SERVICE_DASHBOARD');
    } else {
      setView('DASHBOARD');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'SPLASH':
        return <SplashScreen onStart={() => setView('AUTH')} />;
      case 'AUTH':
        return <AuthScreen onSuccess={() => setView('ROLE_SELECTION')} onBack={() => setView('SPLASH')} />;
      case 'ROLE_SELECTION':
        return <RoleSelection onSelect={handleRoleSelect} onBack={() => setView('AUTH')} />;
      case 'DASHBOARD':
        return <Dashboard 
          onNavigate={(newView) => setView(newView)} 
          onBack={() => setView('ROLE_SELECTION')}
        />;
      case 'PITCH_DISCOVERY':
        return <PitchDiscovery 
          onBack={() => setView('DASHBOARD')} 
          onBook={() => setView('BOOKING_ADDONS')}
        />;
      case 'BOOKING_ADDONS':
        return <BookingAddons 
          onBack={() => setView('PITCH_DISCOVERY')}
          onContinue={(total) => {
            setAddOnTotal(total);
            setView('PAYMENT');
          }}
        />;
      case 'MARKETPLACE_REF':
        return <Marketplace type="REF" onBack={() => setView('DASHBOARD')} />;
      case 'MARKETPLACE_GK':
        return <Marketplace type="GK" onBack={() => setView('DASHBOARD')} />;
      case 'OWNER_PANEL':
        return <OwnerPanel onBack={() => setView('ROLE_SELECTION')} onNavigate={(v) => setView(v)} />;
      case 'SERVICE_DASHBOARD':
        return <ServiceDashboard role={role!} onBack={() => setView('ROLE_SELECTION')} onNavigate={(v) => setView(v)} />;
      case 'PAYMENT':
        return <PaymentScreen 
            extraFee={addOnTotal} 
            hasMotmCoupon={hasMotmCoupon} 
            onBack={() => setView('BOOKING_ADDONS')} 
            onUpgradeRequest={() => setView('PREMIUM')}
            onViewTicket={() => setView('MATCH_TICKET')}
        />;
      case 'MY_TEAM':
        return <MyTeam onBack={() => setView('DASHBOARD')} onNavigate={(v) => setView(v)} />;
      case 'AI_COACH':
        return <AICoach onBack={() => setView('MY_TEAM')} />;
      case 'PROFILE':
        return <ProfileScreen role={role || UserRole.PLAYER} onBack={() => setView('DASHBOARD')} onNavigate={(v) => setView(v)} isPro={isUserPro} />;
      case 'NOTIFICATIONS':
        return <Notifications onBack={() => setView('DASHBOARD')} />;
      case 'SETTINGS':
        return <SettingsScreen onBack={() => setView('DASHBOARD')} onNavigate={(v) => setView(v)} />;
      case 'VOTING':
        return <VotingScreen onBack={() => setView('DASHBOARD')} onComplete={() => setView('MOTM_REVEAL')} />;
      case 'MOTM_REVEAL':
        return <MotmReveal 
          onClaim={() => {
            setHasMotmCoupon(true);
            setView('DASHBOARD');
          }} 
          onBack={() => setView('DASHBOARD')}
        />;
      case 'OYNA_TV':
        return <OynaTv onBack={() => setView('DASHBOARD')} onNavigate={(v) => setView(v)} />;
      case 'MATCH_DISCOVERY':
        return <MatchDiscovery 
          onBack={() => setView('DASHBOARD')} 
          onSelect={(match) => {
            setSelectedMatch(match);
            setView('MATCH_JOIN');
          }}
        />;
      case 'MATCH_JOIN':
        return <MatchJoin 
          match={selectedMatch} 
          onBack={() => setView('MATCH_DISCOVERY')}
          onJoin={() => setView('MY_TEAM')} // After payment, go to tactics
        />;
      case 'PREMIUM':
        return <PremiumScreen 
          onBack={() => setView('DASHBOARD')} 
          onUpgrade={() => {
            setIsUserPro(true);
            setView('PROFILE');
          }}
        />;
      case 'CHAT':
        return <ChatScreen onBack={() => setView('DASHBOARD')} />;
      case 'MATCH_TICKET':
        return <MatchTicket onBack={() => setView('DASHBOARD')} />;
      default:
        return <SplashScreen onStart={() => setView('AUTH')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E14] text-white font-['Inter']">
      {renderView()}
    </div>
  );
};

export default App;

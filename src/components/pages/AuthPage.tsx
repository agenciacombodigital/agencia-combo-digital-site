import React from 'react';
import AuthForm from '../AuthForm';

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-6 auth-bg">
      <div className="container mx-auto relative z-10">
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
</script>
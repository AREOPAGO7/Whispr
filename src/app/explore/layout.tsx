import withAuth from '../components/auth/withAuth/withAuth';

interface ExploreLayoutProps {
  children: React.ReactNode;
}

const ExploreLayout: React.FC<ExploreLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default withAuth(ExploreLayout);
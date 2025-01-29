import { cookies } from 'next/headers';

export default async function ExplorePage() {
  const cookieStore = cookies();
  const session = (await cookieStore).get('session');
  const userEmail = (await cookieStore).get('userEmail');

  if (!session?.value) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error loading user data</p>
          <p className="text-sm">
            No session cookie found - please log in .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Explore Page</h1>
      {userEmail && (
        <div className="mt-4">
          <p>User Email: {userEmail.value}</p>
        </div>
      )}
      <div className="mt-4">
        <p>This is a protected route - only authenticated users can see this content.</p>
      </div>
    </div>
  );
}

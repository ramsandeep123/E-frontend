import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'


export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = {
    name: 'Sandip',
    email: 'sandip@example.com',
    id: '123'
  };

  return (
    <div>
      <Navbar user={user} />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

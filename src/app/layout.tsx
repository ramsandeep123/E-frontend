import ClientProvider from '@/providers/ClientProvider'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <ClientProvider>
          {/* <NextSSRPlugin
           
            routerConfig={extractRouterConfig(ourFileRouter)}
          /> */}
          {children}
        </ClientProvider>
      </body>
    </html>
  )
}

import OrdersList from '@/components/OrderList'
import { ORDER_INFINITE_SCROLL_LIMIT } from '@/config'


const OrdersPage = async ({
  searchParams,
}: {
  searchParams: { status: 'PENDING' | 'PAID' | 'CANCELED' }
}) => {
  // const session = await getAuthSession()

  let orders
  let ordersCount

  // if (searchParams.status) {
  //   const ordersWithStatus = await prisma.order.findMany({
  //     where: {
  //       userId: session?.user.id,
  //       status: searchParams.status,
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //     take: ORDER_INFINITE_SCROLL_LIMIT,
  //   })

  //   const ordersWithStatusCount = await prisma.order.count({
  //     where: {
  //       userId: session?.user.id,
  //       status: searchParams.status,
  //     },
  //   })

  //   orders = ordersWithStatus
  //   ordersCount = ordersWithStatusCount
  // } else {
  //   const allOrders = await prisma.order.findMany({
  //     where: {
  //       userId: session?.user.id,
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //     take: ORDER_INFINITE_SCROLL_LIMIT,
  //   })

  //   const allOrdersCount = await prisma.order.count({
  //     where: {
  //       userId: session?.user.id,
  //     },
  //   })

  //   orders = allOrders
  //   ordersCount = allOrdersCount
  // }

  return (
    <div className='py-4 px-1 space-y-6'>
      <OrdersList initialOrders={[]} totalData={0} />
    </div>
  )
}
export default OrdersPage

import prisma from "@/app/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import  {options}  from "../../../lib/auth";

async function getData() {

  const session = await getServerSession(options);

  // Redirect if user is not authenticated
  if (!session || !session.user?.email) {
    return redirect("/auth/signin");
  }

  // Fetch user details from the database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return redirect("/auth/signin"); // Redirect if no user found
  }
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      User: true, // Include user details if needed
    },
  });

console.log(orders);
return orders;
  
}

export default async function OrdersPage() {
  noStore();
  const data = await getData();
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store!</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
             
             
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="font-medium">{item.User?.firstName}</p>
                  <p className="hidden md:flex text-sm text-muted-foreground">
                    {item.User?.email}
                  </p>
                </TableCell>
                <TableCell>Order</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US").format(item.createdAt)}
                </TableCell>
                <TableCell className="text-right text-sm">
                {item.User?.email}
                </TableCell>
            
                <TableCell className="text-right">
                ₹{item.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

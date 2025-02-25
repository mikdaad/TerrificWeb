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
import Image from "next/image";

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
      User: {
        include: {
          address: true, // Include the address field from the User model
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

console.log(orders);
return orders;
  
}

export default async function OrdersPage() {
  noStore();
  const data = await getData();
  return (
    <Card className="font-glancyr">
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription></CardDescription>
        <CardDescription>Note: kindly update  contact number and address fields in settings tab  if missing.  </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product </TableHead>
              <TableHead> </TableHead>
              <TableHead> payment </TableHead>
              <TableHead> Color </TableHead>
              <TableHead> Size </TableHead>
              <TableHead> Amount </TableHead>
              <TableHead> contactno </TableHead>
              <TableHead> </TableHead>
              <TableHead> </TableHead>
              <TableHead> Deliverable address </TableHead>
              <TableHead> </TableHead>
              <TableHead> Ordered Date </TableHead>

              
             
             
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  
                    {item.itemname}
              
                </TableCell>
                <TableCell>
                                    <Image
                                      alt="Product Image"
                                      src={item.itemimage ? item.itemimage : "https://picsum.photos/200/300" }
                                      height={64}
                                      width={64}
                                      className="rounded-lg object-cover h-16 w-16"
                                    />
                                  </TableCell>
                <TableCell>{item.status}</TableCell>
               
                <TableCell className="text-right text-sm">
                {item.itemcolor}
                </TableCell>
                <TableCell className="text-right text-sm">
                {item.itemsize}
                </TableCell>
            
            
                <TableCell className="text-right">
                ₹{item.amount}
                </TableCell>

                <TableCell className="text-right">
                {item.User?.phoneno}
                </TableCell>

                <TableCell className="text-right">
                {item.User?.address?.street ? item.User.address.street : "not filled"}
                </TableCell>

                <TableCell className="text-right">
                {item.User?.address?.postalCode ? item.User.address.postalCode : "not filled"}
                </TableCell>

                <TableCell className="text-right">
                {item.User?.address?.city ? item.User.address.city : "not filled"}
                </TableCell>

                <TableCell className="text-right">
                {item.User?.address?.state ? item.User.address.state : "not filled"}
                </TableCell>


                

                <TableCell>
                  {new Intl.DateTimeFormat("en-US").format(item.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

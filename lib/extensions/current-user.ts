import  {options} from "../auth";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

export function currentUser() {
  return Prisma.defineExtension((client) => {
    return client.$extends({
      model: {
        user: {
          async current(this: typeof client.user) {
            const session = await getServerSession(options);

            if (!session?.user?.email) return null;

            return this.findUnique({
              where: { email: session.user.email },
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                profileImage: true,
                // other fields...
              },
            });
          },
        },
      },
    });
  });
}
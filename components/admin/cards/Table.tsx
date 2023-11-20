import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { formatDateString } from "@/lib/utils"
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
  
  export default function TableCon(
    {
      title,
      tableHeaders,
      users,
    }:
    {
      title: string
      tableHeaders: string[] 
      users: any[]
    }) {

      let i = 0
    return (
      <Table>
        <TableCaption>{title}</TableCaption>
        <TableHeader>
          <TableRow>
            {
              tableHeaders.map((head) => {
                return (
                  <TableHead key={head}>{head}</TableHead>
                )
              })
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.accountStatus && (
                  <span className="text-sm bg-green-500 p-2 rounded-sm font-semibold">
                    Active
                  </span>
                )
                }
                {!user.accountStatus && (
                  <span className="text-sm bg-danger p-2 rounded-sm font-semibold">
                    Suspended
                  </span>
                )
                }
                </TableCell>
                <TableCell>{formatDateString(user.updatedAt)}</TableCell>
                <TableCell>
                  <Link
                  href={`users/edit/${user._id}`}
                  >
                    <FiEdit size={20} />
                  </Link>
                  </TableCell>
            </TableRow>
          ))}

          {
            users.length === 0 && (
              <p className="py-3 text-heading4-medium text-danger">no users found</p>
            )
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export function RequestDetails({ element }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className=" ">
        <div>
          {element?.image && (
            <div className=" mx-auto text-center">
              <Image
                className="mx-auto"
                src={element?.image}
                alt={element?.subject}
                width={600}
                height={600}
              />
            </div>
          )}
          <div>
            <h4 className="text-xl font-medium my-2">{element?.subject}</h4>
            <p className="text-md text-gray-700">
              <span className="font-medium text-black mr-2">Message:</span>
              {element?.message}
            </p>
            <p>
              <span className="font-medium">Ticket ID: </span>
              {element?.id}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import Image from "next/image";
import { getNgos } from "./data/getNgos";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Link from "next/link";

export default async function Home() {
    const data = await getNgos();

    return (
        <div className="mx-3 my-5">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Non-Governmental Organisations in Sri Lanka</h1>
            <p className="text-xl text-muted-foreground mb-5 mt-2">
                All data on this site is taken from:
                <Link
                    className="ml-3 underline"
                    href="http://www.ngosecretariat.gov.lk/index.php?option=com_ngo&view=registeredlist&layout=national_list&Itemid=146&lang=en#"
                >
                    ngosecretariat.gov.lk
                </Link>
            </p>

            <DataTable columns={columns} data={data} />
        </div>
    );
}

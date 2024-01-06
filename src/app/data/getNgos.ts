import * as cheerio from "cheerio";

export type Ngo = {
    registrationNumber: string;
    type: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    country: string;
    contactPerson: string;
    status: string;
};

export async function getNgos(): Promise<Ngo[]> {
    const response = await fetch("http://www.ngosecretariat.gov.lk/index.php?option=com_ngo&view=registeredlist&layout=national_list&Itemid=146&lang=en#");
    const html = await response.text();

    const $ = cheerio.load(html);

    const organisations = $("table")
        .find("tr.accordion-toggle")
        .map((_, row) => {
            const tds = $(row).find("td");

            const regNumber = $(tds[1]).text();

            return {
                registrationNumber: $(tds[1]).text(),
                type: $(tds[2]).text(),
                name: $(tds[3]).text(),
                phone: $(tds[4]).text(),
                email: $(tds[5]).text().trim()
            };
        })
        .get();

    const extraInfo = $("table")
        .find("td.hiddenRow")
        .map((index, element) => {
            const matchingOrg = organisations[index];

            const infoDivs = $(element).find("div.col-lg-5");

            const addressInfoDivs = $(infoDivs[0]).find("div.col-lg-7");
            const contactPersonInfoDivs = $(infoDivs[1]).find("div.col-lg-7");

            return {
                ...matchingOrg,
                address: $(addressInfoDivs[0]).text().trim(),
                country: $(addressInfoDivs[1]).text().trim(),
                contactPerson: $(contactPersonInfoDivs[0]).text().trim(),
                status: $(contactPersonInfoDivs[1]).text().trim()
            } as Ngo;
        })
        .get();

    return extraInfo;
}
